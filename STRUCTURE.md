# Abhigyan 25 - Multi-Page Website Structure

## 📁 Project Structure

```
GEMI_JS/
├── css/
│   └── main.css                 # Main stylesheet with shared styles
├── js/
│   └── main.js                  # Main JavaScript file with shared functionality
├── images/                      # All image assets
│   ├── Abhigyan_25.gif         # Loader animation
│   ├── club_logo.png           # ECE Department logo
│   ├── srm_lgo.webp           # SRM University logo
│   ├── unstop.png             # Unstop platform logo
│   └── ...                    # Event posters and other images
├── index.html                  # Redirect page (redirects to home.html)
├── home.html                   # Main homepage
├── events.html                 # Events and competitions page
├── team.html                   # Team and coordinators page
├── contact.html                # Contact form and information
├── past-events.html           # Past editions timeline
├── package.json               # Project dependencies
├── vercel.json                # Vercel deployment configuration
└── README.md                  # Project documentation
```

## 🔧 Technical Architecture

### **Shared Components**
- **CSS Framework**: `css/main.css` contains all shared styles
- **JavaScript Core**: `js/main.js` handles common functionality
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Performance**: Lazy loading, optimized images, and efficient animations

### **Page-Specific Features**

#### 🏠 Home Page (`home.html`)
- Hero section with animated background
- Live countdown timer
- Featured events showcase
- Abhigyan poster display
- About section

#### 🎯 Events Page (`events.html`)
- Event filtering (Technical/Non-Technical)
- Interactive event cards
- Modal details view
- Direct registration links

#### 👥 Team Page (`team.html`)
- Faculty coordinators section
- Domain-wise team organization
- Contact information for each member
- Responsive team grid

#### 📞 Contact Page (`contact.html`)
- Contact form with validation
- EmailJS integration
- Google Maps embed
- Contact information cards

#### 📚 Past Events Page (`past-events.html`)
- Timeline layout
- Past editions showcase
- Statistics and highlights
- Mini countdown timer

## 🚀 Deployment & Setup

### **Local Development**
```bash
# Navigate to project directory
cd GEMI_JS

# Start local server (option 1 - Python)
python -m http.server 8000

# Start local server (option 2 - Node.js)
npx http-server

# Start local server (option 3 - VS Code Live Server)
# Use Live Server extension in VS Code
```

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

### **Static Hosting**
The website is completely static and can be hosted on:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Firebase Hosting
- Any static hosting service

## 📱 Responsive Design

### **Breakpoints**
- **Desktop**: ≥769px
- **Tablet**: ≤768px
- **Mobile**: ≤480px
- **Small Mobile**: ≤375px
- **Very Small Mobile**: ≤320px

### **Mobile Features**
- Adaptive navigation with optimized spacing
- Touch-friendly interactions
- Progressive font scaling
- Optimized image loading
- Corner logo positioning

## 🎨 Design System

### **Colors**
- Primary: `#37fd12` (Green)
- Secondary: `#ff6b6b` (Red)
- Accent: `#4ecdc4` (Cyan)
- Dark: `#0a0a0a`
- Darker: `#050505`

### **Typography**
- Headers: 'Orbitron' (Futuristic)
- Body: 'Inter' (Clean & Modern)
- Accent: 'Satisfy' (Cursive)

### **Effects**
- Glassmorphism backgrounds
- Gradient text effects
- Smooth animations with GSAP
- 3D particle background
- Custom cursor (desktop only)

## 🔌 Integrations

### **External Libraries**
- **GSAP**: Animations and transitions
- **Three.js**: 3D background effects
- **EmailJS**: Contact form functionality

### **Performance Features**
- Lazy loading images
- Resource hints and preloading
- Optimized asset delivery
- Progressive enhancement

## 📋 Maintenance

### **Adding New Events**
1. Update event data in `events.html`
2. Add corresponding images to `/images/` folder
3. Update registration links
4. Test responsive design

### **Updating Team Information**
1. Modify team data in `team.html`
2. Add member photos to `/images/` folder
3. Update contact information

### **Modifying Styles**
1. Edit shared styles in `css/main.css`
2. Add page-specific styles in individual HTML files
3. Test across all breakpoints

## 🎯 SEO & Accessibility

### **SEO Features**
- Semantic HTML structure
- Meta tags and descriptions
- Proper heading hierarchy
- Image alt attributes
- Canonical URLs

### **Accessibility**
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus indicators
- ARIA labels where needed

## 🔒 Security

### **Best Practices**
- No server-side code vulnerabilities
- Secure external API integration
- Input validation on forms
- Content Security Policy ready

## 📈 Analytics Ready

The structure supports easy integration of:
- Google Analytics
- Google Tag Manager
- Custom analytics solutions
- Performance monitoring tools

---

## 🎉 Benefits of Multi-Page Structure

1. **Better SEO**: Each page can be optimized for specific keywords
2. **Faster Loading**: Smaller page sizes and targeted assets
3. **Better UX**: Dedicated pages for specific purposes
4. **Easier Maintenance**: Modular code structure
5. **Scalability**: Easy to add new pages and features
6. **Performance**: Optimized resource loading per page

This structure provides a solid foundation for the Abhigyan 25 website with modern web development best practices!