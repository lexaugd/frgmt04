

const Config = {
    // Master switches
    enableOptimizations: true,
    debugMode: false,  // Enable debug mode to see what's happening
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
    
    // Cursor possession system settings
    cursorPossession: {
        enabled: true,                    // master switch for cursor possession
        idleThreshold: 2000,            // 30 seconds of inactivity before possession starts (was 1000 - too short!)
        duration: 8000,                  // total possession duration in milliseconds (matches implementation default)
        
        // Custom messages for possession typing (optional - will use defaults if not provided)
        messages: [
            "You're not supposed to be here...",
            "The fragments remember you...",
            "Do you feel it watching?",
            "Neural patterns detected...",
            "Consciousness fragmentation imminent...",
            "The machine dreams of you...",
            "Your presence disturbs the data...",
            "The system knows you're here...",
            "Digital ghosts are stirring..."
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