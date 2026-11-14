/**
 * CLOSETÉ - Program 5 Mongoose Product Schema
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Garment name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters']
    },
    description: {
      type: String,
      required: [true, 'Editorial description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price in INR is required'],
      min: [100, 'Price must be at least ₹100']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Dresses', 'Tops', 'Shirts', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Accessories'],
        message: '{VALUE} is not an authorized fashion category'
      }
    },
    sizes: {
      type: [String],
      required: [true, 'At least one size is required'],
      default: ['S', 'M', 'L']
    },
    colors: {
      type: [String],
      default: ['Noir', 'Ivory']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 10
    },
    isNewSeason: {
      type: Boolean,
      default: true
    },
    isTrending: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1,
      max: 5
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
