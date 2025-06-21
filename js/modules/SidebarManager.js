/**
 * Neural Sidebar Manager
 * Handles vertical sidebar navigation with neural interface theming
 */

export class SidebarManager {
    constructor() {
        this.sidebar = null;
        this.sidebarToggle = null;
        this.secondaryToggle = null;
        this.secondarySection = null;
        this.isExpanded = false;
        this.isSecondaryCollapsed = false;
        
        this.init();
    }
    
    init() {
        this.sidebar = document.getElementById('neural-sidebar');
        this.sidebarToggle = document.getElementById('mobile-menu-toggle');
        this.secondaryToggle = document.getElementById('secondary-toggle');
        this.secondarySection = document.querySelector('.sidebar-secondary');
        
        if (!this.sidebar) {
            console.warn('Neural sidebar not found');
            return;
        }
        
        this.setupEventListeners();
        this.setupResponsiveBehavior();
        this.initializeActiveStates();
        

    }
    
    setupEventListeners() {
        // Main sidebar toggle
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                if (Config.debugMode) {
                    console.log('🔄 Sidebar toggle clicked', {
                        isExpanded: this.isExpanded,
                        isMobile: window.matchMedia('(max-width: 767px)').matches,
                        sidebarClasses: Array.from(this.sidebar.classList)
                    });
                }
                this.toggleSidebar();
            });
        } else {
            console.error('❌ Sidebar toggle button not found!');
        }
        
        // Secondary menu toggle
        if (this.secondaryToggle) {
            this.secondaryToggle.addEventListener('click', () => this.toggleSecondaryMenu());
        }
        
        // Secondary header click (entire header is clickable)
        const secondaryHeader = document.querySelector('.secondary-header');
        if (secondaryHeader) {
            secondaryHeader.addEventListener('click', () => this.toggleSecondaryMenu());
        }
        
        // Hover behavior for desktop
        if (window.matchMedia('(min-width: 1024px)').matches) {
            this.sidebar.addEventListener('mouseenter', () => {
                if (!this.isExpanded) {
                    this.expandSidebar();
                }
            });
            
            this.sidebar.addEventListener('mouseleave', () => {
                if (this.isExpanded && !this.sidebar.classList.contains('pinned')) {
                    this.collapseSidebar();
                }
            });
        }
        
        // Click outside to close sidebar
        this.setupClickOutsideToClose();
        
        // Active state management for navigation items
        this.setupActiveStates();
        
        // Consciousness widget integration
        this.setupConsciousnessIntegration();
    }
    
    setupResponsiveBehavior() {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        
        const handleMobileChange = (e) => {
            if (e.matches) {
                // Mobile: sidebar becomes overlay
                this.sidebar.classList.add('mobile-overlay');
                this.collapseSidebar();
            } else {
                // Desktop: sidebar is fixed
                this.sidebar.classList.remove('mobile-overlay');
            }
        };
        
        mediaQuery.addListener(handleMobileChange);
        handleMobileChange(mediaQuery);
    }
    
    initializeActiveStates() {
        // Set initial active state based on current page/section
        const currentHash = window.location.hash;
        const currentPath = window.location.pathname;
        
        // Remove all active states first
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Set active state based on current location
        if (currentHash === '#gallery') {
            document.getElementById('fragments-nav')?.classList.add('active');
        } else if (currentHash === '#lore') {
            document.getElementById('lore-nav')?.classList.add('active');
        } else if (currentPath.includes('studies')) {
            document.getElementById('studies-nav')?.classList.add('active');
        }
    }
    
    setupActiveStates() {
        // Navigation link active state management
        const navLinks = document.querySelectorAll('.sidebar-item[href]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active from all nav items
                document.querySelectorAll('.sidebar-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active to clicked item
                link.classList.add('active');
                
                // On mobile, collapse sidebar after navigation
                if (window.matchMedia('(max-width: 767px)').matches) {
                    setTimeout(() => this.collapseSidebar(), 300);
                }
            });
        });
        
        // Scroll tracking for active states
        this.setupScrollTracking();
    }
    
    setupScrollTracking() {
        const sections = document.querySelectorAll('#intro, #gallery, #lore');
        const navItems = {
            'intro': null, // No nav item for intro
            'gallery': document.getElementById('fragments-nav'),
            'lore': document.getElementById('lore-nav')
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const navItem = navItems[sectionId];
                    
                    // Remove active from all nav items
                    Object.values(navItems).forEach(item => {
                        if (item) item.classList.remove('active');
                    });
                    
                    // Add active to current section's nav item
                    if (navItem) {
                        navItem.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }
    
    setupClickOutsideToClose() {
        document.addEventListener('click', (e) => {
            // Only close if sidebar is expanded
            if (!this.isExpanded) return;
            
            // Don't close if clicking on the sidebar itself
            if (this.sidebar.contains(e.target)) return;
            
            // Don't close if clicking on the mobile toggle button
            if (this.sidebarToggle && this.sidebarToggle.contains(e.target)) return;
            
            // Close the sidebar
            this.collapseSidebar();
        });
    }

    setupConsciousnessIntegration() {
        // Neural status button removed - consciousness widget now operates independently
        if (Config.debugMode) {
            console.log('🧠 Neural status button removed - widget operates independently');
        }
    }
    
    toggleSidebar() {
        if (this.isExpanded) {
            this.collapseSidebar();
        } else {
            this.expandSidebar();
        }
    }
    
    expandSidebar() {
        this.sidebar.classList.add('expanded');
        this.isExpanded = true;
        
        // Update toggle icon
        const toggleIcon = this.sidebarToggle?.querySelector('.menu-icon');
        if (toggleIcon) {
            toggleIcon.textContent = '◀';
        }
        
        if (Config.debugMode) {
            console.log('🧠 Sidebar expanded');
        }
    }
    
    collapseSidebar() {
        this.sidebar.classList.remove('expanded');
        this.isExpanded = false;
        
        // Update toggle icon
        const toggleIcon = this.sidebarToggle?.querySelector('.menu-icon');
        if (toggleIcon) {
            toggleIcon.textContent = '≡';
        }
        
        if (Config.debugMode) {
            console.log('🧠 Sidebar collapsed');
        }
    }
    
    toggleSecondaryMenu() {
        if (this.isSecondaryCollapsed) {
            this.expandSecondaryMenu();
        } else {
            this.collapseSecondaryMenu();
        }
    }
    
    expandSecondaryMenu() {
        this.secondarySection.classList.remove('collapsed');
        this.isSecondaryCollapsed = false;
        
        if (Config.debugMode) {
            console.log('🧠 Secondary menu expanded');
        }
    }
    
    collapseSecondaryMenu() {
        this.secondarySection.classList.add('collapsed');
        this.isSecondaryCollapsed = true;
        
        if (Config.debugMode) {
            console.log('🧠 Secondary menu collapsed');
        }
    }
    
    // Public API methods
    setActiveNavItem(itemId) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const targetItem = document.getElementById(itemId);
        if (targetItem) {
            targetItem.classList.add('active');
        }
    }
    
    pinSidebar() {
        this.sidebar.classList.add('pinned');
        this.expandSidebar();
    }
    
    unpinSidebar() {
        this.sidebar.classList.remove('pinned');
    }
    
    destroy() {
        // Cleanup event listeners if needed
        if (Config.debugMode) {
            console.log('🧠 SidebarManager destroyed');
        }
    }
} 