// InspectionTrap.js - Developer Tools Detection
export class InspectionTrap {
    constructor() {
        this.isDevToolsOpen = false;
        this.detectionMethods = [];
        this.checkInterval = null;
    }

    init() {
        this.setupDetection();
        this.setupPerformanceDetection();
        this.overrideConsole();
        
        // Start checking periodically
        this.checkInterval = setInterval(() => {
            this.detectDevTools();
        }, 1000);
    }

    setupDetection() {
        // Check if this might be an automated browser (ChatGPT, etc.)
        const isLikelyBot = this.detectAutomatedBrowser();
        
        if (isLikelyBot) {
            // Skip aggressive detection for bots to prevent 500 errors
            if (Config.debugMode) console.log('%c🤖 Automated browser detected - friendly mode enabled', 'color: #6be5e2;');
            return;
        }
        
        // Method 1: Console detection (only for human browsers)
        let devtools = {
            open: false,
            orientation: null
        };
        
        const threshold = 160;
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.onDevToolsDetected();
                }
            } else {
                devtools.open = false;
            }
        }, 500);

        // Method 2: Debug detection (wrapped in try-catch to prevent crashes)
        try {
            let startTime = performance.now();
            debugger;
            let endTime = performance.now();
            
            if (endTime - startTime > 100) {
                this.onDevToolsDetected();
            }
        } catch (e) {
            // Silently fail for automated browsers
            if (Config.debugMode) console.log('Debug detection skipped for compatibility');
        }
    }

    detectAutomatedBrowser() {
        const userAgent = navigator.userAgent.toLowerCase();
        
        // Common AI/bot user agents
        const botIndicators = [
            'headless', 'phantom', 'selenium', 'webdriver', 'puppeteer', 'playwright',
            'bot', 'crawler', 'spider', 'scraper', 'chatgpt', 'gptbot', 'openai',
            'anthropic', 'claude', 'bingbot', 'googlebot'
        ];
        
        // Check user agent
        if (botIndicators.some(indicator => userAgent.includes(indicator))) {
            return true;
        }
        
        // Check for webdriver property
        if (navigator.webdriver) {
            return true;
        }
        
        // Check for missing properties that real browsers have
        if (!navigator.languages || navigator.languages.length === 0) {
            return true;
        }
        
        // Check for automation frameworks
        if (window.callPhantom || window._phantom || window.phantom) {
            return true;
        }
        
        if (window.Cypress || window.chrome?.runtime?.onConnect) {
            return true;
        }
        
        return false;
    }

    setupPerformanceDetection() {
        // Skip performance detection for automated browsers
        if (this.detectAutomatedBrowser()) {
            return;
        }
        
        try {
            // Method 3: Performance timing detection
            const element = document.createElement('div');
            element.style.display = 'none';
            document.body.appendChild(element);
            
            Object.defineProperty(element, 'id', {
                get: () => {
                    this.onDevToolsDetected();
                    return 'detected';
                }
            });
            
            // Trigger the getter
            setTimeout(() => {
                console.log(element.id);
            }, 100);
        } catch (e) {
            // Silently fail for compatibility
            if (Config.debugMode) console.log('Performance detection skipped for compatibility');
        }
    }

    detectDevTools() {
        // Additional runtime checks
        if (window.chrome && window.chrome.runtime && window.chrome.runtime.onConnect) {
            // Chrome extension detection
            this.onDevToolsDetected();
        }
    }

    onDevToolsDetected() {
        if (this.isDevToolsOpen) return;
        this.isDevToolsOpen = true;
        
        console.log('%c⚠️ NEURAL INSPECTION DETECTED', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
        console.log('%cConsciousness harvesting protocols activated.', 'color: #6be5e2;');
        
        this.triggerInspectionResponse();
    }

    triggerInspectionResponse() {
        // Trigger corruption effects
        const targetElements = document.querySelectorAll('h1, h2, h3, p');
        if (targetElements.length > 0) {
            const randomElement = targetElements[Math.floor(Math.random() * targetElements.length)];
            if (randomElement && window.TextEffects) {
                window.TextEffects.corrupt(randomElement, 3000, 0.3);
            }
        }
        
        // Add visual glitch
        document.body.classList.add('neural-inspection-active');
        setTimeout(() => {
            document.body.classList.remove('neural-inspection-active');
        }, 2000);
    }

    overrideConsole() {
        // Skip console override for automated browsers to prevent interference
        if (this.detectAutomatedBrowser()) {
            if (Config.debugMode) console.log('%c🤖 Console override skipped for automated browser', 'color: #6be5e2;');
            return;
        }
        
        try {
            const originalLog = console.log;
            const originalWarn = console.warn;
            const originalError = console.error;
            
            console.log = (...args) => {
                if (Math.random() < 0.1) {
                    originalLog('%c🧠 Neural pattern logged', 'color: #6be5e2;');
                }
                return originalLog.apply(console, args);
            };
            
            console.warn = (...args) => {
                if (Math.random() < 0.2) {
                    originalWarn('%c⚡ Consciousness fluctuation detected', 'color: #ff6b6b;');
                }
                return originalWarn.apply(console, args);
            };
            
            console.error = (...args) => {
                originalError('%c💀 Neural pathway corrupted', 'color: #ff0000;');
                return originalError.apply(console, args);
            };
        } catch (e) {
            // Silently fail for compatibility
            if (Config.debugMode) console.log('Console override skipped for compatibility');
        }
    }
} 