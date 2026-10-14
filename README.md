# Sarva Collectives Website

A modern, motion-rich website for Sarva Collectives boutique, showcasing cotton co-ord sets, Hakoba co-ord sets, maxis, and three-piece collections by founder Bharani K T in Kalapatti, Coimbatore.

## 🌟 Overview

This is a standalone, fully responsive website featuring:
- Cinematic intro animation with brand logo
- Interactive motion field background using HTML5 Canvas
- Smooth scroll-triggered animations
- Touch-optimized mobile experience
- Responsive design with breakpoints at 640px, 768px, and 960px

## 📁 Project Structure

```
.
├── index.html              # Main HTML structure
├── styles.css              # Complete visual system and responsive styles
├── script.js               # Motion field, animations, and interactions
├── sarva-logo.jpeg         # Brand logo
├── founder-pic.jpeg        # Founder photograph
├── collection-*.png        # Collection showcase images
└── README.md              # This file
```

## 🚀 Quick Start

### Local Development

Simply open `index.html` in a modern web browser to preview the website locally:

```bash
# Option 1: Direct file open
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# Option 2: Local server (recommended for testing)
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Then visit http://localhost:8000
```

### Production Deployment

Upload all files to your web hosting provider:
- Maintain the flat file structure (all files in root directory)
- Ensure proper MIME types are set for CSS and JS files
- Test on multiple devices after deployment

## 📱 Responsive Design

### Breakpoints

The website uses a mobile-first responsive strategy with the following breakpoints:

- **Mobile**: `< 768px` - Single column layouts, touch-optimized targets, reduced animations
- **Tablet**: `768px - 960px` - Two-column grids where appropriate
- **Desktop**: `> 960px` - Full multi-column layouts with all effects

### Mobile Optimizations

**Layout**:
- Single column layouts for all major sections
- Collections grid: 2 columns at 768px, 1 column at 640px
- Vertical stacking of contact buttons and address sections

**Touch Targets**:
- Minimum 44x44px touch target size for all interactive elements
- Increased padding for navigation links on mobile
- Easy-to-tap WhatsApp, Instagram, and email buttons

**Performance**:
- Reduced particle count in canvas animation (25-45 particles on mobile vs 42-95 on desktop)
- Frame rate throttling to 30fps on mobile (vs 60fps on desktop)
- Canvas disabled on screens < 480px
- Tilt effects disabled on touch devices
- Paused background animations on mobile to reduce CPU usage

**Typography**:
- Fluid typography using `clamp()` for optimal readability
- Minimum 14px body text size maintained across all viewports
- Line height between 1.4-1.6 for comfortable reading

## 🎨 Design System

### Color Palette

```css
--ink: #171016        /* Primary text */
--paper: #fff8ef      /* Background base */
--soft: #f4e5d3       /* Soft accent */
--muted: #74635c      /* Secondary text */
--plum: #5d136c       /* Brand purple */
--gold: #d8a536       /* Brand gold */
--rose: #b45a62       /* Accent rose */
--leaf: #496b4d       /* Accent green */
--blue: #314a8a       /* Accent blue */
```

### Typography

- **Display/Headings**: Playfair Display
- **Collections**: Cormorant Garamond
- **Contact**: Manrope
- **Body**: Inter, system-ui

### Animation Philosophy

- Cinematic intro with logo reveal and sweep effects
- Continuous canvas particle field for depth
- Scroll-triggered reveals with intersection observer
- Interactive tilt effects on collection cards (desktop only)
- Magnetic attraction effects on buttons and links

## 🛠 Technical Features

### Canvas Animation System

The motion field (`#motion-field`) creates an ambient particle system:
- Particles move in wave patterns using sine/cosine functions
- Magnetic pull effect follows cursor position
- Connections drawn between nearby particles
- Color gradient overlay for visual depth
- Optimized for mobile with reduced particle count and frame throttling

### Scroll Effects

