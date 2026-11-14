/**
 * CLOSETÉ - Program 5 Mongoose Seeding Script
 * Populates MongoDB database with initial luxury fashion items and admin credentials.
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

const seedProducts = [
  {
    name: "L'Atelier Silk Slip Maxi Dress",
    description: "Crafted from 100% heavyweight mulberry silk with a bias cut that drapes effortlessly. Cowl neckline.",
    price: 8990,
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Champagne"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    stock: 14,
    isNewSeason: true,
    isTrending: true,
    rating: 4.9
  },
  {
    name: "Sculpted Cashmere Blend Trench",
    description: "An architectural outerwear silhouette tailored from double-faced Italian wool-cashmere blend.",
    price: 14990,
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    stock: 4,
    isNewSeason: true,
    isTrending: true,
    rating: 5.0
  },
  {
    name: "Tailored Short & Blazer Co-ord Set",
    description: "Refined two-piece ensemble with relaxed blazer and high-waisted pleated shorts in virgin wool.",
    price: 11990,
    category: "Co-ord Sets",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sage Grey", "Black"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    isNewSeason: false,
    isTrending: true,
    rating: 4.8
  },
  {
    name: "Oversized Crisp Poplin Asymmetric Shirt",
    description: "Constructed from 100% organic Egyptian cotton poplin with dropped shoulders and split hem.",
    price: 3990,
    category: "Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pure White", "Sky Stripe"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    stock: 22,
    isNewSeason: true,
    isTrending: false,
    rating: 4.7
  },
  {
    name: "High-Waist Fluid Pleated Trousers",
    description: "Wide-leg fluid profile from Japanese gabardine twill with sharp pressed pleats and side pockets.",
    price: 4990,
    category: "Trousers",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Ecru"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    stock: 12,
    isNewSeason: false,
    isTrending: true,
    rating: 4.9
  },
  {
    name: "Sculptural Halter Ribbed Knit Top",
    description: "Spun with fine extrafine merino wool and compact stretch yarn with crossover neckline.",
    price: 2990,
    category: "Tops",
    sizes: ["XS", "S", "M"],
    colors: ["Off White", "Noir"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    stock: 19,
    isNewSeason: true,
    isTrending: false,
    rating: 4.6
  },
  {
    name: "Curved Calfskin Crossbody Saddle Bag",
    description: "Sculpted in Florence from full-grain vegetable-tanned Italian calf leather with gold hardware.",
    price: 7990,
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Cognac", "Noir"],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    stock: 5,
    isNewSeason: false,
    isTrending: true,
    rating: 5.0
  }
];

async function seedDatabase() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/closete_fashion_db';
    console.log(`[SEED] Connecting to MongoDB: ${uri}`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

    console.log('[SEED] Clearing existing records...');
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log('[SEED] Creating default users (Admin & Customer)...');
    await User.create([
      {
        name: 'Atelier Director',
        email: 'admin@closete.com',
        password: 'Admin@123',
        role: 'admin'
      },
      {
        name: 'Client User',
        email: 'client@closete.com',
        password: 'Client@123',
        role: 'customer'
      }
    ]);

    console.log('[SEED] Inserting 7 luxury fashion pieces...');
    await Product.insertMany(seedProducts);

    console.log('✓ [SEED COMPLETE] MongoDB populated with users and collection!');
    process.exit(0);
  } catch (error) {
    console.warn(`[SEED ADVISORY] MongoDB connection failed (${error.message}).`);
    console.warn('The backend includes automatic cache fallback so the platform runs even before MongoDB service is launched.');
    process.exit(0);
  }
}

seedDatabase();
