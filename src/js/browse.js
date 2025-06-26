// Stella Prompt Hub - Browse Page JavaScript
// Automatic prompt discovery system via GitHub API

class PromptBrowser {
    constructor() {
        this.prompts = [];
        this.filteredPrompts = [];
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.searchQuery = '';

        // GitHub API configuration for automatic prompt discovery
        this.githubConfig = {
            owner: 'Hyoni1129',
            repo: 'Stella-Prompt-Hub',
            token: this.getGitHubToken(),
            promptsPath: 'prompts'
        };

        this.availablePrompts = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.discoverPrompts();
        await this.loadPrompts();

        // Only render after prompts are fully loaded
        console.log('Prompts loaded, starting render. Prompts:', this.prompts);
        this.renderPrompts();
        this.updateCounts();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchClear = document.getElementById('search-clear');

        searchInput.addEventListener('input', this.debounce((e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterPrompts();
            this.renderPrompts();
            this.updateSearchClear();
        }, 300));

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            this.searchQuery = '';
            this.filterPrompts();
            this.renderPrompts();
            this.updateSearchClear();
        });

        // Category filters
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.setActiveCategory(category);
                this.filterPrompts();
                this.renderPrompts();
            });
        });

        // View toggle
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.setActiveView(view);
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', this.throttle(() => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100));

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mobile menu
        this.initMobileMenu();

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                case 'k':
                    e.preventDefault();
                    searchInput.focus();
                    break;
                case '/':
                    e.preventDefault();
                    searchInput.focus();
                    break;
                }
            }
        });

        // Navigation scroll links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href="#about"]')) {
                e.preventDefault();
                document.getElementById('about').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    /**
     * Automatically discover all markdown files in the prompts directory via GitHub API
     */
    async discoverPrompts() {
        try {
            const { owner, repo, token, promptsPath } = this.githubConfig;
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${promptsPath}`;

            const headers = {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Stella-Prompt-Hub'
            };

            // Add authorization header if token is provided
            if (token) {
                headers['Authorization'] = `token ${token}`;
            }

            const response = await fetch(apiUrl, { headers });

            if (!response.ok) {
                console.warn('GitHub API request failed, falling back to static list');
                this.loadFallbackPrompts();
                return;
            }

            const files = await response.json();

            // Filter for markdown files only
            this.availablePrompts = files
                .filter(file => file.type === 'file' && file.name.endsWith('.md'))
                .map(file => file.name)
                .sort(); // Sort alphabetically

            console.log(`✅ Discovered ${this.availablePrompts.length} prompts automatically:`, this.availablePrompts);

        } catch (error) {
            console.warn('Error discovering prompts via GitHub API:', error);
            this.loadFallbackPrompts();
        }
    }

    /**
     * Enhanced fallback system with local index file support
     */
    async loadFallbackPrompts() {
        try {
            // First try to load from generated index file
            const response = await fetch('src/data/prompt-index.json');
            if (response.ok) {
                const indexData = await response.json();
                this.availablePrompts = indexData.prompts.map(p => p.filename);
                console.log(`📋 Loaded ${this.availablePrompts.length} prompts from local index`);
                return;
            }
        } catch (error) {
            console.warn('Could not load local prompt index:', error);
        }

        // Ultimate fallback to hardcoded list
        this.availablePrompts = [
            'technical-writing-assistant.md',
            'creative-story-generator.md',
            'code-review-assistant.md',
            'data-analysis-expert.md',
            'meeting-facilitator.md'
        ];
        console.log('📋 Using hardcoded fallback prompt list');
    }

    async loadPrompts() {
        try {
            this.prompts = [];
            console.log('Loading prompts from files:', this.availablePrompts);

            // Load each prompt file and extract metadata from the markdown
            for (const filename of this.availablePrompts) {
                try {
                    console.log('Loading file:', filename);
                    const response = await fetch(`prompts/${filename}`);
                    if (response.ok) {
                        const content = await response.text();
                        const prompt = this.parseMarkdownPrompt(filename, content);
                        console.log('Parsed prompt:', prompt);
                        this.prompts.push(prompt);
                    } else {
                        console.warn(`Failed to load ${filename}:`, response.status);
                    }
                } catch (error) {
                    console.warn(`Could not load ${filename}:`, error);
                    this.showLoadingError();
                }
            }

            console.log('All prompts loaded:', this.prompts);
            this.filteredPrompts = [...this.prompts];

            // Generate categories from loaded prompts
            this.generateCategories();

        } catch (error) {
            console.error('Error loading prompts:', error);
            console.log('Falling back to fallback data...');
            this.loadFallbackData();
        }
    }

    parseMarkdownPrompt(filename, content) {
        // Extract title from first # heading
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : filename.replace('.md', '').replace(/-/g, ' ');

        // Extract description from overview section or first paragraph
        const overviewMatch = content.match(/## Overview\s*\n\n(.+?)(?=\n\n|\n#|$)/s);
        let description = overviewMatch ? overviewMatch[1].trim() : '';

        // If no overview, get first paragraph after title
        if (!description) {
            const firstParaMatch = content.match(/^#.+\n\n(.+?)(?=\n\n|\n#|$)/s);
            description = firstParaMatch ? firstParaMatch[1].trim() : '';
        }

        // Limit description length
        if (description.length > 200) {
            description = description.substring(0, 197) + '...';
        }

        // Determine category from content or filename
        const category = this.inferCategory(filename, content);

        // Generate tags from headings and content
        const tags = this.extractTags(content);

        // Estimate reading time (average 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        return {
            id: filename.replace('.md', ''),
            title,
            category,
            description,
            content: description, // Add content field
            tags,
            difficulty: this.inferDifficulty(content),
            readingTime: `${readTime} min`, // Changed from readTime to readingTime
            wordCount, // Add wordCount
            lastUpdated: new Date().toISOString().split('T')[0], // Today's date as fallback
            featured: false,
            filename
        };
    }

    inferCategory(filename, content) {
        const contentLower = content.toLowerCase();
        const filenameLower = filename.toLowerCase();

        if (filenameLower.includes('writing') || contentLower.includes('writing') || contentLower.includes('story')) {
            return 'writing';
        } else if (filenameLower.includes('code') || contentLower.includes('programming') || contentLower.includes('javascript') || contentLower.includes('python')) {
            return 'development';
        } else if (filenameLower.includes('data') || contentLower.includes('analysis') || contentLower.includes('statistics')) {
            return 'analysis';
        } else if (filenameLower.includes('creative') || contentLower.includes('brainstorm') || contentLower.includes('innovation')) {
            return 'creative';
        } else if (filenameLower.includes('meeting') || contentLower.includes('facilitator') || contentLower.includes('collaboration')) {
            return 'productivity';
        } else {
            return 'general';
        }
    }

    extractTags(content) {
        const tags = new Set();

        // First, try to extract manual tags from ## Tags section
        const tagSectionMatch = content.match(/^## Tags?\s*\n([\s\S]*?)(?=\n## |\n# |$)/mi);
        if (tagSectionMatch) {
            const tagSection = tagSectionMatch[1];
            // Extract tags from list format (- tag) or comma-separated
            const manualTags = tagSection
                .replace(/-\s*/g, '') // Remove list markers
                .split(/[,\n]/) // Split by comma or newline
                .map(tag => tag.trim().toLowerCase())
                .filter(tag => tag && tag.length > 0);

            manualTags.forEach(tag => tags.add(tag));
        }

        // If no manual tags found, fall back to automatic detection
        if (tags.size === 0) {
            const contentLower = content.toLowerCase();

            // Common tag patterns for automatic detection
            const tagPatterns = [
                'writing', 'creative', 'technical', 'analysis', 'data', 'code', 'review',
                'story', 'documentation', 'meeting', 'facilitation', 'productivity',
                'collaboration', 'planning', 'strategy', 'communication', 'leadership',
                'brainstorming', 'design', 'development', 'debugging', 'architecture'
            ];

            tagPatterns.forEach(pattern => {
                if (contentLower.includes(pattern)) {
                    tags.add(pattern);
                }
            });
        }

        return Array.from(tags).slice(0, 5); // Limit to 5 tags
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

    generateCategories() {
        const categoryCount = {};
        this.prompts.forEach(prompt => {
            categoryCount[prompt.category] = (categoryCount[prompt.category] || 0) + 1;
        });

        this.categories = Object.keys(categoryCount).map(name => ({
            id: name,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            count: categoryCount[name]
        }));
    }

    loadFallbackData() {
        console.log('Loading fallback data...');
        // Minimal fallback if no prompts can be loaded
        this.prompts = [{
            id: 'sample-prompt',
            title: 'Welcome to Stella Prompt Hub',
            category: 'general',
            description: 'This is a sample prompt. Add your own Markdown files to the prompts/ directory to see them here.',
            content: 'This is a sample prompt to demonstrate the interface. Add your own Markdown files to the prompts/ directory to see them here.',
            tags: ['sample', 'welcome'],
            difficulty: 'Beginner',
            readingTime: '1 min',
            wordCount: 25,
            lastUpdated: new Date().toISOString().split('T')[0],
            featured: true,
            filename: 'sample.md'
        }];

        this.filteredPrompts = [...this.prompts];
        this.generateCategories();
    }

    filterPrompts() {
        this.filteredPrompts = this.prompts.filter(prompt => {
            const matchesCategory = this.currentCategory === 'all' || prompt.category === this.currentCategory;
            const matchesSearch = this.searchQuery === '' ||
                prompt.title.toLowerCase().includes(this.searchQuery) ||
                prompt.description.toLowerCase().includes(this.searchQuery) ||
                prompt.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));

            return matchesCategory && matchesSearch;
        });

        this.updateCounts();
    }

    renderPrompts() {
        const grid = document.getElementById('prompts-grid');
        const noResults = document.getElementById('no-results');
        const resultsCount = document.getElementById('results-count');

        // Update results count
        const count = this.filteredPrompts.length;
        const categoryText = this.currentCategory === 'all' ? 'prompts' : `${this.currentCategory} prompts`;
        resultsCount.textContent = `${count} ${categoryText} found`;

        if (count === 0) {
            grid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        // Debug: Check what we're trying to render
        console.log('Filtered prompts to render:', this.filteredPrompts);
        console.log('First prompt type:', typeof this.filteredPrompts[0]);

        // Render prompt cards
        grid.innerHTML = this.filteredPrompts.map(prompt => this.createPromptCard(prompt)).join('');

        // Add event listeners to cards
        this.addCardEventListeners();

        // Animate cards
        this.animateCards();
    }

    createPromptCard(prompt) {
        // Validate that prompt is an object, not a string
        if (typeof prompt === 'string') {
            console.error('Prompt is a string, not an object:', prompt);
            return ''; // Return empty string to avoid breaking the map
        }

        // Validate and provide fallbacks for all fields
        const id = prompt.id || prompt.filename || 'unknown';
        const title = prompt.title || 'Untitled Prompt';
        const description = prompt.description || 'No description available';
        const category = prompt.category || 'other';
        const content = prompt.content || prompt.description || 'No content available';
        const truncatedContent = content && content.length > 150 ? content.substring(0, 150) + '...' : (content || 'No preview available');
        const readingTime = prompt.readingTime || prompt.readTime || '5 min';
        const wordCount = prompt.wordCount || 0;
        const difficulty = prompt.difficulty || 'intermediate';

        const difficultyColor = {
            'beginner': 'var(--success)',
            'intermediate': 'var(--warning)',
            'advanced': 'var(--error)'
        };

        return `
            <div class="prompt-card ${prompt.featured ? 'featured' : ''}" data-id="${this.escapeHtml(id)}">
                <div class="prompt-category">
                    <span class="badge badge-${this.escapeHtml(category)}">${this.escapeHtml(category)}</span>
                </div>
                
                <div class="prompt-content">
                    <h3 class="prompt-title">${this.escapeHtml(title)}</h3>
                    <p class="prompt-description">${this.escapeHtml(description)}</p>
                    
                    <div class="prompt-preview">
                        ${this.escapeHtml(truncatedContent)}
                    </div>
                    
                    <div class="prompt-meta">
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span>${this.escapeHtml(readingTime)}</span>
                        </div>
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            <span>${this.escapeHtml(wordCount)} words</span>
                        </div>
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            <span style="color: ${difficultyColor[difficulty] || 'var(--gray-500)'}">${this.escapeHtml(difficulty)}</span>
                        </div>
                    </div>
                    
                    <div class="prompt-actions">
                        <button class="action-btn action-btn-primary" onclick="promptBrowser.openPrompt('${this.escapeHtml(id)}')">>>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            Read More
                        </button>
                        <button class="quick-copy-btn" onclick="promptBrowser.quickCopy('${prompt.id}')" title="Quick copy">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addCardEventListeners() {
        const cards = document.querySelectorAll('.prompt-card');
        cards.forEach(card => {
            // Make entire card clickable (except action buttons)
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.prompt-actions')) {
                    const promptId = card.dataset.id;
                    this.openPrompt(promptId);
                }
            });
        });
    }

    animateCards() {
        const cards = document.querySelectorAll('.prompt-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateCounts() {
        const counts = {
            all: this.prompts.length,
            writing: this.prompts.filter(p => p.category === 'writing').length,
            development: this.prompts.filter(p => p.category === 'development').length,
            analysis: this.prompts.filter(p => p.category === 'analysis').length,
            creative: this.prompts.filter(p => p.category === 'creative').length
        };

        Object.keys(counts).forEach(category => {
            const countElement = document.getElementById(`count-${category}`);
            if (countElement) {
                countElement.textContent = counts[category];
            }
        });
    }

    setActiveCategory(category) {
        this.currentCategory = category;

        // Update UI
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
    }

    setActiveView(view) {
        this.currentView = view;

        // Update UI
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Update grid class
        const grid = document.getElementById('prompts-grid');
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    }

    updateSearchClear() {
        const searchClear = document.getElementById('search-clear');
        const searchInput = document.getElementById('search-input');

        if (searchInput.value.length > 0) {
            searchClear.style.display = 'block';
        } else {
            searchClear.style.display = 'none';
        }
    }

    async quickCopy(promptId) {
        const prompt = this.prompts.find(p => p.id === promptId);
        if (!prompt) {
            return;
        }

        try {
            await navigator.clipboard.writeText(prompt.content);
            this.showToast('Prompt copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy prompt:', err);
            this.showToast('Failed to copy prompt', 'error');
        }
    }

    openPrompt(promptId) {
        // In a real implementation, this would navigate to the prompt reader page
        const prompt = this.prompts.find(p => p.id === promptId);
        if (prompt) {
            // For now, we'll create a URL with the prompt ID
            const url = `prompt-reader.html?id=${promptId}`;
            window.location.href = url;
        }
    }

    showToast(message) {
        const toast = document.getElementById('copy-toast');
        const span = toast.querySelector('span');

        span.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!navToggle || !navMenu) {
            return;
        }

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.prompt-card, .hero-content');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Show loading error to users with retry option
     */
    showLoadingError() {
        const grid = document.getElementById('prompts-grid');
        if (!grid.querySelector('.error-notification')) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-notification';
            errorDiv.innerHTML = `
                <div class="error-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="15" y1="9" x2="9" y2="15"/>
                        <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>
                    <div>
                        <h3>Loading Error</h3>
                        <p>Some prompts couldn't be loaded. This might be due to network issues.</p>
                        <button class="retry-btn" onclick="location.reload()">Retry</button>
                    </div>
                </div>
            `;
            grid.appendChild(errorDiv);
        }
    }

    /**
     * Safely get GitHub token from environment or fallback
     * In production, this should come from environment variables or be omitted for public repos
     */
    getGitHubToken() {
        // For public repositories, GitHub API works without token (with rate limits)
        // For private repos or higher rate limits, use environment variables
        if (typeof window !== 'undefined' && window.GITHUB_TOKEN) {
            return window.GITHUB_TOKEN;
        }

        // GitHub API works without token for public repos (60 requests/hour per IP)
        return null;
    }

    // HTML 이스케이프 함수 - XSS 공격 방지
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Global functions for inline event handlers
// Global functions for HTML onclick handlers
window.clearSearch = function() {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    if (window.promptBrowser) {
        window.promptBrowser.searchQuery = '';
        window.promptBrowser.filterPrompts();
        window.promptBrowser.renderPrompts();
        window.promptBrowser.updateSearchClear();
    }
};

window.filterCategory = function(category) {
    if (window.promptBrowser) {
        window.promptBrowser.setActiveCategory(category);
        window.promptBrowser.filterPrompts();
        window.promptBrowser.renderPrompts();
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.promptBrowser = new PromptBrowser();

    // Add loading animation
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        setTimeout(() => {
            loadingContainer.style.opacity = '0';
            setTimeout(() => {
                loadingContainer.remove();
            }, 300);
        }, 1000);
    }

    console.log('🌟 Stella Prompt Hub Browser initialized successfully!');
});
