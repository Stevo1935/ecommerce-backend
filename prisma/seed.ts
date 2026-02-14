import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();

  // Seed products
  const products = [
    {
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      category: "Apparel",
      variants: JSON.stringify(["S", "M", "L", "XL"]),
      stock: 50
    },
    {
      name: "Denim Jeans",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
      category: "Apparel",
      variants: JSON.stringify(["28", "30", "32", "34", "36"]),
      stock: 30
    },
    {
      name: "Running Shoes",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Footwear",
      variants: JSON.stringify(["7", "8", "9", "10", "11", "12"]),
      stock: 0
    },
    {
      name: "Leather Jacket",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      category: "Apparel",
      variants: JSON.stringify(["S", "M", "L", "XL"]),
      stock: 15
    },
    {
      name: "Casual Sneakers",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
      category: "Footwear",
      variants: JSON.stringify(["7", "8", "9", "10", "11"]),
      stock: 25
    },
    {
      name: "Summer Dress",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
      category: "Apparel",
      variants: JSON.stringify(["XS", "S", "M", "L"]),
      stock: 40
    },
    {
      name: "Wool Sweater",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
      category: "Apparel",
      variants: JSON.stringify(["S", "M", "L", "XL"]),
      stock: 20
    },
    {
      name: "Sports Cap",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
      category: "Accessories",
      variants: JSON.stringify(["One Size"]),
      stock: 100
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
