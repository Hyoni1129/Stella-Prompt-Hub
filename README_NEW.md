# 🌟 Stella Open Prompt

```
 ██████╗ ████████╗███████╗██╗     ██╗      █████╗ 
██╔════╝ ╚══██╔══╝██╔════╝██║     ██║     ██╔══██╗
╚█████╗     ██║   █████╗  ██║     ██║     ███████║
 ╚═══██╗    ██║   ██╔══╝  ██║     ██║     ██╔══██║
██████╔╝    ██║   ███████╗███████╗███████╗██║  ██║
╚═════╝     ╚═╝   ╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝
    ╔═══════════════════════════════════════════╗
    ║          OPEN PROMPT COLLECTION          ║
    ╚═══════════════════════════════════════════╝
```

[![CC BY-NC-SA 4.0 License](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)]()
[![Static Site](https://img.shields.io/badge/Static-No%20Server%20Required-brightgreen)]()
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-blue)]()
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

> A world-class, **fully static** web interface for browsing and reading curated AI prompts. Built with Stella's design system, requiring **no server** and working perfectly on GitHub Pages. Add new prompts by simply dropping Markdown files into the `prompts/` folder.

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Adding New Prompts](#adding-new-prompts)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About The Project

Stella Open Prompt is a **completely static** web interface for discovering and reading high-quality AI prompts. No servers, no databases, no JSON files required - just beautiful Markdown prompts that are automatically discovered and displayed.

**Why This Approach?**
- 🚀 **Zero Setup**: Works instantly on GitHub Pages or any static hosting
- 📁 **Simple Management**: Add prompts by dropping `.md` files in `/prompts/`
- 🔍 **Auto-Discovery**: JavaScript automatically finds and displays all Markdown files
- 🎨 **Professional Design**: Built with Stella's design system for visual excellence
- ♿ **Accessible**: WCAG 2.1 AA compliant for inclusive use

---

## ✨ Key Features

### 🏠 **Browse Interface**
- **Real-time Search**: Filter prompts by title, description, or content
- **Category Auto-Detection**: Automatically categorizes prompts by content
- **Smart Metadata**: Extracts title, description, and reading time from Markdown
- **Responsive Grid**: Beautiful card layout that works on all devices

### 📖 **Prompt Reader**
- **Rich Markdown Rendering**: Full markdown support with syntax highlighting
- **Auto-Generated TOC**: Navigate long prompts with sidebar table of contents
- **One-Click Actions**: Copy, download, share, and print functionality
- **Reading Progress**: Visual indicator of completion

### 🎨 **Design & UX**
- **Stella Design System**: Consistent typography, colors, and components
- **Mobile-First**: Responsive design that works everywhere
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Fast Loading**: Optimized for performance with minimal dependencies

---

## 🚀 Quick Start

### Option 1: Use GitHub Pages (Recommended)

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Visit your site** at `https://yourusername.github.io/Stella_Open_Prompt`
4. **Add prompts** by uploading `.md` files to the `prompts/` folder

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Stella_Open_Prompt.git
   cd Stella_Open_Prompt
   ```

2. **Serve locally** (any static server works)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 📝 Adding New Prompts

Adding a new prompt is as simple as creating a Markdown file! Here's how:

### 1. Create a Markdown File

Create a new `.md` file in the `prompts/` directory:

```markdown
# Your Prompt Title

## Overview

A brief description of what this prompt does and how it helps users.

## Main Content

Your detailed prompt instructions go here...

### Subheadings

Use standard Markdown formatting:
- Lists
- **Bold text**
- `Code snippets`
- Links and more

## Examples

Provide usage examples to help users understand the prompt.
```

### 2. File Naming Convention

- Use kebab-case: `my-awesome-prompt.md`
- Be descriptive: `technical-writing-assistant.md`
- Avoid spaces and special characters

### 3. Automatic Features

The system automatically:
- **Extracts the title** from the first `#` heading
- **Generates description** from the `## Overview` section
- **Determines category** based on content keywords
- **Calculates reading time** based on word count
- **Creates tags** from content analysis

### 4. Content Guidelines

For best results:
- Start with a clear `# Title`
- Include an `## Overview` section
- Use descriptive headings and subheadings
- Include practical examples
- Keep content well-structured and scannable

---

## 🌐 Deployment

### GitHub Pages (Easiest)

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)`
5. Your site will be available at `https://yourusername.github.io/Stella_Open_Prompt`

### Other Static Hosts

This project works with any static hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Deploy with Firebase CLI
- **Surge.sh**: Use `surge` command

### Custom Domain

To use a custom domain:
1. Add a `CNAME` file to the root with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use the custom domain

---

## 📁 Project Structure

```
Stella_Open_Prompt/
├── index.html              # Redirects to browse.html
├── browse.html             # Main prompt browsing interface
├── prompt-reader.html      # Individual prompt reading page
├── prompts/                # 📁 Your Markdown prompt files go here
│   ├── technical-writing-assistant.md
│   ├── creative-story-generator.md
│   ├── code-review-assistant.md
│   ├── data-analysis-expert.md
│   └── meeting-facilitator.md
├── src/
│   ├── css/                # Stylesheets
│   │   ├── shared.css
│   │   ├── browse.css
│   │   └── prompt-reader.css
│   ├── js/                 # JavaScript functionality
│   │   ├── browse.js       # Prompt discovery and browsing
│   │   └── prompt-reader.js # Markdown rendering and interactions
│   └── assets/             # Images and icons
├── Refer/                  # Stella brand assets
│   └── Images/
├── LICENSE                 # CC BY-NC-SA 4.0 License
└── README.md              # This file
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Contributing Prompts

1. **Fork the repository**
2. **Add your Markdown prompt** to the `prompts/` folder
3. **Follow the content guidelines** above
4. **Submit a pull request** with a clear description

### Contributing Code

1. **Fork and clone** the repository
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Open a pull request**

### Code Guidelines

- Use modern JavaScript (ES6+)
- Follow existing code style and patterns
- Ensure accessibility compliance
- Test on multiple devices and browsers
- Comment complex logic

---

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**.

**You are free to:**
- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**
- **Attribution** — Give appropriate credit
- **NonCommercial** — Not for commercial use
- **ShareAlike** — Distribute contributions under the same license

See the [LICENSE](LICENSE) file for details or visit [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

---

## 🙏 Acknowledgments

- **Stella Design System** for the beautiful, consistent design language
- **GitHub Pages** for free, reliable hosting
- **Prism.js** for syntax highlighting
- **Markdown-it** for markdown parsing
- The **open-source community** for inspiration and best practices

---

## 📧 Contact

- **Project Repository**: [https://github.com/yourusername/Stella_Open_Prompt](https://github.com/yourusername/Stella_Open_Prompt)
- **Issues & Feature Requests**: [GitHub Issues](https://github.com/yourusername/Stella_Open_Prompt/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/Stella_Open_Prompt/discussions)

---

<div align="center">
  <strong>Built with ❤️ by the Stella Team</strong><br>
  <em>Making AI prompts accessible to everyone</em>
</div>
