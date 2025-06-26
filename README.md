# Stella Open Prompt

A world-class web interface for browsing and reading curated AI prompts, built with Stella's design system for consistency and excellence.

## 🚀 Features

### Prompt Browsing
- **Grid/List Views**: Toggle between grid and list layouts
- **Advanced Search**: Real-time search across titles, descriptions, and tags
- **Category Filtering**: Filter by coding, writing, analysis, or creative prompts
- **Quick Copy**: One-click copying with instant feedback
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Prompt Reader
- **Markdown Rendering**: Full markdown support with syntax highlighting
- **Auto-Generated TOC**: Navigate long prompts with sidebar table of contents
- **Reading Progress**: Visual progress indicator
- **Multiple Actions**: Copy, download, share, and print functionality
- **Search Within Content**: Find specific content within prompts
- **Keyboard Navigation**: Full keyboard accessibility

### Design & UX
- **Stella Design System**: Consistent with Stella's brand and visual identity
- **Dark/Light Mode Ready**: Built with CSS custom properties for theming
- **Accessibility First**: WCAG 2.1 AA compliant with screen reader support
- **Performance Optimized**: Fast loading with progressive enhancement
- **Print Friendly**: Optimized layouts for printing prompts

## 📁 Project Structure

```
Stella_Open_Prompt/
├── index.html              # Landing page
├── browse.html             # Prompt browsing interface
├── prompt-reader.html      # Individual prompt reader
├── css/
│   ├── shared.css         # Stella design system & common styles
│   ├── browse.css         # Browse page specific styles
│   ├── prompt-reader.css  # Reader page specific styles
│   └── utilities.css      # Loading, error, and utility styles
├── js/
│   ├── browse.js          # Browse page functionality
│   └── prompt-reader.js   # Reader page functionality
├── prompts/
│   ├── prompts-data.json  # Main prompt database
│   ├── coding/            # Coding & development prompts
│   ├── writing/           # Writing & content prompts
│   ├── analysis/          # Analysis & research prompts
│   └── creative/          # Creative & innovation prompts
└── assets/
    └── icons/             # Icon assets
```

## 🎨 Design System

Built with Stella's design principles:

- **Typography**: Inter font family with carefully crafted scales
- **Colors**: Stella's brand colors with semantic color tokens
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable button, card, and form components
- **Responsive**: Mobile-first approach with fluid breakpoints

## 🛠️ Development

### Prerequisites
- Modern web browser with ES6+ support
- Local development server (Python, Node.js, or similar)

### Quick Start

1. **Clone or download** the project files
2. **Start a local server**:
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Open** http://localhost:8000 in your browser

### Adding New Prompts

1. **Create markdown file** in appropriate category folder:
   ```
   prompts/coding/my-new-prompt.md
   ```

2. **Update metadata.json** in the category folder:
   ```json
   {
     "id": "my-new-prompt",
     "title": "My New Prompt",
     "description": "Brief description of the prompt",
     "file": "my-new-prompt.md",
     "tags": ["tag1", "tag2"],
     "difficulty": "Intermediate",
     "category": "coding",
     "lastUpdated": "2024-01-16",
     "featured": false
   }
   ```

3. **Update main database** in `prompts/prompts-data.json`:
   - Add to `allPrompts` array
   - Update `stats.totalPrompts` count

## 📱 Browser Support

- **Chrome**: 80+
- **Firefox**: 78+
- **Safari**: 14+
- **Edge**: 80+

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Responsive Text**: Supports browser zoom up to 200%

## 🚀 Deployment

Deploy to any static hosting service:
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Direct from repository
- **AWS S3**: Static website hosting

---

**Built with ❤️ for the Stella AI community**