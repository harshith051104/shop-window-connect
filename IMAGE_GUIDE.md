# 📸 Image Organization Guide for Shop Window Connect

## 📁 Folder Structure

```
public/
  images/
    products/
      notebooks/
        featured.webp          # Main card image (used on homepage)
        notebook-1.webp
        notebook-2.webp
        ...
      pens/
        featured.webp
        pen-1.webp
        pen-2.webp
        ...
      geometry/
        featured.webp
        geometry-set-1.webp
        ...
      school-supplies/
        featured.webp
        school-bag-1.webp
        ...
      office-supplies/
        featured.webp
        office-file-1.webp
        ...
      art-craft/
        featured.webp
        art-colors-1.webp
        ...
    gifts/
      featured.webp
      gift-set-1.webp
      ...
    placeholders/
      product-placeholder.webp  # Fallback image (800x600px recommended)
```

## 🎯 Image Requirements

### For Category Cards (featured.webp)
- **Dimensions**: 800x600px (4:3 aspect ratio)
- **Format**: WebP
- **File Size**: Under 100KB
- **Content**: Clear product photo, well-lit, white/neutral background

### For Individual Product Images
- **Dimensions**: 800x800px or 800x600px
- **Format**: WebP
- **File Size**: Under 150KB each
- **Quality**: 80-85% for WebP

## 🛠️ Converting Images to WebP

### Option 1: Using Online Tools (Easiest)
1. Visit https://squoosh.app/
2. Upload your image
3. Select WebP format
4. Adjust quality to 80-85%
5. Download

### Option 2: Using Command Line (Batch Processing)

#### Windows (PowerShell)
```powershell
# Install cwebp (one-time setup)
# Download from: https://developers.google.com/speed/webp/download

# Convert single image
cwebp -q 85 input.jpg -o output.webp

# Convert all JPG/PNG in a folder
Get-ChildItem *.jpg | ForEach-Object {
    cwebp -q 85 $_.FullName -o ($_.BaseName + ".webp")
}
```

#### Using Node.js Script (Recommended for 300+ images)
```bash
npm install sharp --save-dev
node scripts/optimize-images.js
```

## 📊 Performance Best Practices

### ✅ DO:
- Use WebP format for all product images
- Keep featured images under 100KB
- Use descriptive alt text for accessibility
- Use the `featured.webp` naming convention for card images
- Compress images before uploading

### ❌ DON'T:
- Upload original camera photos (usually 3-5MB)
- Use inconsistent dimensions within the same category
- Skip alt text
- Use generic filenames like `image1.jpg`

## 🚀 Quick Start Steps

1. **Create the folder structure**
   ```bash
   mkdir -p public/images/products/{notebooks,pens,geometry,school-supplies,office-supplies,art-craft}/
   mkdir -p public/images/gifts/
   mkdir -p public/images/placeholders/
   ```

2. **Add your images**
   - Place one `featured.webp` in each product category folder
   - Add additional product images as needed

3. **Create a placeholder image**
   - Create a 800x600px image with your shop logo/text
   - Save as `public/images/placeholders/product-placeholder.webp`

4. **Test locally**
   ```bash
   npm run dev
   ```

## 🔍 Testing Checklist

- [ ] All featured images load correctly
- [ ] Placeholder appears when image is missing
- [ ] Images are lazy-loaded (check Network tab in DevTools)
- [ ] Mobile performance is good (test on 3G throttling)
- [ ] Alt text is descriptive and helpful

## 📱 Mobile Optimization

The `OptimizedImage` component automatically:
- ✅ Lazy loads images as user scrolls
- ✅ Shows loading skeleton while loading
- ✅ Falls back to placeholder on error
- ✅ Uses aspect-ratio for stable layouts (no layout shift)

## 🎨 Image Naming Convention

```
{category}-{item-name}-{variant}.webp

Examples:
- notebooks-spiral-blue.webp
- pens-ballpoint-blue.webp
- geometry-box-premium.webp
```

## 💡 Pro Tips

1. **Batch Optimize**: Process all images at once using the Node script
2. **Consistent Lighting**: Use consistent lighting for all product photos
3. **White Background**: Use white/neutral backgrounds for professional look
4. **Product Focus**: Keep the product centered and prominent
5. **Multiple Angles**: Store 3-4 angles per product for future use

## 🐛 Troubleshooting

### Images not loading?
- Check file path matches exactly (case-sensitive)
- Ensure image is in `public/` folder
- Clear browser cache (Ctrl+Shift+R)

### Images too large?
- Re-compress with lower quality (70-80%)
- Resize to recommended dimensions
- Use online tools like TinyPNG first, then convert to WebP

### Slow loading?
- Ensure images are under 100KB
- Check if lazy loading is working (Network tab)
- Consider adding a CDN for production

## 📦 For GitHub Pages Deployment

GitHub Pages serves files from the `public/` folder automatically when using Vite:

```bash
npm run build
# dist/ folder will contain optimized public/images/
```

All image paths starting with `/images/` will work correctly!
