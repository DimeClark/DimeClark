# Spill App - UI Screenshots & Mockups

This document describes the visual appearance and user interface of the Spill mobile application.

## 🎨 Color Scheme & Visual Identity

### Brand Colors
- **Neon Pink (#FF10F0)**: Primary brand color for buttons, highlights, and CTAs
- **Lavender (#B695F8)**: Secondary color for accents, labels, and secondary elements
- **Deep Black (#0A0A0A)**: Main background color for dark mode aesthetic
- **Dark Gray (#1A1A1A)**: Card backgrounds and containers
- **Medium Gray (#2A2A2A)**: Borders and subtle dividers

### Visual Style
- **Modern & Bold**: High contrast design with vibrant neon accents
- **Gender-Inclusive**: Typography and language that respects all identities
- **Minimalist**: Clean layouts with plenty of breathing room
- **Instagram Stories meets YikYak**: Swipeable, story-like interface with anonymous community vibes

## 📱 Screen Descriptions

### 1. Onboarding Screen (index.tsx)

**Visual Elements:**
- Large centered logo: "☕ Spill" in 60px neon pink
- Tagline: "Spill the Tea on Dating" in lavender
- Subtitle text explaining the app's purpose
- Feature list with emojis:
  - ✨ Post anonymous reviews
  - 🔍 Search before you date
  - 🤖 AI Vibe Check messages
  - 🏳️‍🌈 Built for the community

**Buttons:**
- **"Get Started"** - Full-width neon pink button with white text
- **"Sign In"** - Outlined lavender button below

**Background:** Deep black (#0A0A0A)

---

### 2. Sign Up Screen (auth/signup.tsx)

**Visual Layout:**
- Page title "Create Account" in neon pink
- Subtitle "Join the community ✨" in lavender
- Form fields in dark gray containers with white text:
  - Name
  - Email
  - Password
  - Pronouns (e.g., she/her, they/them)
  - Gender Identity
  - Orientation
  - City

**Buttons:**
- **"Sign Up"** - Full-width neon pink button
- Divider with "OR" text
- **"🍎 Continue with Apple"** - Dark gray outlined button
- **"🔍 Continue with Google"** - Dark gray outlined button
- Bottom link: "Already have an account? Sign In" (lavender)

**Styling:**
- Scrollable form
- Each input has dark background with subtle border
- Rounded corners (12px) on all elements

---

### 3. Login Screen (auth/login.tsx)

**Visual Layout:**
- Title: "Welcome Back" in neon pink
- Subtitle: "Sign in to spill the tea ☕" in lavender
- Simple form:
  - Email input
  - Password input

**Buttons:**
- **"Sign In"** - Full-width neon pink button
- Same OAuth options as signup
- Bottom link: "Don't have an account? Sign Up" (lavender)

**Styling:**
- Centered vertically
- Clean, minimal design
- Focus on quick login

---

### 4. Feed Screen ((tabs)/feed.tsx)

**Header:**
- "Spill" logo/title in neon pink
- **"+ New Spill"** button in neon pink on the right

**Filter Tabs:** (Horizontal scrollable)
- **All** (active in neon pink)
- **☕ Spills** (inactive)
- **🍵 Sips** (inactive)
- **🫖 Brews** (inactive)

**Post Cards:** (Dark gray background, rounded corners)
Each card contains:
- Post type badge with icon (☕/🍵/🫖) and colored label
- Timestamp ("2h ago")
- Author: "Anonymous" in lavender
- Rating stars (⭐⭐⭐⭐⭐) if applicable
- Content text in white
- Tags in pill shapes (#green-flag, #respectful)
- Engagement row:
  - ❤️ Likes count
  - 💬 Reply button
  - 🔗 Share button

**Visual Hierarchy:**
- Cards stacked vertically with 12px spacing
- Type-specific colors:
  - Spill: Neon pink
  - Sip: Lavender
  - Brew: Yellow/Gold

---

### 5. Search Screen ((tabs)/search.tsx)

**Header:**
- "Search" title in neon pink

**Search Bar:**
- Large search input with 🔍 icon
- Placeholder: "Search by name, username, or keywords..."
- Dark background with rounded corners

**Filter Section:**
- "Filter By" heading in lavender
- Three filter inputs:
  - Location
  - Pronouns
  - Zodiac Sign
- **"Search"** button in neon pink

**Popular Tags:** (Horizontal scroll)
- Pills with #hashtags in lavender
- Examples: #red-flag, #green-flag, #respectful, #ghosting

**Recent Searches:**
- List items with 🕐 icon
- Previous search queries shown

**Privacy Notice:**
- 🔒 icon with text in lavender
- "All searches are private and anonymous"

---

### 6. Vibe Check Screen ((tabs)/vibe-check.tsx)

**Header:**
- "Vibe Check" title in neon pink
- "AI-powered message analysis 🤖" subtitle

**Info Card:**
- 💡 icon with explanation text
- Light text on dark background

**Input Section:**
- Label: "Message to Analyze" in lavender
- Large text area (dark background)
- Placeholder: "Paste the message or conversation here..."
- **"Check Vibe"** button (disabled when empty)

**Results Card:** (When analysis complete)
- **Vibe Score Display:**
  - Large number (0-100) in color-coded text
  - Emoji indicator (🟢/🟡/🔴)
  - Level label ("GOOD VIBES", "MIXED", "CAUTION")

- **Indicators Section:**
  - List of detected patterns
  - Each with icon (✅/🚩/⚪) and description

- **Recommendations:**
  - Bullet points with advice
  - Based on vibe score

- **Disclaimer:**
  - ⚠️ Warning about AI limitations
  - Border in neon pink

**Tips Section:**
- "What We Look For:" heading
- List with 🔍 icons explaining detection criteria

---

### 7. Profile Screen ((tabs)/profile.tsx)

**Header:**
- Large avatar emoji (👤) with LGBTQ+ badge overlay (🏳️‍🌈)
- Name in white
- Pronouns in lavender

**Stats Row:**
- Three columns showing:
  - **12 Spills**
  - **34 Sips**
  - **5 Brews**
- Numbers in neon pink

**"Edit Profile"** button (outlined, lavender)

**About Section:**
- "About" heading in lavender
- Info rows:
  - Gender Identity: Non-binary
  - Orientation: Queer
  - Location: Brooklyn, NY

**Safe Date Tips Hub 🛡️:**
- Section heading in lavender
- Resource cards with icons:
  - 📚 Dating Safety Guide
  - 📞 Crisis Hotlines
  - 🚨 Report Harassment
  - 💬 Red Flag Recognition

**Settings List:**
- Items with icons and right arrow:
  - 🔔 Notifications
  - 🔒 Privacy & Safety
  - 🎨 Appearance
  - ✅ Verification
  - 🛡️ Community Guidelines
  - ℹ️ About

**Sign Out button** (outlined, neon pink)

**Footer:**
- "Made with 💜 for the community"
- Version number

---

## 🎭 Tab Bar (Bottom Navigation)

**Layout:**
- Black background with top border
- 4 tabs evenly spaced:

1. **Feed** (🏠)
   - Label: "Feed"
   - Active: Neon pink
   - Inactive: Gray

2. **Search** (🔍)
   - Label: "Search"
   - Active: Neon pink
   - Inactive: Gray

3. **Vibe Check** (🤖)
   - Label: "Vibe Check"
   - Active: Neon pink
   - Inactive: Gray

4. **Profile** (👤)
   - Label: "Profile"
   - Active: Neon pink
   - Inactive: Gray

---

## 🎨 UI Components Library

### Buttons

**Primary Button:**
```
Background: #FF10F0 (Neon Pink)
Text: #FFFFFF (White)
Padding: 16px vertical, 32px horizontal
Border Radius: 12px
Font: Bold, 18px
```

**Secondary Button:**
```
Background: Transparent
Border: 2px #B695F8 (Lavender)
Text: #B695F8
Padding: 16px vertical, 32px horizontal
Border Radius: 12px
Font: Bold, 18px
```

### Cards
```
Background: #1A1A1A (Dark Gray)
Border: 1px #2A2A2A
Border Radius: 12px
Padding: 16px
Margin: 12px between cards
```

### Input Fields
```
Background: #1A1A1A
Text: #FFFFFF
Border: 1px #2A2A2A
Border Radius: 12px
Padding: 16px
Font: 16px
```

### Tags/Pills
```
Background: #2A2A2A
Text: #B695F8 (Lavender)
Padding: 4px 10px
Border Radius: 12px
Font: 12px, Semi-bold
```

---

## 📐 Layout Specifications

### Spacing
- Screen padding: 16-20px
- Element spacing: 12px
- Section spacing: 20-24px
- Card margins: 12px

### Typography Sizes
- Logo/Hero: 60px
- Page Title: 28-32px
- Section Heading: 20px
- Body Large: 18px
- Body: 16px
- Small: 14px
- Caption: 12px

### Borders & Radius
- Cards: 12px radius
- Buttons: 12px radius
- Tags: 12px radius (pill)
- Inputs: 12px radius

---

## 🌈 Accessibility Features

- **High Contrast**: Vibrant neon colors on dark backgrounds
- **Large Touch Targets**: Minimum 44x44px for buttons
- **Clear Typography**: Bold, readable fonts
- **Semantic Colors**: Green (safe), Yellow (caution), Red (warning)
- **Icon Support**: Emojis provide visual context

---

## 📱 Responsive Behavior

- **Vertical Scrolling**: All screens scroll vertically
- **Horizontal Scrolling**: Filter tabs and popular tags
- **Modal Overlays**: For dialogs and confirmations
- **Keyboard Aware**: Inputs adjust when keyboard appears
- **Safe Areas**: Respects device notches and home indicators

---

## ✨ Animation & Transitions

- **Page Transitions**: Smooth slide/fade (200-300ms)
- **Button Press**: Scale to 0.95
- **Loading States**: Subtle pulse or spinner
- **Card Appearance**: Fade in from bottom
- **Tab Switch**: Cross-fade content

---

This design creates a cohesive, modern experience that feels both safe and vibrant - perfect for the LGBTQ+ community to connect and share experiences!
