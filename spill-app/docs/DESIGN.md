# Design System

## Color Palette

### Primary Colors
- **Neon Pink**: `#FF10F0` - Primary brand color, CTAs, highlights
- **Lavender**: `#B695F8` - Secondary color, accents, labels
- **Deep Black**: `#0A0A0A` - Background
- **Dark Gray**: `#1A1A1A` - Cards, containers
- **Medium Gray**: `#2A2A2A` - Borders, dividers

### Status Colors
- **Green (Good Vibes)**: `#00FF88`
- **Yellow (Mixed Vibes)**: `#FFB800`
- **Red (Caution)**: `#FF4444`

### Text Colors
- **Primary Text**: `#FFFFFF`
- **Secondary Text**: `#666666`

## Typography

### Font Weights
- Regular: 400
- Semi-bold: 600
- Bold: 700

### Font Sizes
- Hero/Logo: 60px
- Page Title: 28-32px
- Section Title: 20px
- Body Large: 18px
- Body: 16px
- Body Small: 14px
- Caption: 12px

## Spacing

### Padding/Margin Scale
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px

### Border Radius
- Small: 8px
- Medium: 12px
- Large: 20px
- Pill: 999px

## Components

### Buttons

#### Primary Button
```tsx
backgroundColor: '#FF10F0'
color: '#FFFFFF'
padding: 16px 32px
borderRadius: 12px
fontWeight: 'bold'
fontSize: 18px
```

#### Secondary Button
```tsx
backgroundColor: 'transparent'
borderWidth: 2px
borderColor: '#B695F8'
color: '#B695F8'
padding: 16px 32px
borderRadius: 12px
fontWeight: 'bold'
fontSize: 18px
```

### Cards
```tsx
backgroundColor: '#1A1A1A'
borderRadius: 12px
borderWidth: 1px
borderColor: '#2A2A2A'
padding: 16px
```

### Input Fields
```tsx
backgroundColor: '#1A1A1A'
color: '#FFFFFF'
borderRadius: 12px
borderWidth: 1px
borderColor: '#2A2A2A'
padding: 16px
fontSize: 16px
```

### Tags
```tsx
backgroundColor: '#2A2A2A'
color: '#B695F8'
padding: 4px 10px
borderRadius: 12px
fontSize: 12px
```

## Icons & Emojis

### Post Types
- Spill: ☕
- Sip: 🍵
- Brew: 🫖

### Vibe Check
- Good: 🟢
- Mixed: 🟡
- Caution: 🔴
- AI: 🤖

### Features
- Search: 🔍
- Profile: 👤
- Verified: 🏳️‍🌈
- Safety: 🛡️
- Lock: 🔒
- Flag: 🚩

## Animations

### Transitions
- Duration: 200-300ms
- Easing: ease-in-out

### Effects
- Button press: Scale 0.95
- Card hover: Subtle elevation
- Page transitions: Slide/fade

## Layout

### Screen Padding
- Horizontal: 16px
- Vertical: 20px

### Feed Items
- Margin between: 12px
- Max width: 100%

### Safe Areas
- Always use SafeAreaView for mobile
- Account for notch/home indicator

## Accessibility

### Contrast Ratios
- Primary text on dark background: 12:1
- Secondary text on dark background: 4.5:1
- Buttons meet WCAG AA standards

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px

### Text Sizing
- Scalable for accessibility
- Support dynamic type sizing
