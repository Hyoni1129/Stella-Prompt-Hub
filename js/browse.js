// Stella Open Prompt - Browse Page JavaScript
// Enhanced functionality for browsing and discovering prompts

class PromptBrowser {
    constructor() {
        this.prompts = [];
        this.filteredPrompts = [];
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.searchQuery = '';
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadPrompts();
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
    }

    async loadPrompts() {
        try {
            // Load prompts data from JSON file
            const response = await fetch('/prompts/prompts-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.prompts = data.allPrompts;
            this.categories = data.categories;
            this.stats = data.stats;
            
            this.filteredPrompts = [...this.prompts];
        } catch (error) {
            console.error('Error loading prompts:', error);
            // Fallback to sample data if loading fails
            this.loadSampleData();
        }
    }

    loadSampleData() {
        // Fallback sample data
        this.prompts = [
            {
                id: 'creative-writing-assistant',
                title: 'Creative Writing Assistant',
                category: 'writing',
                description: 'A comprehensive prompt for generating creative stories with detailed character development and engaging plots.',
                tags: ['creative', 'storytelling', 'character', 'plot'],
                difficulty: 'Intermediate',
                readTime: '2 min',
                lastUpdated: '2024-01-26',
                featured: false,
                popularity: 85
            },
            {
                id: 'code-review-expert',
                title: 'Code Review Expert',
                category: 'coding',
                description: 'Professional code review assistant that provides detailed feedback on code quality, security, and best practices.',
                tags: ['code', 'review', 'quality', 'security'],
                difficulty: 'Advanced',
                readTime: '1.5 min',
                lastUpdated: '2024-01-25',
                featured: true,
                popularity: 92
            },
            {
                id: 'data-analysis-specialist',
                title: 'Data Analysis Specialist',
                category: 'analysis',
                description: 'Comprehensive data analysis assistant for exploring datasets, identifying patterns, and generating insights.',
                tags: ['data', 'analysis', 'insights', 'patterns'],
                difficulty: 'Intermediate',
                readTime: '2 min',
                lastUpdated: '2024-01-24',
                featured: false,
                popularity: 78
            }
        ];

        this.filteredPrompts = [...this.prompts];
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

        // Render prompt cards
        grid.innerHTML = this.filteredPrompts.map(prompt => this.createPromptCard(prompt)).join('');

        // Add event listeners to cards
        this.addCardEventListeners();

        // Animate cards
        this.animateCards();
    }

    createPromptCard(prompt) {
        const truncatedContent = prompt.content.substring(0, 150) + '...';
        const difficultyColor = {
            'beginner': 'var(--success)',
            'intermediate': 'var(--warning)', 
            'advanced': 'var(--error)'
        };

        return `
            <div class="prompt-card ${prompt.featured ? 'featured' : ''}" data-id="${prompt.id}">
                <div class="prompt-category">
                    <span class="badge badge-${prompt.category}">${prompt.category}</span>
                </div>
                
                <div class="prompt-content">
                    <h3 class="prompt-title">${prompt.title}</h3>
                    <p class="prompt-description">${prompt.description}</p>
                    
                    <div class="prompt-preview">
                        ${truncatedContent}
                    </div>
                    
                    <div class="prompt-meta">
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span>${prompt.readingTime}</span>
                        </div>
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                            <span>${prompt.wordCount} words</span>
                        </div>
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            <span style="color: ${difficultyColor[prompt.difficulty] || 'var(--gray-500)'}">${prompt.difficulty}</span>
                        </div>
                    </div>
                    
                    <div class="prompt-actions">
                        <button class="action-btn action-btn-primary" onclick="promptBrowser.openPrompt('${prompt.id}')">
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
        if (!prompt) return;

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

    showToast(message, type = 'success') {
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
        
        if (!navToggle || !navMenu) return;

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
function clearSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';
    promptBrowser.searchQuery = '';
    promptBrowser.filterPrompts();
    promptBrowser.renderPrompts();
    promptBrowser.updateSearchClear();
}

function filterCategory(category) {
    promptBrowser.setActiveCategory(category);
    promptBrowser.filterPrompts();
    promptBrowser.renderPrompts();
}

// Initialize the application
let promptBrowser;

document.addEventListener('DOMContentLoaded', () => {
    promptBrowser = new PromptBrowser();
    
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
    
    console.log('🌟 Stella Open Prompt Browser initialized successfully!');
});
