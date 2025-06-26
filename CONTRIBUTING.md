# Contributing to Stella Open Prompt

Thank you for your interest in contributing! Stella Open Prompt is designed to be simple and community-driven. Here's how you can help make it even better.

## Quick Start for Contributors

The beauty of this project is its simplicity - no complex setup required!

### Adding New Prompts (Most Common)

1. **Fork** this repository
2. **Create** a new `.md` file in the `prompts/` directory
3. **That's it!** Your prompt will automatically appear on the website

👉 **Detailed guide**: [How to Add New Prompts](docs/ADD_NEW_PROMPTS.md)

**✨ No manual configuration needed!** The system automatically discovers your Markdown files using GitHub API.

### Contributing Code

1. **Fork** and clone the repository
2. **Make** your changes
3. **Test** locally with any static server
4. **Submit** a pull request

## Types of Contributions

### 🎯 Prompt Contributions (Most Wanted!)

We're always looking for high-quality AI prompts in these categories:

- **Writing & Content**: Technical writing, creative writing, copywriting
- **Development**: Code review, debugging, architecture, documentation
- **Analysis**: Data analysis, research, reporting, insights
- **Creative**: Brainstorming, design thinking, innovation
- **Productivity**: Meeting facilitation, planning, organization

### 🔧 Code Contributions

- Bug fixes and improvements
- New features for the interface
- Performance optimizations
- Accessibility enhancements
- Mobile responsiveness improvements

### 📚 Documentation

- Improving README and guides
- Adding examples and tutorials
- Creating video guides or tutorials

## Contribution Guidelines

### For Prompts

**Quality Standards:**
- ✅ Clear, actionable instructions
- ✅ Practical examples included
- ✅ Well-structured with headings
- ✅ Appropriate length and depth
- ✅ Unique value (not duplicating existing prompts)

**Content Structure:**
```markdown
# Clear, Descriptive Title

## Overview
Brief description of what this prompt does and how it helps users.

## Main Content
Your detailed prompt instructions...

## Examples
Practical usage examples...

## Tags (Optional)
- productivity
- writing
- collaboration
- strategy
```

**Auto-Discovery Features:**
- ✅ **Title**: Extracted from first H1 heading
- ✅ **Description**: From first paragraph
- ✅ **Category**: Auto-inferred from content
- ✅ **Tags**: Manual (from ## Tags section) or auto-detected
- ✅ **Reading Time**: Auto-calculated

**File Naming:**
- Use kebab-case: `prompt-name.md`
- Be descriptive: `technical-documentation-writer.md`
- Avoid spaces and special characters

### For Code

**Technical Standards:**
- ✅ Modern JavaScript (ES6+)
- ✅ Responsive design (mobile-first)
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Cross-browser compatibility
- ✅ No external dependencies unless necessary

**Code Style:**
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Comment complex logic
- Test on multiple devices/browsers

## Development Setup

### Prerequisites
- Any modern web browser
- Text editor or IDE
- Git for version control

### Local Development
```bash
# Clone your fork
git clone https://github.com/yourusername/Stella-Prompt-Hub.git
cd Stella-Prompt-Hub

# Start a local server (choose one)
python3 -m http.server 8000
# OR
npx serve .
# OR
php -S localhost:8000

# Open in browser
open http://localhost:8000
```

### Making Changes

1. **Create a branch**: `git checkout -b feature/your-feature-name`
2. **Make changes**: Edit files as needed
3. **Test locally**: Ensure everything works
4. **Commit**: `git commit -m "Clear description of changes"`
5. **Push**: `git push origin feature/your-feature-name`
6. **Pull Request**: Create PR with description

## Pull Request Process

### Before Submitting
- [ ] Test your changes locally
- [ ] Follow the style guidelines
- [ ] Update documentation if needed
- [ ] Check that all links work
- [ ] Ensure responsive design on mobile

### PR Template

When creating a pull request, please include:

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] New prompt added
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Style/design improvement

## For New Prompts
- [ ] Added to prompts/ directory
- [ ] Added to availablePrompts list in browse.js
- [ ] Follows content structure guidelines
- [ ] Includes practical examples
- [ ] Unique and valuable content

## Testing
- [ ] Tested locally
- [ ] Works on mobile devices
- [ ] All links functional
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots to help explain your changes
```

### Review Process

1. **Automatic checks**: Basic validation
2. **Community review**: Other contributors may provide feedback
3. **Maintainer review**: Final review by project maintainers
4. **Merge**: Once approved, changes are merged

## Community Guidelines

### Communication
- **Be respectful** and constructive in all interactions
- **Ask questions** if anything is unclear
- **Provide context** when reporting issues or suggesting changes
- **Celebrate others'** contributions and achievements

### Prompt Content Guidelines
- **Family-friendly**: Content appropriate for all audiences
- **Practical**: Focus on real-world applications
- **Clear**: Write in clear, accessible language
- **Ethical**: Promote beneficial use of AI
- **Original**: Don't copy existing prompts from other sources

### Attribution
- **Credit sources** when building on existing work
- **Respect licenses** of any referenced material
- **Be transparent** about inspirations and influences

## Getting Help

### Questions?
- **GitHub Discussions**: For general questions and community chat
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Check our guides and README

### New to Git/GitHub?
- [GitHub's Git Tutorial](https://try.github.io/)
- [First Contributions Guide](https://github.com/firstcontributions/first-contributions)
- [How to Fork a Repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

## Recognition

Contributors are recognized in several ways:
- **GitHub Contributors** page automatically tracks contributions
- **Prompt Credits**: Significant prompt contributors get credit in the prompt metadata
- **Community Shoutouts**: Regular highlighting of valuable contributions

## License

By contributing to Stella Open Prompt, you agree that your contributions will be licensed under the project's [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](LICENSE).

---

## Quick Reference

### Adding a New Prompt (2-minute process)

1. **Create file**: `prompts/your-prompt-name.md`
2. **Add content**: Follow the template structure
3. **Done!** Your prompt automatically appears on the website

**🚀 Zero configuration needed!** The GitHub API automatically discovers and indexes your new prompts.

### Project Structure
```
Stella-Prompt-Hub/
├── prompts/                 # 👈 Add your .md files here (auto-discovered!)
├── src/js/browse.js        # 👈 Handles automatic prompt discovery
├── browse.html             # Main interface
├── prompt-reader.html      # Individual prompt viewer
└── docs/                   # Documentation
```

Thank you for contributing to Stella Prompt Hub! 🌟
