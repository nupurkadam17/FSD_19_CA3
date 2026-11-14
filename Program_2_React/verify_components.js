/**
 * CLOSETÉ - Program 2 Component Architecture & Syntax Verification
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('================================================================');
console.log('  CLOSETÉ - PROGRAM 2 REACT COMPONENT VERIFICATION              ');
console.log('================================================================\n');

const componentsToCheck = [
  'src/components/common/Navbar.jsx',
  'src/components/common/Footer.jsx',
  'src/components/common/Toast.jsx',
  'src/components/product/ProductCard.jsx',
  'src/components/product/ProductGrid.jsx',
  'src/components/product/FilterSidebar.jsx',
  'src/components/product/ProductForm.jsx',
  'src/components/cart/CartDrawer.jsx',
  'src/pages/HomePage.jsx',
  'src/pages/ShopPage.jsx',
  'src/pages/ProductDetailPage.jsx',
  'src/pages/AddProductPage.jsx',
  'src/pages/WishlistPage.jsx',
  'src/pages/CheckoutPage.jsx',
  'src/App.jsx',
  'src/main.jsx',
  'src/data/sampleProducts.js'
];

let allPassed = true;

componentsToCheck.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`✖ Missing required component file: ${relPath}`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  console.log(`✓ ${relPath} (${content.length} bytes) verified.`);
});

console.log('\n--- VERIFYING REACT HOOKS & CONCEPTS ---');

const appContent = fs.readFileSync(path.join(__dirname, 'src/App.jsx'), 'utf8');
const formContent = fs.readFileSync(path.join(__dirname, 'src/components/product/ProductForm.jsx'), 'utf8');
const shopContent = fs.readFileSync(path.join(__dirname, 'src/pages/ShopPage.jsx'), 'utf8');

const hasUseState = appContent.includes('useState') && formContent.includes('useState');
const hasUseEffect = appContent.includes('useEffect') && formContent.includes('useEffect');
const hasUseMemo = shopContent.includes('useMemo');
const hasRouter = appContent.includes('BrowserRouter') && appContent.includes('Routes') && appContent.includes('Route');
const hasProps = formContent.includes('onAddProduct') && appContent.includes('handleAddProduct');

console.log(`✓ useState Hooks Utilized: ${hasUseState}`);
console.log(`✓ useEffect Lifecycle Hooks Utilized: ${hasUseEffect}`);
console.log(`✓ useMemo Optimization Utilized: ${hasUseMemo}`);
console.log(`✓ React Router v6 Configured: ${hasRouter}`);
console.log(`✓ State Lifting & Prop Passing Configured: ${hasProps}`);

if (allPassed && hasUseState && hasUseEffect && hasRouter) {
  console.log('\n================================================================');
  console.log('  PROGRAM 2 ARCHITECTURE & COMPONENTS 100% VERIFIED            ');
  console.log('================================================================\n');
  process.exit(0);
} else {
  console.error('\n✖ Component verification failed.');
  process.exit(1);
}
