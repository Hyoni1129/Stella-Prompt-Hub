t# Stella Open Prompt - Project Outline

## Project Overview

**Stella Open Prompt** is a curated collection of high-quality prompts designed to enhance AI interactions and productivity. Following Stella's core values of Simplicity, Utility, Ad-Free experience, and Friendliness, this project provides users with an elegant browsing and reading experience for discovering and using carefully crafted prompts.

## Core Features & User Experience

### 1. Prompt Browsing Page (`browse.html`)

#### **Purpose & Functionality**
- Display a grid/list view of all available prompts with preview cards
- Allow users to quickly scan and discover prompts that match their needs
- Provide filtering and search capabilities for efficient prompt discovery
- Maintain Stella's clean, uncluttered aesthetic while showcasing content effectively

#### **Layout Structure**

**Header Section:**
- Stella logo and navigation (consistent with main site)
- Page title: "Open Prompt Collection"
- Subtitle: "Curated prompts to enhance your AI interactions"
- Search bar with live filtering capabilities
- Category filter buttons (Writing, Development, Analysis, Creative, etc.)

**Main Content Area:**
```
[Search Bar & Filters]
┌─────────────────────────────────────────────────┐
│  🔍 Search prompts...    [All] [Writing] [Dev]  │
└─────────────────────────────────────────────────┘

[Prompt Cards Grid - 3 columns on desktop, responsive]
┌───────────┐ ┌───────────┐ ┌───────────┐
│  Card 1   │ │  Card 2   │ │  Card 3   │
│           │ │           │ │           │
└───────────┘ └───────────┘ └───────────┘
┌───────────┐ ┌───────────┐ ┌───────────┐
│  Card 4   │ │  Card 5   │ │  Card 6   │
│           │ │           │ │           │
└───────────┘ └───────────┘ └───────────┘
```

**Prompt Preview Cards:**
Each card contains:
- **Title**: Clear, descriptive prompt name
- **Category Badge**: Color-coded category (e.g., "Writing", "Development")
- **Description**: 2-3 line summary of what the prompt does
- **Preview Text**: First 100-150 characters of the actual prompt
- **Metadata**: 
  - Word count
  - Estimated reading time
  - Difficulty level (Beginner/Intermediate/Advanced)
- **Action Buttons**: "Read More" and "Quick Copy" icons
- **Visual Elements**: Subtle hover animations, Stella-blue accents

#### **Interactive Features**
- **Hover Effects**: Cards lift slightly with enhanced shadow
- **Quick Copy**: Clipboard icon for instant prompt copying
- **Search**: Real-time filtering as user types
- **Category Filtering**: Toggle buttons for different prompt types
- **Responsive Design**: Adapts from 3-column to 2-column to 1-column layout

### 2. Prompt Reader Page (`prompt-reader.html`)

#### **Purpose & Functionality**
- Provide a distraction-free reading experience for full prompt content
- Enable easy copying and downloading of prompt files
- Offer navigation aids for longer prompts
- Maintain focus on content while providing useful tools

#### **Layout Structure**

**Two-Panel Layout:**
```
┌─────────────────────────────────────────────────┐
│ Header (Stella Nav + Prompt Title)              │
├───────────┬─────────────────────────────────────┤
│           │                                     │
│ Sidebar   │        Main Content Area            │
│ (250px)   │                                     │
│           │                                     │
│ - Title   │   # Prompt Title                    │
│ - TOC     │   ## Section 1                      │
│ - Actions │   Content here...                   │
│           │                                     │
│           │   ## Section 2                      │
│           │   More content...                   │
│           │                                     │
└───────────┴─────────────────────────────────────┘
```

#### **Sidebar Components**

**Document Info Panel:**
- **Prompt Title**: Prominently displayed
- **Category Badge**: Visual category indicator
- **Metadata**: Word count, reading time, difficulty
- **Last Updated**: Date information

**Table of Contents (TOC):**
- **Auto-generated** from Markdown headers (H1, H2, H3)
- **Clickable links** that smoothly scroll to sections
- **Current section highlighting** based on scroll position
- **Nested structure** showing document hierarchy
- **Collapsible sections** for longer documents

**Action Panel:**
- **Copy Full Prompt**: Copy entire content to clipboard
- **Download Markdown**: Download original .md file
- **Share Link**: Copy shareable URL
- **Print View**: Optimized for printing
- **Back to Browse**: Return to main browsing page

#### **Main Content Area**

**Markdown Rendering:**
- **Clean typography** using Stella's font system
- **Syntax highlighting** for code blocks
- **Proper spacing** and hierarchy for headers
- **Responsive images** and media content
- **Interactive elements** like checkboxes in task lists

**Reading Experience Features:**
- **Reading progress indicator** at top of content
- **Estimated reading time** display
- **Section navigation** with smooth scrolling
- **Copy buttons** for individual code blocks or sections
- **Print-friendly** styling when needed

### 3. Technical Implementation Details

