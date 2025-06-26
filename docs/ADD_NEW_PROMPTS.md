# How to Add New Prompts

Adding new prompts to Stella Open Prompt is incredibly simple! No configuration files, no JSON metadata, no complex setup required.

## Quick Start

1. **Create a Markdown file** in the `prompts/` directory
2. **Follow the naming convention**: `your-prompt-name.md` (use kebab-case)
3. **Add to the JavaScript list** (one line edit)
4. **Deploy** - your prompt appears automatically!

## Step-by-Step Guide

### 1. Create Your Markdown File

Create a new file in `/prompts/` with a descriptive name:

```
prompts/
├── your-new-prompt.md  ← Add your file here
├── technical-writing-assistant.md
├── creative-story-generator.md
└── ...
```

### 2. Structure Your Prompt

Use this template for consistent formatting:

```markdown
# Your Prompt Title

## Overview

A brief description of what this prompt does and how it helps users. This will be automatically extracted for the browse page.

## Core Capabilities

### Section 1
- Feature 1
- Feature 2
- Feature 3

### Section 2
- Feature A
- Feature B

## Guidelines

### Getting Started
Instructions for users...

### Best Practices
Tips and recommendations...

## Examples

Provide practical examples here...

## Advanced Techniques

More detailed guidance...
```

### 3. Update the JavaScript List

Edit `/src/js/browse.js` and add your filename to the `availablePrompts` array:

```javascript
this.availablePrompts = [
    'technical-writing-assistant.md',
    'creative-story-generator.md',
    'code-review-assistant.md',
    'data-analysis-expert.md',
    'meeting-facilitator.md',
    'your-new-prompt.md'  // ← Add this line
];
```

### 4. That's It!

Your prompt will automatically:
- ✅ Appear in the browse interface
- ✅ Be categorized based on content
- ✅ Have reading time calculated
- ✅ Be searchable and filterable
- ✅ Generate a table of contents
- ✅ Support full markdown rendering

## Automatic Features

The system automatically extracts:

- **Title**: From the first `# Heading`
- **Description**: From the `## Overview` section
- **Category**: Inferred from content keywords
- **Reading Time**: Calculated from word count
- **Tags**: Generated from content analysis

## Content Guidelines

### File Naming
- Use kebab-case: `prompt-name.md`
- Be descriptive: `email-writing-assistant.md`
- Avoid spaces and special characters

### Structure Best Practices
- Start with a clear `# Title`
- Include an `## Overview` section for the description
- Use consistent heading hierarchy
- Include practical examples
- Keep content scannable with lists and subheadings

### Category Keywords
To ensure proper categorization, include relevant keywords:

- **Writing**: writing, story, content, documentation
- **Development**: code, programming, javascript, python, software
- **Analysis**: data, analysis, statistics, insights, research
- **Creative**: creative, brainstorm, innovation, design
- **Productivity**: meeting, facilitation, planning, organization

## Deployment

### GitHub Pages
1. Commit your changes
2. Push to GitHub
3. Your prompt appears automatically on the live site

### Local Testing
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Tips for Great Prompts

1. **Clear Structure**: Use consistent headings and sections
2. **Practical Examples**: Show real usage scenarios
3. **Step-by-Step**: Break complex tasks into steps
4. **Scannable**: Use bullets, lists, and short paragraphs
5. **Complete**: Cover edge cases and variations

## Example Prompt Structure

Here's a well-structured prompt example:

```markdown
# Email Writing Assistant

## Overview

A professional email writing assistant that helps you craft clear, effective, and appropriately toned emails for business and personal communication.

## Core Capabilities

### Email Types
- Business correspondence
- Customer support responses
- Follow-up emails
- Meeting requests

### Tone Adjustment
- Professional and formal
- Friendly but professional
- Casual and conversational
- Urgent but polite

## Guidelines

### Getting Started
1. Identify your email purpose
2. Choose the appropriate tone
3. Consider your audience
4. Structure your message clearly

### Email Structure
- **Subject Line**: Clear and specific
- **Greeting**: Appropriate for relationship
- **Body**: Organized with clear purpose
- **Closing**: Professional and actionable
- **Signature**: Complete contact information

## Examples

### Business Follow-up
[Include actual email examples here]

### Meeting Request
[Include actual email examples here]
```

This creates a comprehensive, searchable, and useful prompt that will be automatically processed by the system!
