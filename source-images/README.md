# 📸 Source Images Folder

## Purpose

This folder contains your **original, unoptimized** product photos (JPG, JPEG, PNG).

The optimization script will:
1. Read images from this folder
2. Convert them to WebP format
3. Optimize dimensions and quality
4. Save them to `public/images/` (ready for web)

## ⚠️ Important

- **DO NOT** delete this folder - keep it as your backup
- **DO** place original high-quality photos here
- **DO** organize by category (notebooks, pens, etc.)
- **DO** include a `featured.jpg` or `featured.png` in each category

## 📁 Structure

```
source-images/
├── products/
│   ├── notebooks/
│   │   ├── featured.jpg          ← REQUIRED - main card image
│   │   ├── notebook-spiral.jpg
│   │   ├── notebook-hardcover.jpg
│   │   └── ...
│   ├── pens/
│   │   ├── featured.jpg          ← REQUIRED - main card image
│   │   ├── pen-ballpoint-blue.jpg
│   │   └── ...
│   ├── geometry/
│   │   ├── featured.jpg
│   │   └── ...
│   ├── school-supplies/
│   │   ├── featured.jpg
│   │   └── ...
│   ├── office-supplies/
│   │   ├── featured.jpg
│   │   └── ...
│   └── art-craft/
│       ├── featured.jpg
│       └── ...
└── gifts/
    ├── featured.jpg
    └── ...
```

## 🚀 Quick Start

1. **Add your photos** to the appropriate category folders
2. **Ensure each category has a `featured` image**
3. **Run optimization**:
   ```bash
   npm run images:optimize
   ```
4. **Check output** in `public/images/`

## 📋 Image Requirements

### Minimum
- Format: JPG, JPEG, or PNG
- At least one `featured` image per category

### Recommended
- Resolution: 1200×900px or higher (will be resized)
- Quality: High (original camera quality is fine)
- Background: White or neutral color
- Lighting: Well-lit, clear product
- File naming: Descriptive (e.g., `notebook-spiral-blue.jpg`)

## 💡 Tips

- **Keep originals**: Don't delete these after optimization
- **Batch organize**: Sort all photos before optimizing
- **Use descriptive names**: `pen-gel-black.jpg` not `IMG_1234.jpg`
- **One featured per category**: The script looks for this name
- **High quality is OK**: The script will optimize automatically

## 🔄 Workflow

```
1. Take photos of products
   ↓
2. Transfer to computer
   ↓
3. Place in source-images/products/{category}/
   ↓
4. Rename to descriptive names
   ↓
5. Ensure "featured" image exists
   ↓
6. Run: npm run images:optimize
   ↓
7. Check public/images/ for optimized versions
   ↓
8. Test on website: npm run dev
```

## ✅ Checklist Before Optimizing

- [ ] All photos are in correct category folders
- [ ] Each category has a `featured.jpg` or `featured.png`
- [ ] File names are descriptive
- [ ] Photos are clear and well-lit
- [ ] Ready to run `npm run images:optimize`

---

**Need help?** Check [SETUP_IMAGES.md](../SETUP_IMAGES.md) or [IMAGE_GUIDE.md](../IMAGE_GUIDE.md)
