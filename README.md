# Commercial Catering Equipment Price Comparison

A web application for comparing prices of commercial catering equipment across multiple Australian retailers.

## 🎯 Project Overview

This price comparison tool helps Eat Tucker showcase competitive pricing on commercial catering equipment by comparing prices against major competitors in the Australian market.

## 📁 Project Structure
```
PCSproject/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling
├── js/
│   └── app.js             # React application logic
├── data/
│   └── products_with_prices.json  # Product database
└── README.md              # This file
```

## 🚀 Getting Started

### View Online
Visit: https://seanoccs.github.io/PCSproject

### Local Testing

**Using Python 3:**
```bash
cd PCSproject
python -m http.server 8000
```
Then open: http://localhost:8000

**Using PHP:**
```bash
cd PCSproject
php -S localhost:8000
```

**Using Node.js:**
```bash
npm install -g http-server
cd PCSproject
http-server -p 8000
```

⚠️ **Note:** Don't open index.html directly in browser - use a local server to avoid CORS issues.

## ✨ Features

- ✅ Category Filtering (Ovens, Refrigeration, Dishwashers, Cooking Equipment)
- ✅ Size Filtering within categories
- ✅ Price Comparison Table
- ✅ Product Detail Pages
- ✅ Status Indicators (Normal, Warning, Alert)
- ✅ Responsive Design
- ✅ Embed Code Generator

## 📊 Sample Products Included

- 4 Ovens (Gas Ranges, Convection Ovens)
- 3 Refrigeration Units (Fridges, Freezers)
- 2 Dishwashers (Undercounter, Passthrough)
- 3 Cooking Equipment (Burners, Fryers)

**Total: 12 products** ready to test with realistic pricing data.

## 🎨 Customization

### Update Colors
Edit `css/styles.css` and change the CSS variables:
```css
:root {
    --primary: #1a472a;      /* Main green */
    --secondary: #2d5f3f;    /* Lighter green */
    --accent: #ff6b35;       /* Orange accent */
}
```

### Add Products
Edit `data/products_with_prices.json` and add new product objects.

### Add Real Images
Replace the placeholder image URLs in the JSON file with real product images.

## 🔧 Technology Stack

- **React 18** (via CDN)
- **Vanilla CSS** (CSS Grid, Flexbox)
- **JSON** for data storage
- **No build tools required**

## 📤 Deployment

Currently deployed via GitHub Pages at: https://seanoccs.github.io/PCSproject

## 🚀 Future Enhancements

- [ ] Search functionality
- [ ] Sort by price/brand
- [ ] Price history tracking
- [ ] Admin panel for updates
- [ ] Automated price scraping
- [ ] Email alerts
- [ ] Export to PDF

## 📄 License

Proprietary - Eat Tucker © 2024

---

**Version:** 1.0.0  
**Last Updated:** February 2026
