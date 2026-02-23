# Afristudio - Artwork Website Specification

## 1. Project Overview

- **Project Name**: Afristudio
- **Type**: Single-artist artwork e-commerce website (React)
- **Core Functionality**: Showcase and sell artworks by a single African artist, featuring artist bio, artwork gallery, communication options, and international/domestic payment methods
- **Target Users**: Art collectors, art enthusiasts, buyers interested in African art

---

## 2. UI/UX Specification

### Layout Structure

**Pages:**
1. **Home** - Hero section with featured artwork, artist intro, featured works
2. **Gallery** - Grid of all artworks with filtering/sorting
3. **Artwork Detail** - Individual artwork page with purchase options
4. **About Artist** - Full artist biography and story
5. **Contact** - Communication methods (international & domestic)

**Page Sections:**
- **Header**: Logo (left), Navigation (center), Cart icon (right)
- **Footer**: Social links, copyright, secondary navigation

**Responsive Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

**Color Palette:**
- Primary: `#1A1A2E` (Deep Navy)
- Secondary: `#E8D5B7` (Warm Sand/Beige)
- Accent: `#C9A227` (African Gold)
- Background: `#FAF8F5` (Off-white/Cream)
- Text Primary: `#1A1A2E`
- Text Secondary: `#5C5C6D`
- Success: `#2D6A4F`
- Error: `#9B2335`

**Typography:**
- Headings: "Playfair Display" (serif) - elegant, artistic feel
- Body: "DM Sans" (sans-serif) - clean, modern readability
- Accent/Labels: "Cormorant Garamond" (serif) - refined elegance

**Font Sizes:**
- H1: 56px (desktop), 36px (mobile)
- H2: 42px (desktop), 28px (mobile)
- H3: 28px (desktop), 22px (mobile)
- Body: 16px
- Small: 14px
- Caption: 12px

**Spacing System:**
- Base unit: 8px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Container max-width: 1200px
- Grid gap: 24px

**Visual Effects:**
- Subtle box shadows on cards: `0 4px 20px rgba(26, 26, 46, 0.08)`
- Hover lift effect on artwork cards: translateY(-8px)
- Smooth transitions: 0.3s ease-out
- Image hover: subtle scale (1.02) with overlay
- Gold accent line decorations

### Components

**1. Navigation Bar**
- Fixed position on scroll
- Transparent on hero, solid on scroll
- Mobile: hamburger menu with slide-in drawer

**2. Hero Section**
- Full viewport height
- Featured artwork as background with dark overlay
- Animated text reveal
- Call-to-action button

**3. Artwork Card**
- Image container with aspect ratio 4:5
- Overlay on hover with title, year, price
- "View Details" button appears on hover
- Quick "Add to Cart" icon

**4. Artwork Detail Modal/Page**
- Large image gallery (main + thumbnails)
- Title, year, medium, dimensions
- Price with currency options
- "Add to Cart" and "Contact for Purchase" buttons
- Artist info link
- Share buttons

**5. Filter Bar**
- Category filter (painting, sculpture, digital, etc.)
- Price range slider
- Sort options (newest, price low-high, price high-low)
- Search input

**6. Cart Sidebar**
- Slide-in from right
- Item list with thumbnails
- Quantity controls
- Subtotal
- Checkout button

**7. Contact Section**
- International methods: Email, WhatsApp, Instagram DM
- Domestic methods: Local phone, Local bank transfer
- Contact form
- Response time indicator

**8. Payment Options Display**
- International: PayPal, Stripe, Western Union, Bank Wire
- Domestic: Mobile Money, Local Bank Transfer, Cash on Delivery
- Visual icons for each method

---

## 3. Functionality Specification

### Core Features

**1. Artwork Gallery**
- Display all artworks in responsive grid
- Filter by category
- Sort by price, date, popularity
- Search functionality
- Lazy loading for images

**2. Artwork Details**
- Multiple image views
- Detailed specifications (medium, dimensions, year)
- Price display with currency toggle (USD, EUR, GBP, Local)
- Add to cart functionality

**3. Shopping Cart**
- Add/remove items
- Update quantities
- Persistent cart (localStorage)
- Display subtotal

**4. Artist Profile**
- Full biography
- Artist story/philosophy
- Profile image
- Exhibition history
- Social media links

**5. Contact/Communication**
- Multiple contact channels
- Contact form with validation
- Clear indication of international vs domestic options

**6. Payment Information**
- Clear display of all payment methods
- Separate sections for international and domestic
- Detailed instructions for each method

### User Interactions

- Smooth scroll navigation
- Page transitions
- Form validations
- Toast notifications for actions
- Loading states

### Data Handling

- Static artwork data (JSON)
- Cart state management (React Context)
- localStorage for cart persistence

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Hero section displays with featured artwork and animated text
- [ ] Navigation is fixed and changes style on scroll
- [ ] Artwork grid displays correctly on all breakpoints
- [ ] Hover effects work on artwork cards
- [ ] Color scheme matches specification (gold accents, cream background)
- [ ] Typography uses specified font families
- [ ] Cart sidebar slides in smoothly

### Functional Checkpoints
- [ ] All navigation links work correctly
- [ ] Artwork filtering and sorting works
- [ ] Add to cart updates cart count
- [ ] Cart persists on page refresh
- [ ] Contact form validates inputs
- [ ] Payment methods are clearly displayed
- [ ] Responsive design works on mobile/tablet/desktop

### Technical Checkpoints
- [ ] React app builds without errors
- [ ] No console errors on page load
- [ ] Images load correctly
- [ ] Smooth animations and transitions

---

## 5. Technical Stack

- **Framework**: React 18 with Vite
- **Styling**: CSS Modules or Styled Components
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather + Font Awesome)
