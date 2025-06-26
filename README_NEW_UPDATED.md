<div align="center">

![Stella Icon](Refer/Images/Stella_Icon.png)

# 🌟 Stella Prompt Hub

**A Modern Web Interface for Curated AI Prompts**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue.svg)](https://hyoni1129.github.io/Stella-Prompt-Hub/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![PWA](https://img.shields.io/badge/PWA-Ready-purple.svg)](https://web.dev/progressive-web-apps/)

[**🚀 Live Demo**](https://hyoni1129.github.io/Stella-Prompt-Hub/) | [**📖 Documentation**](docs/) | [**🤝 Contributing**](CONTRIBUTING.md)

</div>

---

## 🎯 About The Project

Stella Prompt Hub is a **fully automated static web interface** for browsing and reading curated AI prompts. Built with modern web technologies and automatic GitHub integration, it transforms any collection of Markdown files into a beautiful, searchable prompt library.

### 🌟 Why Stella Prompt Hub?

- **🚀 Zero Configuration**: Drop Markdown files in `prompts/` folder and they automatically appear
- **🔍 Auto-Discovery**: GitHub API integration automatically finds and indexes prompts  
- **📱 Modern Design**: Responsive, accessible interface with beautiful typography
- **⚡ Lightning Fast**: Pure static site - no server required
- **🛠️ Developer Friendly**: Easy to customize, extend, and deploy

---

## ✨ Key Features

### 🔄 **Fully Automated**
- **Auto-discovery** of Markdown prompts via GitHub API
- **Automatic indexing** with metadata extraction
- **Smart categorization** based on content analysis
- **Zero-config deployment** on GitHub Pages

### 🎨 **Modern Interface**  
- **Responsive design** optimized for all devices
- **Advanced search** with real-time filtering
- **Category-based organization** with visual indicators
- **Smooth animations** and intuitive navigation

### ♿ **Accessibility First**
- **WCAG 2.1 AA compliant** with full keyboard navigation
- **Screen reader optimized** with proper ARIA labels
- **High contrast** and readable typography
- **Progressive enhancement** for all users

### 🔧 **Developer Experience**
- **Pure HTML/CSS/JavaScript** - no build tools required
- **GitHub Actions** for automated deployment
- **Comprehensive documentation** and examples
- **Easy theming** and customization options

---

## 🚀 Quick Start

### Option 1: Use as Template (Recommended)

1. **Click "Use this template"** on GitHub
2. **Enable GitHub Pages** in repository settings
3. **Add your prompts** to the `prompts/` directory
4. **Visit your site** at `https://yourusername.github.io/Stella-Prompt-Hub`

### Option 2: Fork and Clone

```bash
# Clone the repository
git clone https://github.com/Hyoni1129/Stella-Prompt-Hub.git
cd Stella-Prompt-Hub

# Start local development server
python3 -m http.server 8000
# OR
npx serve .

# Open in browser
open http://localhost:8000
```

---

## 📝 Adding New Prompts

Adding prompts is incredibly simple - just create Markdown files!

### Step 1: Create a Markdown File

```bash
# Create a new prompt file
touch prompts/my-awesome-prompt.md
```

### Step 2: Add Content

```markdown
# My Awesome Prompt

## Overview
Brief description of what this prompt does.

## Instructions
Your detailed prompt content here...

## Examples
- Example 1: How to use this prompt
- Example 2: Another use case

## Tags
- productivity
- writing
- analysis
```

### Step 3: Push to GitHub

```bash
git add prompts/my-awesome-prompt.md
git commit -m "Add my awesome prompt"
git push
```

**That's it!** Your prompt will automatically appear on the website within minutes.

### 📋 Supported Metadata

The system automatically extracts:

- **Title**: From the first H1 heading
- **Description**: From the first paragraph  
- **Category**: Inferred from content keywords
- **Tags**: From a "Tags" section (if present)
- **Word Count**: Automatically calculated
- **Reading Time**: Estimated based on content length

---

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Fork this repository**
2. **Go to Settings** → **Pages**
3. **Select source**: Deploy from branch `main`
4. **Your site will be live** at `https://yourusername.github.io/Stella-Prompt-Hub`

### Other Static Hosts

Works with any static hosting service:
- **Netlify**: Connect GitHub repo for automatic deployments
- **Vercel**: Import project for instant deployment  
- **Surge.sh**: Simple command-line deployment
- **Firebase Hosting**: Google's hosting platform

---

## 📁 Project Structure

```
Stella-Prompt-Hub/
├── 📁 prompts/                 # 👈 Add your .md files here
│   ├── code-review-assistant.md
│   ├── creative-story-generator.md
│   └── ...
├── 📄 browse.html              # Main interface
├── 📄 prompt-reader.html       # Individual prompt viewer
├── 📄 index.html               # Landing page (redirects to browse.html)
├── 📁 src/
│   ├── 📁 css/                 # Stylesheets
│   ├── 📁 js/                  # JavaScript modules
│   └── 📁 data/                # Generated index files
├── 📁 .github/
│   └── 📁 workflows/           # CI/CD automation
├── 📄 manifest.json            # PWA configuration
├── 📄 _headers                 # Security headers
└── 📄 README.md               # This file
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🎯 **Add Prompts** (Most Wanted)
- High-quality AI prompts for any category
- Well-documented with examples
- Follow our [prompt guidelines](docs/ADD_NEW_PROMPTS.md)

### 🔧 **Improve Code**
- Bug fixes and performance improvements
- New features and UI enhancements
- Accessibility improvements

### 📚 **Documentation**
- Improve guides and tutorials
- Add examples and use cases
- Create video tutorials

**👉 See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines**

---

## 📊 Features & Capabilities

| Feature | Status | Description |
|---------|--------|-------------|
| ✅ Auto-Discovery | **Complete** | Automatic prompt detection via GitHub API |
| ✅ Responsive Design | **Complete** | Mobile-first, works on all devices |
| ✅ Search & Filter | **Complete** | Real-time search with category filtering |
| ✅ Accessibility | **Complete** | WCAG 2.1 AA compliant |
| ✅ PWA Support | **Complete** | Install as app, offline capable |
| ✅ GitHub Actions | **Complete** | Automated deployment and indexing |
| ✅ Security Headers | **Complete** | CSP, HTTPS, security best practices |
| 🔄 Dark Mode | **Planned** | Theme switching capability |
| 🔄 Analytics | **Planned** | Usage tracking and insights |

---

## 🛡️ Security & Privacy

- **🔒 Security Headers**: CSP, HSTS, X-Frame-Options protection
- **🚫 No Tracking**: Privacy-first design with no analytics by default
- **🔐 Safe Dependencies**: Regular security audits with `npm audit`
- **⚡ Static Only**: No server-side code reduces attack surface

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">

**JeongHan Lee**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hyoni1129)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/jeonghan-lee)

*Passionate about AI, web development, and open source projects*

</div>

---

## 🌟 Show Your Support

If this project helped you, please consider:

- ⭐ **Star this repository**
- 🍴 **Fork and contribute**  
- 📢 **Share with others**
- 🐛 **Report issues**

---

## 📞 Contact & Support

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/Hyoni1129/Stella-Prompt-Hub/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/Hyoni1129/Stella-Prompt-Hub/discussions)
- **📧 Direct Contact**: [Create an Issue](https://github.com/Hyoni1129/Stella-Prompt-Hub/issues/new)

---

<div align="center">

**Made with ❤️ by [JeongHan Lee](https://github.com/Hyoni1129)**

*Stella Prompt Hub - Making AI prompts accessible to everyone*

![Stella Text Icon](Refer/Images/Stella_Text_icon.png)

</div>
