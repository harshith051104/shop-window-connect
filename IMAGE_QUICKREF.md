# 📸 Image Management - Quick Reference

## 🎯 Essential Commands

| Command | Purpose |
|---------|---------|
| `npm run images:placeholder` | Create placeholder image |
| `npm run images:optimize` | Convert & optimize all images |
| `npm run dev` | Test locally |
| `npm run build` | Build for production |

## 📁 Folder Structure at a Glance

```
source-images/              ← Put your original photos here
  products/
    notebooks/
      featured.jpg         ← Main card image (REQUIRED)
      other-images.jpg
    pens/
      featured.jpg         ← Main card image (REQUIRED)
    ...

public/images/             ← Auto-generated (optimized)
  products/
    notebooks/
      featured.webp        ← Used on website
      ...
  placeholders/
    product-placeholder.webp
```

## ✅ Image Checklist

### Before Upload
- [ ] Image is clear and well-lit
- [ ] Product is centered
- [ ] White or neutral background
- [ ] File format: JPG or PNG
- [ ] Named descriptively (not IMG_1234.jpg)

### After Upload
- [ ] Placed in correct category folder
- [ ] Has a `featured` image for the card
- [ ] Run optimization script
- [ ] Test on website
- [ ] Verify placeholder works (delete an image to test)

## 🎨 Image Specifications

| Type | Dimensions | Format | Max Size | Quality |
|------|-----------|--------|----------|---------|
| **Card (featured)** | 800×600px | WebP | 100KB | 85% |
| **Product** | 800×800px | WebP | 150KB | 85% |
| **Placeholder** | 800×600px | WebP | 50KB | 90% |

## 🚀 Quick Setup (First Time)

```powershell
# 1. Create folders
New-Item -ItemType Directory -Force -Path "public/images/products/notebooks"
New-Item -ItemType Directory -Force -Path "source-images/products/notebooks"

# 2. Install dependencies
npm install sharp --save-dev

# 3. Create placeholder
npm run images:placeholder

# 4. Add your photos to source-images/

# 5. Optimize
npm run images:optimize

# 6. Test
npm run dev
```

## 📊 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Image size | < 100KB | ✅ |
| Load time (3G) | < 2s | ✅ |
| Lazy loading | Yes | ✅ |
| Fallback | Yes | ✅ |
| Mobile-friendly | Yes | ✅ |

## 🐛 Quick Troubleshooting

### Image not showing?
```powershell
# Check file exists
Test-Path "public/images/products/notebooks/featured.webp"

# Clear cache
# Press Ctrl+Shift+R in browser
```

### Script not running?
```bash
# Install sharp
npm install sharp --save-dev

# Check Node version (need 14+)
node --version
```

### Image too large?
```javascript
// Edit: scripts/optimize-images.js, line 17
quality: 70,  // Try 70-80 for smaller files
```

## 📖 Detailed Guides

- **Step-by-step setup**: [SETUP_IMAGES.md](./SETUP_IMAGES.md)
- **Complete guide**: [IMAGE_GUIDE.md](./IMAGE_GUIDE.md)
- **Performance tips**: [IMAGE_PERFORMANCE.md](./IMAGE_PERFORMANCE.md)

## 💡 Pro Tips

1. **Batch Process**: Don't convert images one by one - use the script!
2. **Featured First**: Start with one featured image per category
3. **Test Locally**: Always test before deploying
4. **Backup Originals**: Keep source-images/ separate from public/
5. **Use Placeholders**: They show when images are loading or missing

## 🎯 Common Tasks

### Add a new product category
1. Update `src/lib/products.ts` with new category
2. Create folder: `source-images/products/{new-category}/`
3. Add `featured.jpg` to new folder
4. Run `npm run images:optimize`

### Update an existing image
1. Replace in `source-images/`
2. Run `npm run images:optimize`
3. Clear browser cache (Ctrl+Shift+R)

### Optimize for mobile
Images are already mobile-optimized! The `OptimizedImage` component handles:
- Responsive sizing
- Lazy loading
- Bandwidth-friendly loading

## 🎓 Key Files

| File | What It Does |
|------|--------------|
| `src/components/OptimizedImage.tsx` | Smart image component |
| `src/lib/products.ts` | Product data & image paths |
| `scripts/optimize-images.js` | Batch image processor |
| `scripts/create-placeholder.js` | Placeholder generator |

## 📞 Need More Help?

1. Check [SETUP_IMAGES.md](./SETUP_IMAGES.md) for step-by-step instructions
2. Review [IMAGE_GUIDE.md](./IMAGE_GUIDE.md) for detailed documentation
3. See [IMAGE_PERFORMANCE.md](./IMAGE_PERFORMANCE.md) for performance insights

---

**Quick Start**: Place images in `source-images/`, run `npm run images:optimize`, test with `npm run dev` 🚀
