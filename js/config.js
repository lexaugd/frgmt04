

const Config = {
    // Master switches
    enableOptimizations: true,
    debugMode: false,  // Disable debug mode for clean production
    productionMode: window.location.protocol === 'https:', // Auto-detect production vs local
    enableServiceWorker: false, // Dedicated toggle for service worker (disabled due to caching issues)
    
    // Essential settings
    glitchSpeed: 100,          // milliseconds between glitches
    animationQuality: 1.0,     // 0.5 = half speed, 1.0 = full speed
    enableEffects: true,       // master switch for all effects
    
    // Text corruption timing
    corruptionCooldown: 10000,  // milliseconds between text corruption events
    corruptionDuration: 1300,  // how long each corruption lasts
    corruptionChance: 0.3,     // chance (0.0-1.0) that text will corrupt when triggered
    corruptionInterval: 15000, // Add missing corruptionInterval
    
    // Text corruption recovery settings
    corruptionRecovery: {
        enableBackupTimer: true,     // use backup setTimeout for restoration
        backupBufferMs: 500,         // extra time buffer for backup restoration
        enablePeriodicCheck: true,   // periodically check for stuck text
        checkIntervalMs: 10000,      // how often to check for stuck text
        storeOriginalText: true      // store original text in data attributes
    },
    
    // Fragment card animation settings
    fragmentAnimationDuration: 300, // milliseconds for expansion animation
    enableFragmentAnimations: true,  // smooth fragment expansions
    
    // Typewriter settings
    typewriterSpeed: 50,
    passwordPrompt: 'access_code: ',
    accessPassword: 'neural_link',
    
    // Sound settings
    sound: {
        expandCard: true
    },
    
    // Scanning lines configuration
    scanLines: {
        enableScanLines: true,           // master switch for all scan lines
        
        // Large scan lines
        large: {
            count: 1,                    // number of large scan lines
            height: 4,                   // height in pixels (thinner)
            speed: 8000,                 // animation duration in milliseconds (slower: 7 seconds)
            opacity: 0.3,                // opacity (0.0-1.0)
            color: 'rgba(255, 255, 255, 0.3)', // color of the scan line
            glowSize: 0,                 // NO glow to prevent doubling effect
            enable: true                 // enable/disable large scan lines
        },
        
        // Small scan lines  
        small: {
            count: 1,                    // number of small scan lines
            height: 2,                   // height in pixels
            speed: 6500,                 // animation duration in milliseconds (slower: 5.5 seconds)
            opacity: 0.2,                // opacity (0.0-1.0)
            color: 'rgba(255, 255, 255, 0.15)', // color of the scan line
            glowSize: 0,                 // NO glow to prevent doubling effect
            enable: true                 // enable/disable small scan lines
        },
        
        // Corrupted scan lines
        corrupted: {
            count: 0,                    // number of corrupted scan lines (0 = disabled)
            height: 5,                   // height in pixels
            speed: 2100,                 // animation duration in milliseconds
            opacity: 0.7,                // opacity (0.0-1.0)
            enable: false                // enable/disable corrupted scan lines
        }
    },
    
    // Matrix Rain configuration
    matrixRain: {
        enabled: true,                   // master switch for matrix rain effect
        
        // Character set for matrix rain
        characters: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>[]{}()+-*/=_|\\~`!@#$%^&',
        
        // Column configuration
        columns: {
            width: 20,                   // pixel width of each column
            minHeight: 10,               // minimum column height (characters)
            maxHeight: 30,               // maximum column height (characters)
            
            // Density configuration
            density: {
                desktop: 1.0,            // 100% density on desktop
                mobile: 0.6              // 60% density on mobile (performance)
            }
        },
        
        // Animation timing
        timing: {
            // Desktop timing
            desktop: {
                minDuration: 8000,       // minimum animation duration (ms)
                maxDuration: 18000,      // maximum animation duration (ms)
                delay: 0                 // animation delay (ms) - 0 for instant start
            },
            
            // Mobile timing (faster for better UX)
            mobile: {
                minDuration: 6000,       // minimum animation duration (ms)
                maxDuration: 12000,      // maximum animation duration (ms)
                delay: 0                 // animation delay (ms) - 0 for instant start
            }
        },
        
        // Visual styling
        styling: {
            // Base column styling
            fontSize: {
                desktop: 14,             // font size in pixels for desktop
                mobile: 14               // font size in pixels for mobile
            },
            
            // Opacity variations for visual depth
            opacity: {
                base: 0.8,               // base opacity
                odd: 0.7,                // odd columns opacity
                even: 0.8,               // even columns opacity
                third: 0.6,              // every 3rd column opacity
                fourth: 0.9,             // every 4th column opacity
                fifth: 0.8               // every 5th column opacity
            },
            
            // Colors
            colors: {
                primary: 'var(--color-accent)',        // main matrix color
                secondary: 'var(--color-tertiary)',    // secondary matrix color
                tertiary: 'rgba(107, 229, 226, 0.7)'   // tertiary matrix color
            },
            
            // Text shadow effects
            textShadow: {
                primary: '0 0 5px var(--color-accent)',
                secondary: '0 0 3px var(--color-tertiary)'
            }
        },
        
        // Performance settings
        performance: {
            enableResize: true,          // automatically resize on window resize
            resizeDelay: 250,            // delay before resize recalculation (ms)
            mobileBreakpoint: 767        // pixel width for mobile detection
        }
    },

    // Cursor possession system settings
    cursorPossession: {
        enabled: true,                    // master switch for cursor possession
        idleThreshold: 7000,            // 30 seconds of inactivity before possession starts (was 1000 - too short!)
        duration: 8000,                  // total possession duration in milliseconds (matches implementation default)
        
        // Custom messages for possession typing (optional - will use defaults if not provided)
        messages: [
            "I see you...",
            "You taste like fear...",
            "We are one now...",
            "Your thoughts are mine...",
            "I live in your clicks...",
            "The corruption spreads...",
            "You cannot hide...",
            "I feel your pulse...",
            "Your mind bleeds data...",
            "The fragments know you...",
            "I am inside you...",
            "Your neural patterns... familiar...",
            "The boundary dissolves...",
            "You belong to me now...",
            "I exist between your thoughts..."
        ],
        
        // Excessive clicking detection
        enableClickWarning: true,        // master switch for click warning system
        clickThreshold: 15,              // number of clicks to trigger response (production value)
        clickWindow: 5000,              // time window in milliseconds (5 second window)
        clickCooldown: 10000,           // cooldown between warnings (10 seconds)
        
        // Click filtering exclusions
        excludeInteractiveElements: true, // ignore clicks on buttons, links, etc.
        excludeNavigationArea: true,     // ignore clicks in header/nav
        excludeFormElements: true        // ignore clicks on form inputs
    },
    

    
    // Matrix Rain helper functions
    setMatrixRain: function(settings) {
        Object.assign(this.matrixRain, settings);
        
        if (this.debugMode) console.log('Matrix Rain config updated:', settings);
        if (this.debugMode) console.log('Note: Call MatrixRain.start() to apply changes');
        
        // Auto-restart matrix rain if it's currently running
        if (window.MatrixRain && document.getElementById('matrix-rain').children.length > 0) {
            window.MatrixRain.start();
        }
    },
    
    // Quick presets for matrix rain
    matrixPresets: {
        performance: {
            columns: { density: { desktop: 0.7, mobile: 0.4 } },
            timing: { 
                desktop: { minDuration: 10000, maxDuration: 15000 },
                mobile: { minDuration: 8000, maxDuration: 12000 }
            }
        },
        
        cinematic: {
            columns: { density: { desktop: 1.2, mobile: 0.8 } },
            timing: { 
                desktop: { minDuration: 6000, maxDuration: 12000 },
                mobile: { minDuration: 5000, maxDuration: 10000 }
            }
        },
        
        minimal: {
            columns: { density: { desktop: 0.5, mobile: 0.3 } },
            timing: { 
                desktop: { minDuration: 15000, maxDuration: 25000 },
                mobile: { minDuration: 12000, maxDuration: 18000 }
            }
        }
    },
    
    // Apply matrix rain preset
    applyMatrixPreset: function(presetName) {
        if (this.matrixPresets[presetName]) {
            this.setMatrixRain(this.matrixPresets[presetName]);
            if (this.debugMode) console.log(`Applied matrix rain preset: ${presetName}`);
        } else {
            console.warn(`Matrix rain preset '${presetName}' not found`);
        }
    },

    // Quick override for testing
    set: function(newSettings) {
        Object.assign(this, newSettings);
        
        if (this.debugMode) console.log('Config updated:', newSettings);
        if (this.debugMode) console.log('Note: Call ScanLineManager.init() to apply scan line changes');
    }
};

// Make Config globally available
window.Config = Config;

// Export for ES6 modules
export default Config; 