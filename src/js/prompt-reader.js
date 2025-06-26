/**
 * Stella Prompt Hub - Reader Page JavaScript
 * Handles markdown parsing, TOC generation, scroll tracking, and actions
 */

class PromptReader {
    constructor() {
        this.currentPrompt = null;
        this.tocItems = [];
        this.isLoading = false;
        this.observer = null;

        this.init();
    }

    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.loadPromptFromURL();
    }

    bindEvents() {
        // Copy actions - updated to match HTML structure
        document.getElementById('copy-full-btn')?.addEventListener('click', () => {
            this.copyFullPrompt();
        });

        // Download action
        document.getElementById('download-btn')?.addEventListener('click', () => {
            this.downloadPrompt();
        });

        // Share action
        document.getElementById('share-btn')?.addEventListener('click', () => {
            this.sharePrompt();
        });

        // Print action
        document.getElementById('print-btn')?.addEventListener('click', () => {
            this.printPrompt();
        });

        // TOC navigation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toc-link')) {
                e.preventDefault();
                this.scrollToSection(e.target.getAttribute('href'));
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyNavigation(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.updateLayout();
        });

        // Sidebar toggle for mobile
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-100px 0px -50% 0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveSection(entry.target.id);
                    this.updateReadingProgress(entry.target);
                }
            });
        }, options);
    }

    async loadPromptFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const promptId = urlParams.get('id') || urlParams.get('prompt');

        if (!promptId) {
            this.showError('No prompt specified');
            return;
        }

        this.showLoading(true);

        try {
            // Construct filename from prompt ID
            const filename = promptId.endsWith('.md') ? promptId : `${promptId}.md`;

            // Load markdown content directly
            const contentResponse = await fetch(`prompts/${filename}`);

            if (!contentResponse.ok) {
                throw new Error(`Prompt not found: ${filename}`);
            }

            const markdownContent = await contentResponse.text();

            // Parse basic metadata from the markdown content
            this.currentPrompt = this.parsePromptMetadata(promptId, markdownContent);
            this.renderPrompt();

        } catch (error) {
            console.error('Error loading prompt:', error);
            this.showError('Failed to load prompt. Please check that the prompt file exists.');
        } finally {
            this.showLoading(false);
        }
    }

    parsePromptMetadata(promptId, content) {
        // Extract title from first # heading
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : promptId.replace(/-/g, ' ');

        // Extract description from overview section
        const overviewMatch = content.match(/## Overview\s*\n\n(.+?)(?=\n\n|\n#|$)/s);
        const description = overviewMatch ? overviewMatch[1].trim() : '';

        // Determine category from content
        const category = this.inferCategory(content);

        // Estimate reading time
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        return {
            id: promptId,
            title,
            description,
            category,
            readTime: `${readTime} min`,
            content,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
    }

    inferCategory(content) {
        const contentLower = content.toLowerCase();

        if (contentLower.includes('writing') || contentLower.includes('story')) {
            return 'writing';
        } else if (contentLower.includes('code') || contentLower.includes('programming')) {
            return 'development';
        } else if (contentLower.includes('data') || contentLower.includes('analysis')) {
            return 'analysis';
        } else if (contentLower.includes('creative') || contentLower.includes('brainstorm')) {
            return 'creative';
        } else if (contentLower.includes('meeting') || contentLower.includes('facilitat')) {
            return 'productivity';
        } else {
            return 'general';
        }
    }

    inferDifficulty(content) {
        const wordCount = content.split(/\s+/).length;
        const codeBlocks = (content.match(/```/g) || []).length / 2;
        const headingCount = (content.match(/^#+\s/gm) || []).length;

        // Simple heuristic based on length and complexity
        if (wordCount < 500 || (codeBlocks === 0 && headingCount < 5)) {
            return 'Beginner';
        } else if (wordCount < 1500 || codeBlocks < 3) {
            return 'Intermediate';
        } else {
            return 'Advanced';
        }
    }

    renderPrompt() {
        if (!this.currentPrompt) {
            return;
        }

        // Update page title and meta
        document.title = `${this.currentPrompt.title} - Stella Open Prompt`;
        this.updateBreadcrumbs();
        this.updateMetadata();

        // Parse and render markdown
        const contentContainer = document.getElementById('prompt-content');
        const htmlContent = this.parseMarkdown(this.currentPrompt.content);
        contentContainer.innerHTML = htmlContent;

        // Generate TOC
        this.generateTOC();

        // Setup syntax highlighting
        this.setupSyntaxHighlighting();

        // Setup section observers
        this.observeSections();

        // Update metadata
        this.updateMetadata();
    }

    parseMarkdown(markdown) {
        // Configure marked for our needs
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: true,
            headerPrefix: '',
            highlight: function(code, lang) {
                if (lang && Prism.languages[lang]) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                } else {
                    return code;
                }
            }
        });

        // Custom renderer for code blocks with copy buttons
        const renderer = new marked.Renderer();

        renderer.code = function(code, lang) {
            const language = lang || 'text';
            const escapedCode = this.options.highlight ?
                this.options.highlight(code, language) :
                this.escapeHtml(code);

            return `<div class="code-block">
                <div class="code-header">
                    <span class="code-language">${language}</span>
                    <button class="copy-code-btn" data-code="${this.escapeHtml(code.trim())}">
                        <i class="icon-copy"></i>
                        Copy
                    </button>
                </div>
                <pre><code class="language-${language}">${escapedCode}</code></pre>
            </div>`;
        }.bind(this);

        // Custom heading renderer for automatic IDs
        renderer.heading = function(text, level) {
            const id = this.createSlug(text);
            return `<h${level} id="${id}">${text}</h${level}>`;
        }.bind(this);

        // Parse markdown with custom renderer
        const html = marked.parse(markdown, { renderer });

        return html;
    }

    generateTOC() {
        const contentContainer = document.getElementById('prompt-content');
        const headers = contentContainer.querySelectorAll('h1, h2, h3');
        const tocContainer = document.getElementById('toc-nav'); // Changed from 'toc-list' to 'toc-nav'

        this.tocItems = [];
        if (tocContainer) {
            tocContainer.innerHTML = '';
        }

        headers.forEach((header) => {
            const id = this.createSlug(header.textContent);
            header.id = id;

            const level = parseInt(header.tagName.charAt(1));
            const tocItem = {
                id,
                text: header.textContent,
                level,
                element: header
            };

            this.tocItems.push(tocItem);

            // Create TOC link only if container exists
            if (tocContainer) {
                const tocLink = document.createElement('a');
                tocLink.href = `#${id}`;
                tocLink.className = `toc-link toc-level-${level}`;
                tocLink.textContent = header.textContent;
                tocLink.setAttribute('data-section', id);

                const tocListItem = document.createElement('li');
                tocListItem.appendChild(tocLink);
                tocContainer.appendChild(tocListItem);
            }
        });
    }

    setupSyntaxHighlighting() {
        // Add copy functionality to code blocks
        document.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.target.getAttribute('data-code');
                this.copyToClipboard(code);
                this.showCopyFeedback(e.target);
            });
        });
    }

    observeSections() {
        // Clear previous observations
        if (this.observer) {
            document.querySelectorAll('h1, h2, h3').forEach(header => {
                this.observer.unobserve(header);
            });
        }

        // Observe new sections
        document.querySelectorAll('h1, h2, h3').forEach(header => {
            this.observer.observe(header);
        });
    }

    updateActiveSection(sectionId) {
        // Remove active class from all TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateReadingProgress(element) {
        const contentContainer = document.getElementById('prompt-content');
        const contentHeight = contentContainer.scrollHeight;
        const elementTop = element.offsetTop;
        const windowHeight = window.innerHeight;

        const progress = Math.min(100, (elementTop / (contentHeight - windowHeight)) * 100);

        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) {
            progressBar.style.width = `${Math.max(0, progress)}%`;
        }
    }

    scrollToSection(href) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerOffset = 100;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    async handleCopyAction(e) {
        const button = e.target.closest('.copy-btn');
        const action = button.getAttribute('data-action');

        let textToCopy = '';

        switch (action) {
        case 'full':
            textToCopy = this.currentPrompt.content;
            break;
        case 'link':
            textToCopy = window.location.href;
            break;
        case 'title':
            textToCopy = this.currentPrompt.title;
            break;
        default:
            textToCopy = this.currentPrompt.content;
        }

        await this.copyToClipboard(textToCopy);
        this.showCopyFeedback(button);
    }

    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
        } catch (error) {
            console.error('Failed to copy:', error);
            throw error;
        }
    }

    showCopyFeedback(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    }

    async copyFullPrompt() {
        if (!this.currentPrompt) {
            return;
        }

        try {
            await this.copyToClipboard(this.currentPrompt.content);
            this.showToast('Full prompt copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            this.showErrorToast('Failed to copy prompt');
        }
    }

    downloadPrompt() {
        if (!this.currentPrompt) {
            return;
        }

        const blob = new Blob([this.currentPrompt.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.createSlug(this.currentPrompt.title)}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    async sharePrompt() {
        const shareData = {
            title: this.currentPrompt.title,
            text: this.currentPrompt.description,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback - copy link to clipboard
                await this.copyToClipboard(window.location.href);
                this.showNotification('Link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }

    printPrompt() {
        window.print();
    }

    searchContent(query) {
        const contentContainer = document.getElementById('prompt-content');
        const content = contentContainer.innerHTML;

        if (!query.trim()) {
            // Clear highlights
            contentContainer.innerHTML = content.replace(/<mark class="search-highlight">(.*?)<\/mark>/g, '$1');
            return;
        }

        // Simple search highlighting
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedContent = content.replace(regex, '<mark class="search-highlight">$1</mark>');
        contentContainer.innerHTML = highlightedContent;
    }

    handleKeyNavigation(e) {
        // Escape key - clear search
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('content-search');
            if (searchInput) {
                searchInput.value = '';
                this.searchContent('');
            }
        }

        // Ctrl/Cmd + F - focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('content-search');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Ctrl/Cmd + K - copy link
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.copyToClipboard(window.location.href);
            this.showNotification('Link copied!');
        }
    }

    updateBreadcrumbs() {
        const breadcrumbsContainer = document.querySelector('.breadcrumbs');
        if (breadcrumbsContainer && this.currentPrompt) {
            const categoryLink = breadcrumbsContainer.querySelector('.breadcrumb-category');
            const titleSpan = breadcrumbsContainer.querySelector('.breadcrumb-title');

            if (categoryLink) {
                categoryLink.textContent = this.currentPrompt.category;
                categoryLink.href = `browse.html?category=${this.currentPrompt.category}`;
            }

            if (titleSpan) {
                titleSpan.textContent = this.currentPrompt.title;
            }
        }
    }

    updateMetadata() {
        if (!this.currentPrompt) {
            return;
        }

        // Update document title and metadata based on HTML structure
        const docTitle = document.getElementById('doc-title');
        const docCategory = document.getElementById('doc-category');
        const docReadingTime = document.getElementById('doc-reading-time');
        const docWordCount = document.getElementById('doc-word-count');
        const docDifficulty = document.getElementById('doc-difficulty');
        const docLastUpdated = document.getElementById('doc-last-updated');

        if (docTitle) {
            docTitle.textContent = this.currentPrompt.title;
        }
        if (docCategory) {
            docCategory.textContent = this.currentPrompt.category;
            docCategory.className = `doc-category badge badge-${this.currentPrompt.category.toLowerCase()}`;
        }
        if (docReadingTime) {
            docReadingTime.textContent = this.currentPrompt.readTime;
        }
        if (docWordCount) {
            const wordCount = this.currentPrompt.content.split(/\s+/).length;
            docWordCount.textContent = `${wordCount} words`;
        }
        if (docDifficulty) {
            const difficulty = this.inferDifficulty(this.currentPrompt.content);
            docDifficulty.textContent = difficulty;
        }
        if (docLastUpdated) {
            docLastUpdated.textContent = this.formatDate(this.currentPrompt.lastUpdated);
        }
    }

    updateLayout() {
        // Handle responsive layout changes
        const sidebar = document.querySelector('.sidebar');
        const content = document.querySelector('.content-area'); // Changed from '.content' to '.content-area'

        if (sidebar && window.innerWidth <= 768) {
            sidebar.classList.add('mobile');
        } else if (sidebar) {
            sidebar.classList.remove('mobile');
        }

        if (content && window.innerWidth <= 768) {
            content.classList.add('mobile');
        } else if (content) {
            content.classList.remove('mobile');
        }
    }

    showLoading(show) {
        const loadingElement = document.querySelector('.loading-container');
        const contentElement = document.getElementById('prompt-content');

        if (loadingElement) {
            loadingElement.style.display = show ? 'block' : 'none';
        }
        if (contentElement) {
            contentElement.style.display = show ? 'none' : 'block';
        }

        this.isLoading = show;
    }

    showError(message) {
        const contentContainer = document.getElementById('prompt-content');
        if (contentContainer) {
            contentContainer.innerHTML = `
                <div class="error-container">
                    <div class="error-message">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        <h3>Error Loading Prompt</h3>
                        <p>${message}</p>
                        <button class="action-btn action-btn-primary" onclick="window.history.back()">Go Back</button>
                    </div>
                </div>
            `;
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showToast(message) {
        const toast = document.getElementById('copy-toast');
        if (toast) {
            const span = toast.querySelector('span');
            if (span) {
                span.textContent = message;
            }
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    showErrorToast(message) {
        const toast = document.getElementById('error-toast');
        if (toast) {
            const span = toast.querySelector('span');
            if (span) {
                span.textContent = message;
            }
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
    }

    createSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        if (!dateString) {
            return 'Unknown';
        }
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PromptReader();
});
