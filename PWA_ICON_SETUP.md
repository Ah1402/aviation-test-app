# PWA Icon Setup for Aviation Test App

## Required Icons

You need to create two PNG versions of your logo with **transparent background**:

### 1. icon-192.png (192x192 pixels)
- File: `src/images/icon-192.png`
- Size: 192 x 192 pixels
- Format: PNG with transparent background
- Use: Android home screen, browser tab

### 2. icon-512.png (512x512 pixels)
- File: `src/images/icon-512.png`
- Size: 512 x 512 pixels
- Format: PNG with transparent background
- Use: High-resolution displays, splash screen

## How to Create Icons from Your Logo

### Option 1: Using Online Tool (Easiest)
1. Go to https://realfavicongenerator.net/ or https://www.favicon-generator.org/
2. Upload your airplane logo image
3. Select "Generate PWA icons"
4. Download the generated files
5. Rename to `icon-192.png` and `icon-512.png`
6. Place in `src/images/` folder

### Option 2: Using Image Editor
1. Open your logo in Photoshop, GIMP, or Paint.NET
2. **Important**: Make sure background is transparent (not white)
3. Resize to 192x192 pixels → Save as `icon-192.png`
4. Resize to 512x512 pixels → Save as `icon-512.png`
5. Place both files in `src/images/` folder

### Option 3: Using PowerShell + ImageMagick
```powershell
# If you have ImageMagick installed
magick logo.jpg -resize 192x192 -background none icon-192.png
magick logo.jpg -resize 512x512 -background none icon-512.png
```

## Current Setup

The app is already configured to use these icons. Once you place:
- `src/images/icon-192.png`
- `src/images/icon-512.png`

The logo will appear when users:
- Add to home screen on iPhone/Android
- Install as PWA on desktop
- View in browser tabs

## Testing

After adding the icons:
1. Open the app on your phone
2. Tap browser menu → "Add to Home Screen"
3. You should see your airplane logo with transparent background
4. The icon will appear on your phone's home screen

## Notes

- **Transparent background is crucial** - otherwise you'll see a white/colored box around the logo
- PNG format required (not JPG)
- Icons should be square (same width and height)
- The airplane logo shape will show perfectly with transparent background