#### **File Structure**
```
/Stella_Open_Prompt/
├── browse.html                 # Main browsing page
├── prompt-reader.html          # Prompt reading page
├── css/
│   ├── browse.css             # Browsing page styles
│   ├── prompt-reader.css      # Reader page styles
│   └── shared.css             # Common Stella styles
├── js/
│   ├── browse.js              # Browsing functionality
│   ├── prompt-reader.js       # Reader functionality
│   └── markdown-parser.js     # Markdown processing
├── prompts/
│   ├── writing/               # Category folders
│   ├── development/
│   ├── analysis/
│   └── creative/
└── assets/
    ├── icons/                 # UI icons
    └── images/                # Visual assets
```

#### **Data Structure**

**Prompt Metadata (JSON):**
```json
{
  "id": "creative-writing-assistant",
  "title": "Creative Writing Assistant",
  "category": "writing",
  "description": "A comprehensive prompt for generating creative stories with detailed character development.",
  "tags": ["creative", "storytelling", "character", "plot"],
  "difficulty": "intermediate",
  "wordCount": 450,
  "readingTime": "2 min",
  "lastUpdated": "2025-06-26",
  "filePath": "prompts/writing/creative-writing-assistant.md"
}
```

#### **Responsive Design Breakpoints**
- **Desktop** (1200px+): Full layout with sidebar
- **Tablet** (768px-1199px): Collapsible sidebar, adapted grid
- **Mobile** (767px and below): Single column, drawer-style navigation

### 4. Design System Integration

#### **Color Palette** (Following Stella Guidelines)
- **Primary**: Stella Blue (#36A1D5) for CTAs and accents
- **Secondary**: Stella Yellow (#FBBF24) for category badges
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green for copy confirmations
- **Warning**: Orange for important notices

#### **Typography** (Stella Standards)
- **Headers**: Inter/Pretendard, Bold (H1: 2.5rem, H2: 2rem, H3: 1.5rem)
- **Body**: Inter/Pretendard, Regular (1rem, line-height 1.7)
- **Code**: JetBrains Mono or similar monospace
- **UI Elements**: Medium weight for buttons and labels

#### **Component Library**
- **Cards**: Consistent with Stella's elevated card style
- **Buttons**: Primary, secondary, and icon variants
- **Badges**: Category and status indicators
- **Navigation**: Breadcrumbs and TOC styling
- **Modals**: For confirmation dialogs and settings

### 5. User Experience Flow

#### **Discovery to Usage Journey**
1. **Landing**: User arrives at browse page
2. **Exploration**: Browse categories or search for specific needs
3. **Preview**: Quick preview in card format
4. **Selection**: Click to open full prompt reader
5. **Consumption**: Read full prompt with navigation aids
6. **Action**: Copy prompt or download file
7. **Return**: Easy navigation back to browsing

#### **Key Interactions**
- **Seamless transitions** between browsing and reading
- **Instant feedback** for copy operations
- **Progressive disclosure** of information
- **Keyboard navigation** support
- **Mobile-optimized** touch interactions

### 6. Content Management

#### **Markdown File Standards**
- **Frontmatter**: YAML metadata at file beginning
- **Structure**: Consistent heading hierarchy
- **Formatting**: Code blocks, lists, emphasis properly marked
- **Length**: Optimal 200-800 words per prompt

#### **Category Organization**
- **Writing**: Creative writing, copywriting, technical writing
- **Development**: Code generation, debugging, documentation
- **Analysis**: Data analysis, research, problem-solving
- **Creative**: Art direction, brainstorming, ideation
- **Business**: Strategy, planning, communication
- **Education**: Learning, teaching, explanation

### 7. Performance & Accessibility

#### **Performance Optimization**
- **Lazy loading** for prompt cards
- **Efficient search** with debounced input
- **Cached markdown** parsing results
- **Optimized images** and assets
- **Minimal JavaScript** bundle size

#### **Accessibility Features**
- **Keyboard navigation** throughout
- **Screen reader** compatibility
- **High contrast** mode support
- **Focus indicators** clearly visible
- **Alt text** for all images
- **ARIA labels** for interactive elements

### 8. Future Enhancements

#### **Phase 2 Features**
- **User accounts** for favorite prompts
- **Rating system** for prompt quality
- **Community contributions** workflow
- **Prompt variations** and templates
- **Export to popular tools** (Notion, Obsidian, etc.)

#### **Advanced Features**
- **AI-powered** prompt suggestions
- **Usage analytics** for popular prompts
- **Collaborative editing** for prompt improvements
- **Integration APIs** for external tools
- **Mobile app** companion

## Technical Requirements

### **Browser Support**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with modern JavaScript support

### **Dependencies**
- **Marked.js**: Markdown parsing
- **Prism.js**: Syntax highlighting
- **Intersection Observer**: Scroll tracking
- **Clipboard API**: Copy functionality

### **Performance Targets**
- **Page load**: < 2 seconds on 3G
- **Search response**: < 200ms
- **Smooth scrolling**: 60fps animations
- **Bundle size**: < 100KB compressed

## Success Metrics

### **User Engagement**
- **Time on page**: Average reading session length
- **Prompt usage**: Copy/download rates
- **Return visits**: User retention
- **Search success**: Query to result click-through

### **Content Quality**
- **Prompt effectiveness**: User feedback and ratings
- **Discovery rate**: How easily users find relevant prompts
- **Completion rate**: Users who finish reading prompts

This comprehensive outline provides the foundation for building a world-class prompt browsing and reading experience that exemplifies Stella's values while serving users' practical needs efficiently and elegantly.
