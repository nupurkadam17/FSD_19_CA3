/**
 * CLOSETÉ - Program 1 Comprehensive Logic & Algorithms Verification
 * Tests validation regex patterns, form logic, search, multi-faceted filtering,
 * and sorting algorithms.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Load modules into sandbox context
const validationSource = fs.readFileSync(path.join(__dirname, 'js', 'validation.js'), 'utf8');
const filterSource = fs.readFileSync(path.join(__dirname, 'js', 'filter.js'), 'utf8');
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8'));

const context = {
  console,
  document: {
    createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} } })
  }
};
vm.createContext(context);
vm.runInContext(validationSource + '\nthis.Validation = Validation;', context);
vm.runInContext(filterSource + '\nthis.FilterEngine = FilterEngine;', context);

const { Validation, FilterEngine } = context;

function assert(condition, message) {
  if (!condition) {
    console.error(`✖ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✓ ${message}`);
}

console.log('--- TESTING VALIDATION MODULE ---');

// 1. Product Form Validation
const validProduct = {
  name: 'Structured Bouclé Jacket',
  category: 'Outerwear',
  price: 8490,
  stock: 6,
  sizes: ['S', 'M'],
  description: 'An elegant structured jacket with antique gold buttons and frayed hems.'
};
assert(Validation.validateProductForm(validProduct).isValid, 'Valid product form accepted.');

const invalidProduct = {
  name: 'Jk', // too short
  category: '',
  price: -100, // negative price
  stock: 0,
  sizes: [],
  description: 'Short'
};
const productResult = Validation.validateProductForm(invalidProduct);
assert(!productResult.isValid, 'Invalid product form rejected.');
assert(productResult.errors.name, 'Rejected short product name.');
assert(productResult.errors.category, 'Rejected empty category.');
assert(productResult.errors.price, 'Rejected negative price.');
assert(productResult.errors.sizes, 'Rejected empty size array.');
assert(productResult.errors.description, 'Rejected short description.');

// 2. Checkout Validation
const validCheckout = {
  fullName: 'Ananya Sharma',
  email: 'ananya.sharma@example.com',
  phone: '9876543210',
  address: '14B Altamount Road, Cumballa Hill',
  city: 'Mumbai',
  pincode: '400026',
  paymentMethod: 'card',
  cardNumber: '4532015698741236',
  cardExpiry: '11/28',
  cardCvv: '789'
};
assert(Validation.validateCheckout(validCheckout).isValid, 'Valid card checkout passed.');

const invalidCheckout = {
  fullName: 'Ananya', // single word
  email: 'bad-email-format',
  phone: '12345', // invalid phone
  address: 'Short',
  city: '',
  pincode: '0012', // invalid PIN
  paymentMethod: 'card',
  cardNumber: '1234',
  cardExpiry: '99/99',
  cardCvv: '12'
};
const checkoutResult = Validation.validateCheckout(invalidCheckout);
assert(!checkoutResult.isValid, 'Invalid checkout rejected.');
assert(checkoutResult.errors.fullName, 'Flagged single-word name.');
assert(checkoutResult.errors.email, 'Flagged invalid email.');
assert(checkoutResult.errors.phone, 'Flagged invalid phone number.');
assert(checkoutResult.errors.pincode, 'Flagged invalid PIN code.');
assert(checkoutResult.errors.cardNumber, 'Flagged short card number.');

// UPI Validation
const validUpiCheckout = {
  ...validCheckout,
  paymentMethod: 'upi',
  upiId: 'ananya@okhdfcbank'
};
assert(Validation.validateCheckout(validUpiCheckout).isValid, 'Valid UPI checkout passed.');

const invalidUpiCheckout = {
  ...validCheckout,
  paymentMethod: 'upi',
  upiId: 'invalid-vpa-no-at-sign'
};
assert(!Validation.validateCheckout(invalidUpiCheckout).isValid, 'Invalid UPI ID rejected.');

console.log('\n--- TESTING FILTERING & SORTING ENGINE ---');

// 3. Category Filter
const dresses = FilterEngine.applyFilters(products, { category: 'Dresses' });
assert(dresses.length > 0 && dresses.every(p => p.category === 'Dresses'), 'Filtered strictly by Dresses category.');

// 4. Size Filter
const sizeM = FilterEngine.applyFilters(products, { size: 'M' });
assert(sizeM.length > 0 && sizeM.every(p => p.sizes.includes('M')), 'Filtered strictly by size M.');

// 5. Price Filter
const maxPrice5000 = FilterEngine.applyFilters(products, { maxPrice: 5000 });
assert(maxPrice5000.length > 0 && maxPrice5000.every(p => p.price <= 5000), 'Filtered strictly by price <= ₹5,000.');

// 6. Search Query
const searchSilk = FilterEngine.applyFilters(products, { searchQuery: 'Silk' });
assert(searchSilk.length > 0 && searchSilk.every(p => 
  p.name.includes('Silk') || p.description.includes('Silk')
), 'Search query matched "Silk" in name and description.');

// 7. Sorting: Low to High
const lowToHigh = FilterEngine.applyFilters(products, { sortBy: 'price-asc' });
let isAsc = true;
for (let i = 1; i < lowToHigh.length; i++) {
  if (lowToHigh[i].price < lowToHigh[i - 1].price) isAsc = false;
}
assert(isAsc, 'Sorted ascending by price.');

// 8. Sorting: High to Low
const highToLow = FilterEngine.applyFilters(products, { sortBy: 'price-desc' });
let isDesc = true;
for (let i = 1; i < highToLow.length; i++) {
  if (highToLow[i].price > highToLow[i - 1].price) isDesc = false;
}
assert(isDesc, 'Sorted descending by price.');

console.log('\n========================================================');
console.log('  ALL LOGIC & ALGORITHM TESTS PASSED SUCCESSFULLY!     ');
console.log('========================================================\n');
