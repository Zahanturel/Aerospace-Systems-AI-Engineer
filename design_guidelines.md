# Design Guidelines: Interactive Career Roadmap Platform

## Design Approach
**Hybrid Reference System**: Combine Duolingo's gamification patterns + Khan Academy's learning progression + Linear's modern aesthetic + aerospace-tech visual language. This is an interactive learning platform requiring rich, engaging UI elements that motivate youth and clearly demonstrate career progression from zero knowledge to job-ready.

## Core Design Principles
1. **Progressive Mastery Visualization**: Every section should show clear advancement stages
2. **Multi-Sensory Engagement**: Support audio, visual, and kinesthetic learning modes simultaneously
3. **Immediate Feedback Loops**: Instant validation for quizzes, puzzles, and interactions
4. **Achievement-Driven**: Visible progress indicators, unlockable content, milestone celebrations

---

## Typography System

**Primary Font**: Inter or Manrope (Google Fonts) - clean, modern sans-serif
**Accent Font**: Space Grotesk - for tech/aerospace themed headings

### Hierarchy:
- Hero Title: 4xl/5xl, bold (font-bold)
- Section Headers: 3xl/4xl, semibold
- Module Titles: 2xl, semibold
- Body Text: base/lg, regular (font-normal)
- Labels/Metadata: sm, medium
- Interactive Elements: base, semibold

---

## Layout System

**Spacing Units**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6
- Module spacing: space-y-8

**Container Strategy**:
- Full-width sections with max-w-7xl inner containers
- Roadmap content: max-w-4xl for focused reading
- Interactive modules: max-w-6xl for breathing room

---

## Component Library

### 1. Hero Section (No Large Image)
- Animated aerospace particles/grid background (CSS/Canvas)
- Bold headline with animated typing effect
- Salary progression cards in horizontal scroll/grid
- CTA with pulse animation
- Stats badges (growth %, impact metrics) with count-up animations

### 2. Interactive Roadmap Visualization
**Structure**: Vertical timeline with branching paths
- **Stage Cards** (3 phases as shown):
  - Numbered badges with completion checkmarks
  - Duration pill badges
  - Expandable skill lists with icons
  - Progress bar showing module completion (0-100%)
  - "Start Learning" CTAs that unlock sequentially
  - Key projects as collapsible mini-cards
  
- **Job-Ready Milestone Marker**: Large visual checkpoint between Stage 2-3 with "You're Interview Ready" badge, portfolio checklist, and suggested job titles

### 3. Free Trial Mini-Course Module
**Embedded Interactive Section** (5-7 lessons):
- **Lesson Cards**: Card-based UI with:
  - Lesson number and estimated time (5-10 min)
  - Audio narration toggle button
  - Progress indicator ring
  - Lock/unlock states
  
- **Interactive Content Types**:
  - **Flashcards**: Flip animation on click, drag-to-next gesture
  - **Puzzles**: Drag-and-drop matching, connect-the-dots for concepts
  - **Quick Quizzes**: Multiple choice with instant green/red feedback, explanation popups
  - **Code Snippets**: Syntax-highlighted blocks with "Run" buttons
  - **Visual Explainers**: Animated SVG diagrams explaining aerospace concepts
  
- **Audio System**: Floating audio player with waveform visualization, playback controls, speed adjustment

### 4. Gamification Elements
- **Progress Dashboard**: Circular progress rings, XP counter, level badges
- **Achievement Badges**: Unlockable icons displayed in trophy case
- **Skill Mastery Bars**: Per-topic completion with color gradients
- **Streak Counter**: Daily learning streaks with flame icons
- **Leaderboard Preview**: Anonymous ranking showing relative position

### 5. Knowledge Check System
- Inline mini-quizzes every 2-3 scrolls
- Instant feedback with animated checkmarks/crosses
- Hint system with graduated reveals
- Retry mechanics with encouraging messages

### 6. Day-in-Life Section
**Interactive Timeline**:
- Hourly schedule with expandable task cards
- Animated transitions between time blocks
- Tool/software icons for each activity
- "Try This Task" mini-simulations

### 7. AI Impact Comparison
**Split-Screen Interactive Visualization**:
- Side-by-side cards with animated stat comparisons
- Hover to see detailed breakdowns
- Toggle between different metrics
- Animated bar charts or radial progress indicators

### 8. Navigation & Controls
- Sticky progress bar at top showing overall completion
- Floating action button for "Resume Learning"
- Breadcrumb navigation with completion dots
- Quick-jump sidebar menu for desktop

---

## Interaction Patterns

**Scroll-Triggered Animations**:
- Fade-in and slide-up for content blocks (stagger delays)
- Progress bars fill on viewport entry
- Counter animations for statistics

**Hover States**:
- Cards: Subtle lift (transform: translateY(-4px)) + shadow increase
- Buttons: Scale slightly (scale-105)
- Interactive elements: Cursor changes to pointer with subtle glow

**Loading States**:
- Skeleton screens for quiz content
- Shimmer effect on loading cards
- Smooth transitions when content populates

**Mobile Gestures**:
- Swipe between lesson cards
- Pull-to-refresh quiz questions
- Tap-to-expand roadmap stages

---

## Accessibility

- Keyboard navigation for all interactive elements
- Focus indicators with 2px outlines
- ARIA labels for all icons and interactive components
- Screen reader announcements for progress updates
- Captions/transcripts for audio content
- Minimum touch target size: 44x44px
- Color contrast ratio minimum 4.5:1 for text

---

## Images

**No Large Hero Image** - Use animated background instead

**Supporting Images Throughout**:
1. **Module Icons**: Aerospace-themed vector icons (planes, satellites, drones) for each learning stage
2. **Concept Illustrations**: Technical diagrams, flowcharts, system architectures embedded in lessons
3. **Achievement Badges**: Custom SVG badges for milestones
4. **Interactive Puzzle Pieces**: Visual elements for drag-drop activities
5. **Simulated Dashboard Previews**: Screenshots of MATLAB, Python IDEs in project cards

Place images strategically within interactive cards, not as backgrounds. Use illustrations to support learning concepts, not for decoration.

---

## Performance Considerations

- Lazy load lesson content below fold
- Preload next lesson on current completion
- Optimize animations with CSS transforms (GPU-accelerated)
- Use SVG sprites for repeated icons
- Implement virtual scrolling for long roadmap lists