- Progress bar at top of page tracks scroll position
- Intersection observer reveals elements as they enter viewport
- Smooth scroll behavior for anchor navigation
- Parallax-style floating decorative elements

### Interactive Elements

- **Tilt cards**: 3D rotation on collection cards (desktop only)
- **Magnetic links**: Subtle attraction effect on hover
- **Founder cinema**: Interactive gradient that follows cursor
- **Custom cursor**: Animated dot that scales on interactive elements (desktop only)

## 📞 Business Details

**Founder**: Bharani K T  
**Mobile**: 7305721318  
**Email**: sarvacollectives@gmail.com  
**Instagram**: [@sarva_collectives](https://www.instagram.com/sarva_collectives?stkn=dHZ5OHBmOW1hMHNu)

**Address**:  
Sreevatsa Sankara Apartment  
Vazhiampalayam Rd, Kalapatti  
Coimbatore - 641048

### WhatsApp Integration

All WhatsApp links include pre-filled message text:
```
Hello Sarva Collectives!

I would like to inquire about your collections.

Thank you!
```

## 🌐 Browser Compatibility

### Supported Browsers

- **Chrome/Edge**: Last 2 versions (recommended)
- **Firefox**: Last 2 versions
- **Safari**: Last 2 versions (iOS and macOS)

### Required Features

The website uses modern web technologies:
- CSS Grid and Flexbox for layouts
- CSS Custom Properties (variables)
- CSS clamp() for responsive typography
- HTML5 Canvas API for motion field
- Intersection Observer API for scroll reveals
- CSS backdrop-filter for frosted glass effects

### Progressive Enhancement

- JavaScript disabled: Site remains functional with HTML and CSS
- Canvas not supported: Site works without background animation
- Backdrop filter not supported: Solid background fallback applied
- Reduced motion preference: All animations respect `prefers-reduced-motion`

## 🔧 Customization

### Update Business Details

Edit `index.html` to update:
- Contact information (phone, email, social media)
- Address details
- Founder name and biography
- Collection descriptions

### Modify Colors

Edit CSS custom properties in `styles.css`:
```css
:root {
  --plum: #5d136c;   /* Brand purple */
  --gold: #d8a536;   /* Brand gold */
  /* Add or modify color variables */
}
```

### Adjust Animations

Control animation intensity in `styles.css` and `script.js`:
- Particle count: Modify formulas in `resize()` function
- Animation duration: Update `@keyframes` timing
- Motion sensitivity: Adjust multipliers in event handlers

### Add Collection Cards

Add new cards in the `.collection-grid` section of `index.html`:
```html
<article class="collection-card" data-tilt data-reveal>
  <div class="collection-media">
    <img src="your-image.png" alt="Collection name">
  </div>
  <div class="collection-copy">
    <span>New</span>
    <h3>Collection Name</h3>
    <p class="catchline">Your tagline</p>
    <p>Description of the collection...</p>
  </div>
</article>
```

## 📊 Performance Tips

### Image Optimization

- Compress all PNG/JPEG images before deployment
- Use appropriate dimensions (collection images: 800x600px recommended)
- Consider WebP format for better compression with fallbacks

### Loading Performance

- All assets are local (no CDN dependencies except Google Fonts)
- Fonts are preconnected in HTML `<head>`
- CSS and JS are not minified - minify for production if needed

### Mobile Performance

- Canvas automatically disabled on screens < 480px
- Reduced particle count on mobile (25-45 vs 42-95)
- Frame throttling to 30fps on mobile devices
- Background animations paused to conserve battery

## 🐛 Known Considerations

- Custom cursor only visible on desktop (hidden on mobile)
- Tilt effects require pointer device (disabled on touch screens)
- Canvas performance varies by device (optimizations in place)
- Some animations respect `prefers-reduced-motion` for accessibility

## 📄 License

See LICENSE file for details.

## 🤝 Credits

**Sarva Collectives**  
Website designed and developed for the boutique brand founded by Bharani K T, Coimbatore.

---

For support or inquiries, contact: sarvacollectives@gmail.com
