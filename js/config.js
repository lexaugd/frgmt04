// js/config.js - Minimal performance configuration
const Config = {
    // Master switches
    enableOptimizations: true,
    debugMode: false,  // Enable debug mode to see what's happening
    productionMode: window.location.protocol === 'https:', // Auto-detect production vs local
    enableServiceWorker: false, // Dedicated toggle for service worker (disabled due to caching issues)
    
    // Enhanced mobile detection for better interaction handling
    isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    isTablet: /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1023,
    isLowEndDevice: navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2,
    
    // New granular device detection
    deviceType: (() => {
        const ua = navigator.userAgent;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const width = window.innerWidth;
        
        if (/iPhone|iPod/i.test(ua)) return 'mobile-ios';
        if (/iPad/i.test(ua)) return 'tablet-ios';
        if (/Android/i.test(ua) && width < 768) return 'mobile-android';
        if (/Android/i.test(ua) && width >= 768) return 'tablet-android';
        if (hasTouch && width < 768) return 'mobile-touch';
        if (hasTouch && width >= 768 && width <= 1023) return 'tablet-touch';
        return 'desktop';
    })(),
    
    // Touch-primary detection (devices where touch is the primary input)
    isTouchPrimary: (() => {
        return navigator.maxTouchPoints > 0 && window.innerWidth < 1024;
    })(),
    
    // Mobile interaction configuration
    mobileInteraction: {
        // Touch feedback settings
        enableTouchFeedback: true,
        enableHapticFeedback: 'vibrate' in navigator,
        touchFeedbackDuration: 150,
        hapticPattern: [10], // Short vibration
        
        // Touch target optimization
        minTouchTarget: 44, // Minimum 44px for accessibility
        touchTargetPadding: 8,
        
        // Visual feedback
        enableRippleEffect: true,
        rippleDuration: 600,
        rippleColor: 'rgba(107, 229, 226, 0.3)',
        
        // Performance settings
        usePassiveListeners: true,
        debounceTouch: 50,
        
        // Card interaction modes
        imageCardMode: 'tap-preview', // 'tap-preview' | 'swipe-nav' | 'disabled'
        fragmentCardMode: 'enhanced-buttons', // 'enhanced-buttons' | 'swipe-gestures' | 'hybrid'
        
        // Animation preferences for mobile
        reducedAnimations: false, // Will be set based on device performance
        fastTransitions: true
    },
    
    // Essential settings
    glitchSpeed: 100,          // milliseconds between glitches
    animationQuality: 1.0,     // 0.5 = half speed, 1.0 = full speed
    enableEffects: true,       // master switch for all effects
    
    // Text corruption timing
    corruptionCooldown: 10000,  // milliseconds between text corruption events
    corruptionDuration: 1300,  // how long each corruption lasts
    corruptionChance: 0.3,     // chance (0.0-1.0) that text will corrupt when triggered
    
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
    
    // Scanning lines configuration
    scanLines: {
        enableScanLines: true,           // master switch for all scan lines
        
        // Large scan lines
        large: {
            count: 1,                    // number of large scan lines
            height: 2,                   // height in pixels
            speed: 5000,                 // animation duration in milliseconds
            opacity: 0.1,                // opacity (0.0-1.0)
            color: 'rgba(255, 255, 255, 0.3)', // color of the scan line
            glowSize: 20,                // glow/shadow size in pixels
            enable: true                 // enable/disable large scan lines
        },
        
        // Small scan lines  
        small: {
            count: 1,                    // number of small scan lines
            height: 2,                   // height in pixels
            speed: 3900,                 // animation duration in milliseconds (1.3 * large speed)
            opacity: 0.6,                // opacity (0.0-1.0)
            color: 'rgba(255, 255, 255, 0.15)', // color of the scan line
            glowSize: 10,                // glow/shadow size in pixels
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
    
    // Cursor possession system settings
    cursorPossession: {
        enable: true,                    // master switch for cursor possession
        idleThreshold: 8000,             // 3 seconds of inactivity before possession starts (reduced for testing)
        possessionCooldown: 8000,        // 8 seconds between possessions (reduced for testing)
        typingSpeed: {
            min: 150,                    // faster typing for testing
            max: 300
        },
        messageDuration: 3000,           // longer message duration
        erraticMovementDuration: 3000,   // shorter movement phase
        debug: true                      // show debug messages for possession events
    },
    
    // Auto-detect performance level and adjust settings
    detectPerformanceLevel() {
        const isMobile = this.isMobile;
        const isTablet = this.isTablet;
        const isLowEnd = this.isLowEndDevice;
        const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (hasReducedMotion || isLowEnd) {
            return 'MINIMAL';
        } else if (isMobile && !isTablet) {
            return 'MOBILE';
        } else if (isTablet) {
            return 'TABLET';
        } else {
            return 'DESKTOP';
        }
    },
    
    // Apply performance-based settings
    applyPerformanceSettings() {
        const level = this.detectPerformanceLevel();
        
        switch (level) {
            case 'MINIMAL':
                this.enableEffects = false;
                this.scanLines.enableScanLines = false;
                this.animationQuality = 0;
                this.glitchSpeed = 1000; // Much slower
                this.corruptionCooldown = 30000; // Much less frequent
                this.fragmentAnimationDuration = 150; // Faster
                break;
                
            case 'MOBILE':
                this.scanLines.enableScanLines = false; // Disable scan lines on mobile
                this.animationQuality = 0.5;
                this.glitchSpeed = 200;
                this.corruptionCooldown = 15000;
                this.fragmentAnimationDuration = 200;
                this.scanLines.large.enable = false;
                this.scanLines.small.enable = false;
                break;
                
            case 'TABLET':
                this.animationQuality = 0.7;
                this.glitchSpeed = 150;
                this.scanLines.large.opacity = 0.05;
                this.scanLines.small.enable = false;
                this.scanLines.large.speed = 8000; // Slower
                break;
                
            case 'DESKTOP':
                // Keep full quality
                break;
        }
        
        if (this.debugMode) {
            console.log(`Performance level: ${level}`);
            console.log('Applied settings:', {
                enableEffects: this.enableEffects,
                scanLines: this.scanLines.enableScanLines,
                animationQuality: this.animationQuality
            });
        }
    },
    
    // Simple quality presets
    quality: {
        HIGH: { 
            glitchSpeed: 100, 
            animationQuality: 1.0, 
            enableEffects: true, 
            corruptionCooldown: 8000,
            fragmentAnimationDuration: 300,
            scanLines: {
                enableScanLines: true,
                large: { count: 2, speed: 2500, enable: true },
                small: { count: 2, speed: 3200, enable: true },
                corrupted: { count: 1, enable: true }
            },
            cursorPossession: {
                enable: true,
                idleThreshold: 5000,
                possessionCooldown: 15000,
                debug: false
            }
        },
        LOW: { 
            glitchSpeed: 200, 
            animationQuality: 0.5, 
            enableEffects: true, 
            corruptionCooldown: 8000,
            fragmentAnimationDuration: 600,
            scanLines: {
                enableScanLines: true,
                large: { count: 1, speed: 4000, enable: true },
                small: { count: 0, enable: false },
                corrupted: { count: 0, enable: false }
            },
            cursorPossession: {
                enable: true,
                idleThreshold: 8000,
                possessionCooldown: 20000,
                debug: false
            }
        },
        // Test preset with fast timers for validation
        TEST: {
            glitchSpeed: 50,
            animationQuality: 1.0,
            enableEffects: true,
            cursorPossession: {
                enable: true,
                idleThreshold: 2000,      // 2 seconds idle
                possessionCooldown: 3000, // 3 seconds cooldown
                typingSpeed: { min: 50, max: 100 }, // fast typing
                messageDuration: 1000,    // 1 second message
                debug: true               // show debug messages
            }
        }
    },
    
    // Quick override for testing
    set: function(newSettings) {
        const hadScanLineChanges = newSettings.scanLines || 
                                  (newSettings.enableEffects !== undefined) ||
                                  (newSettings.quality && (newSettings.quality.HIGH || newSettings.quality.LOW));
        
        Object.assign(this, newSettings);
        
        // Update scan lines if configuration changed
        if (hadScanLineChanges && typeof updateScanLines === 'function') {
            updateScanLines();
        }
        
        if (this.debugMode) console.log('Config updated:', newSettings);
    }
};

// Auto-apply performance settings on load
Config.applyPerformanceSettings(); 