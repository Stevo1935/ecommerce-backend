import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET /products - Return all products
app.get('/products', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Parse variants from JSON string
    const formattedProducts = products.map(product => ({
      ...product,
      variants: product.variants ? JSON.parse(product.variants) : []
    }));
    
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /products/:id - Return single product by ID
app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const formattedProduct = {
      ...product,
      variants: product.variants ? JSON.parse(product.variants) : []
    };
    
    res.json(formattedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// GET /products?category=Apparel - Filter products by category
app.get('/products', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const products = await prisma.product.findMany({
      where: category ? { category: category as string } : {},
      orderBy: { createdAt: 'desc' }
    });
    
    const formattedProducts = products.map(product => ({
      ...product,
      variants: product.variants ? JSON.parse(product.variants) : []
    }));
    
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /products (bonus) - Add new product with validation
app.post('/products', async (req: Request, res: Response) => {
  try {
    const { name, price, image, category, variants, stock } = req.body;
    
    // Data validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Product name is required and must be a non-empty string' });
    }
    
    if (!price || typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price is required and must be a positive number' });
    }
    
    if (!image || typeof image !== 'string' || !image.startsWith('http')) {
      return res.status(400).json({ error: 'Valid image URL is required' });
    }
    
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Category is required' });
    }
    
    if (variants && !Array.isArray(variants)) {
      return res.status(400).json({ error: 'Variants must be an array' });
    }
    
    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ error: 'Stock must be a non-negative number' });
    }
    
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        price,
        image,
        category,
        variants: variants ? JSON.stringify(variants) : null,
        stock: stock || 0
      }
    });
    
    const formattedProduct = {
      ...product,
      variants: product.variants ? JSON.parse(product.variants) : []
    };
    
    res.status(201).json(formattedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
