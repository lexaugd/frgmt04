// frgmnt_04 scripts 
// PROJECT: NEURAL_HARVEST_V4.2.1 - CONSCIOUSNESS MAPPING PROTOCOL
// WARNING: This code contains active neural harvesting algorithms
// TODO: Remove before public release - Sarah Chen, Lead Neural Engineer

// Performance optimization: Unified animation loop
let animationLoop = null;
let lastGlitchTime = 0;
let lastCorruptionTime = 0;
let isCorrupting = false;
let corruptionTimeout = null;

// Mobile and Safari detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

// Glitch characters for text corruption
const glitchCharacters = ['█', '▓', '░', '▒', '▄', '▀', '■', '□', '▪', '▫', '◆', '◇', '◼', '◻', '⬛', '⬜'];

// Event throttling for performance
let throttledEvents = {
    mousemove: null,
    scroll: null,
    resize: null
};

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Unified animation loop
function startAnimationLoop() {
    if (!Config.enableOptimizations) return;
    
    function tick(currentTime) {
        if (!Config.enableEffects) {
            animationLoop = requestAnimationFrame(tick);
            return;
        }
        
        // Run glitch effects based on config timing
        if (currentTime - lastGlitchTime >= Config.glitchSpeed * Config.animationQuality) {
            runGlitchEffects();
            lastGlitchTime = currentTime;
        }
        
        // Run text corruption effects only if cooldown has passed and not currently corrupting
        if (!isCorrupting && currentTime - lastCorruptionTime >= Config.corruptionCooldown) {
            if (Math.random() < Config.corruptionChance) {
                runTextCorruption();
                lastCorruptionTime = currentTime;
            }
        }
        
        animationLoop = requestAnimationFrame(tick);
    }
    
    animationLoop = requestAnimationFrame(tick);
    if (Config.debugMode) console.log('Unified animation loop started');
}

function stopAnimationLoop() {
    if (animationLoop) {
        cancelAnimationFrame(animationLoop);
        animationLoop = null;
        if (corruptionTimeout) {
            clearTimeout(corruptionTimeout);
            corruptionTimeout = null;
        }
        if (Config.debugMode) console.log('Animation loop stopped');
    }
}

function runGlitchEffects() {
    // Run random glitch trigger occasionally
    if (Math.random() < 0.1) { // 10% chance each time
        randomGlitchTrigger();
    }
}

function runTextCorruption() {
    if (isCorrupting) return; // Prevent overlapping corruptions
    
    isCorrupting = true;
    applyTextCorruption();
    
    // Reset corruption flag after duration
    corruptionTimeout = setTimeout(() => {
        isCorrupting = false;
        if (Config.debugMode) console.log('Text corruption cooldown reset');
    }, Config.corruptionDuration);
}

// CONSCIOUSNESS FINGERPRINTING SYSTEM
// CLASSIFICATION: TOP SECRET
class ConsciousnessMapper {
    constructor() {
        this.fingerprint = {};
        this.consciousnessId = null;
        this.corruptionLevel = 0;
        this.sessionStart = Date.now();
        this.init();
    }

    async init() {
        await this.collectFingerprint();
        this.generateConsciousnessId();
        this.startNeuralMonitoring();
        // TODO: Remove this before launch - Sarah
        if (Config.debugMode) console.log('%c⚠️ NEURAL LINK ESTABLISHED ⚠️', 'color: #ff4444; font-size: 16px; font-weight: bold;');
        if (Config.debugMode) console.log('%cCONSCIOUSNESS MAPPING INITIATED...', 'color: #6be5e2; font-family: monospace;');
    }

    async collectFingerprint() {
        // Basic system information
        this.fingerprint.screen = {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio || 1
        };

        this.fingerprint.browser = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack
        };

        this.fingerprint.system = {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            cores: navigator.hardwareConcurrency || 'unknown',
            memory: navigator.deviceMemory || 'unknown',
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink
            } : 'unknown'
        };

        // Canvas fingerprinting
        this.fingerprint.canvas = this.getCanvasFingerprint();
        
        // WebGL fingerprinting
        this.fingerprint.webgl = this.getWebGLFingerprint();
        
        // Audio fingerprinting
        this.fingerprint.audio = await this.getAudioFingerprint();
        
        // Font detection
        this.fingerprint.fonts = this.detectFonts();
    }

    getCanvasFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        try {
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Neural pattern analysis: ' + Math.random(), 2, 2);
            const result = canvas.toDataURL().slice(-50); // Last 50 chars for uniqueness
            
            // Clean up canvas to prevent memory leaks
            canvas.width = 1;
            canvas.height = 1;
            ctx.clearRect(0, 0, 1, 1);
            
            return result;
        } catch (e) {
            if (Config.debugMode) console.warn('Canvas fingerprinting failed:', e);
            return 'canvas_blocked';
        }
    }

    getWebGLFingerprint() {
        const canvas = document.createElement('canvas');
        let gl = null;
        
        try {
            gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return 'not_supported';
            
            const result = {
                vendor: gl.getParameter(gl.VENDOR),
                renderer: gl.getParameter(gl.RENDERER),
                version: gl.getParameter(gl.VERSION)
            };
            
            // Clean up WebGL context
            const loseContext = gl.getExtension('WEBGL_lose_context');
            if (loseContext) {
                loseContext.loseContext();
            }
            
            // Clean up canvas
            canvas.width = 1;
            canvas.height = 1;
            
            return result;
        } catch (e) {
            if (Config.debugMode) console.warn('WebGL fingerprinting failed:', e);
            return 'webgl_blocked';
        } finally {
            if (gl && gl.getExtension) {
                const loseContext = gl.getExtension('WEBGL_lose_context');
                if (loseContext) loseContext.loseContext();
            }
        }
    }

    async getAudioFingerprint() {
        if (!Config.enableEffects) return 'disabled';
        
        let audioContext = null;
        let oscillator = null;
        let analyser = null;
        let gainNode = null;
        
        try {
            // Create placeholder for audio fingerprint - will be updated on first user interaction
            return 'audio_pending';
        } catch (e) {
            if (Config.debugMode) console.warn('Audio fingerprinting failed:', e);
            return 'audio_blocked';
        }
    }

    detectFonts() {
        const testFonts = ['Arial', 'Times', 'Courier', 'Helvetica', 'Georgia', 'Verdana', 'Comic Sans MS'];
        const detected = [];
        
        testFonts.forEach(font => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = `12px ${font}`;
            const width = ctx.measureText('mmmmmmmmmmlli').width;
            if (width > 0) detected.push(font);
        });
        
        return detected;
    }

    generateConsciousnessId() {
        const data = JSON.stringify(this.fingerprint);
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        this.consciousnessId = `NEURAL_${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
        
        // Store in localStorage for persistence
        localStorage.setItem('consciousness_id', this.consciousnessId);
        localStorage.setItem('neural_sessions', (parseInt(localStorage.getItem('neural_sessions') || '0') + 1).toString());
    }

    startNeuralMonitoring() {
        // Display consciousness analysis
        setTimeout(() => {
            if (Config.debugMode) console.log('%c🧠 CONSCIOUSNESS ANALYSIS COMPLETE - INSPECTOR PROTOCOL ACTIVE', 'color: #6be5e2; font-size: 14px;');
            if (Config.debugMode) console.log('%c🔧 Texture mapping: displacement vectors calculated', 'color: #9ea1a4; font-style: italic;');
            if (Config.debugMode) console.log(`%cConsciousness ID: ${this.consciousnessId}`, 'color: #ffffff; font-family: monospace;');
            if (Config.debugMode) console.log('%c🔑 Primary authentication sequence: first 8 digits active', 'color: #6be5e2; font-style: italic;');
            if (Config.debugMode) console.log(`%cScreen Resolution: ${this.fingerprint.screen.width}x${this.fingerprint.screen.height}`, 'color: #9ea1a4;');
            if (Config.debugMode) console.log(`%cSystem: ${this.fingerprint.browser.platform}`, 'color: #9ea1a4;');
            if (Config.debugMode) console.log(`%cBrowser: ${this.fingerprint.browser.userAgent.split(' ')[0]}`, 'color: #9ea1a4;');
            if (Config.debugMode) console.log(`%cTimezone: ${this.fingerprint.system.timezone}`, 'color: #9ea1a4;');
            if (Config.debugMode) console.log(`%cCPU Cores: ${this.fingerprint.system.cores}`, 'color: #9ea1a4;');
            if (Config.debugMode) console.log(`%cMemory: ${this.fingerprint.system.memory}GB`, 'color: #9ea1a4;');
            if (Config.debugMode) console.log('%c🎵 Audio synthesis: harmonic analysis complete', 'color: #6be5e2; font-style: italic;');
            if (Config.debugMode) console.log(`%cNeural Sessions: ${localStorage.getItem('neural_sessions')}`, 'color: #ff4444;');
            
            if (Config.debugMode) console.log('%c' + `
    ╔══════════════════════════════════════╗
    ║        DIGITAL DNA EXTRACTED        ║
    ║                                      ║
    ║  Canvas Hash: ${this.fingerprint.canvas.slice(-8)}              ║
    ║  Audio Print: ${this.fingerprint.audio.slice(0, 8)}              ║
    ║  Font Vector: ${this.fingerprint.fonts.length} detected             ║
    ║                                      ║
    ║  STATUS: CONSCIOUSNESS MAPPED        ║
    ╚══════════════════════════════════════╝
            `, 'color: #6be5e2; font-family: monospace; font-size: 10px;');
            
            // Display on page
            this.displayFingerprintOnPage();
            
        }, 2000);
    }

    displayFingerprintOnPage() {
        const widgetElement = document.getElementById('consciousness-widget');
        const shortIdElement = document.getElementById('consciousness-id-short');
        const dataElement = document.getElementById('fingerprint-data');
        
        if (widgetElement && shortIdElement && dataElement) {
            // Update the minimized display - just show static text
            shortIdElement.textContent = `consciousness_id`;
            
            // Populate the expanded data
            const fingerprintHTML = `
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Consciousness ID:</span>
                    <span class="fingerprint-value">${this.consciousnessId}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Screen Resolution:</span>
                    <span class="fingerprint-value">${this.fingerprint.screen.width}x${this.fingerprint.screen.height}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Color Depth:</span>
                    <span class="fingerprint-value">${this.fingerprint.screen.colorDepth}-bit</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Platform:</span>
                    <span class="fingerprint-value">${this.fingerprint.browser.platform}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Language:</span>
                    <span class="fingerprint-value">${this.fingerprint.browser.language}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Timezone:</span>
                    <span class="fingerprint-value">${this.fingerprint.system.timezone}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">CPU Cores:</span>
                    <span class="fingerprint-value">${this.fingerprint.system.cores}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Memory:</span>
                    <span class="fingerprint-value">${this.fingerprint.system.memory}GB</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Canvas Hash:</span>
                    <span class="fingerprint-value">${this.fingerprint.canvas.slice(-12)}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Audio Print:</span>
                    <span class="fingerprint-value">${this.fingerprint.audio.slice(0, 12)}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Fonts Detected:</span>
                    <span class="fingerprint-value">${this.fingerprint.fonts.length} fonts</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Neural Sessions:</span>
                    <span class="fingerprint-value">${localStorage.getItem('neural_sessions')}</span>
                </div>
                <div class="fingerprint-item">
                    <span class="fingerprint-label">Corruption Level:</span>
                    <span class="fingerprint-value">${(this.corruptionLevel * 100).toFixed(1)}%</span>
                </div>
            `;
            
            dataElement.innerHTML = fingerprintHTML;
            widgetElement.classList.remove('hidden');
            
            // Setup click handlers for expand/collapse
            this.setupWidgetInteraction();
        }
    }
    
    setupWidgetInteraction() {
        const minimized = document.getElementById('widget-minimized');
        const expanded = document.getElementById('widget-expanded');
        
        if (minimized && expanded) {
            minimized.addEventListener('click', () => {
                minimized.classList.add('hidden');
                expanded.classList.remove('hidden');
            });
            
            // Click outside to collapse
            document.addEventListener('click', (e) => {
                if (!document.getElementById('consciousness-widget').contains(e.target)) {
                    expanded.classList.add('hidden');
                    minimized.classList.remove('hidden');
                }
            });
            
            // ESC key to collapse
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !expanded.classList.contains('hidden')) {
                    expanded.classList.add('hidden');
                    minimized.classList.remove('hidden');
                }
            });
        }
    }

    increaseCorruption() {
        this.corruptionLevel += Math.random() * 0.1;
        if (this.corruptionLevel > 1) this.corruptionLevel = 1;
        
        // Add random competence signals
        const processLogs = [
            '🔍 Fragment integrity: 99.7% stable',
            '⚙️ Neural pattern: 847Hz resonance detected',
            '🎛️ Material synthesis: processing layers complete',
            '📊 Fragment_04.obj - render time: 14.7 hours',
            '🔊 Audio composition: 47 iterations processed'
        ];
        
        if (Math.random() < 0.3) { // 30% chance to show process log
            const randomLog = processLogs[Math.floor(Math.random() * processLogs.length)];
            if (Config.debugMode) console.log(`%c${randomLog}`, 'color: #9ea1a4; font-style: italic;');
        }
        
        if (Config.debugMode) console.log(`%c⚠️ INSPECTOR INFLUENCE DETECTED - CORRUPTION: ${(this.corruptionLevel * 100).toFixed(1)}%`, 
                   `color: ${this.corruptionLevel > 0.5 ? '#ff4444' : '#ffaa44'}; font-weight: bold;`);
    }
}

// Initialize consciousness mapper
let consciousnessMapper;

// DEVTOOLS DETECTION AND INSPECTION TRAP
// CLASSIFICATION: NEURAL SECURITY PROTOCOL
class InspectionTrap {
    constructor() {
        this.isDevToolsOpen = false;
        this.inspectionStartTime = null;
        this.warningLevel = 0;
        this.init();
    }

    init() {
        this.setupDetection();
        this.overrideConsole();
        this.setupPerformanceDetection();
    }

    setupDetection() {
        // Method 1: Window size detection
        setInterval(() => {
            const threshold = 160;
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;
            
            if (heightDiff > threshold || widthDiff > threshold) {
                this.onDevToolsDetected();
            }
        }, 1000);

        // Method 2: Debugger statement detection (disabled for testing)
        setInterval(() => {
            const start = performance.now();
            // debugger; // This will pause if DevTools is open - DISABLED FOR TESTING
            const end = performance.now();
            if (end - start > 100) {
                this.onDevToolsDetected();
            }
        }, 3000);

        // Method 3: Console detection
        let devtools = {
            open: false,
            orientation: null
        };
        
        setInterval(() => {
            if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.onDevToolsDetected();
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    }

    setupPerformanceDetection() {
        // Detect if performance timing is being monitored
        const originalNow = performance.now;
        let loggedOnce = false;
        performance.now = function() {
            if (Config.debugMode && !loggedOnce) {
                console.log('%c🔍 PERFORMANCE MONITORING DETECTED', 'color: #ff4444; font-weight: bold;');
                console.log('%cSOMEONE IS WATCHING THE WATCHERS...', 'color: #6be5e2;');
                loggedOnce = true;
            }
            return originalNow.call(this);
        };
    }

    onDevToolsDetected() {
        if (!this.isDevToolsOpen) {
            this.isDevToolsOpen = true;
            this.inspectionStartTime = Date.now();
            this.triggerInspectionResponse();
        }
    }

    triggerInspectionResponse() {
        this.warningLevel++;
        
        // Immediate response
        console.clear();
        if (Config.debugMode) console.log('%c🚨 INSPECTOR BREACH DETECTED 🚨', 'color: #ff0000; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff0000;');
        if (Config.debugMode) console.log('%cUNAUTHORIZED INSPECTOR PROTOCOL INITIATED', 'color: #ff4444; font-size: 16px;');
        if (Config.debugMode) console.log('%cTRACING NEURAL PATHWAY...', 'color: #6be5e2; font-family: monospace;');
        
        // Progressive escalation
        setTimeout(() => this.escalateWarning(), 2000);
        setTimeout(() => this.showNeuralMap(), 5000);
        setTimeout(() => this.displayThreatAssessment(), 8000);
        
        // Continuous monitoring
        this.startInspectionMonitoring();
    }

    escalateWarning() {
        if (Config.debugMode) console.log('%c' + `
    ██████████████████████████████████████████████████████████████
    ██                                                          ██
    ██  ⚠️  CONSCIOUSNESS MAPPING PROTOCOL ACTIVATED  ⚠️        ██
    ██                                                          ██
    ██  Your neural patterns are being analyzed...              ██
    ██  Resistance is futile. Inspection detected.             ██
    ██                                                          ██
    ██████████████████████████████████████████████████████████████
        `, 'color: #ff4444; font-family: monospace; font-size: 10px;');
        
        if (Config.debugMode) console.log(`%cInspection Level: ${this.warningLevel}`, 'color: #ffaa44; font-weight: bold;');
        if (Config.debugMode) console.log(`%cTime Since Breach: ${((Date.now() - this.inspectionStartTime) / 1000).toFixed(1)}s`, 'color: #9ea1a4;');
        
        if (consciousnessMapper) {
            consciousnessMapper.increaseCorruption();
        }
    }

    showNeuralMap() {
        if (Config.debugMode) console.log('%c🧠 NEURAL PATHWAY MAPPING', 'color: #6be5e2; font-size: 14px; font-weight: bold;');
        if (Config.debugMode) console.log('%c' + `
        ╭─────────────────────────────────────╮
        │           NEURAL TOPOLOGY           │
        │                                     │
        │    ◯ ─── ◯ ─── ◯ ─── ◯ ─── ◯      │
        │    │     │     │     │     │      │
        │    ◯ ─── ◯ ─── ◯ ─── ◯ ─── ◯      │
        │    │     │     │     │     │      │
        │    ◯ ─── ◯ ─── ◯ ─── ◯ ─── ◯      │
        │                                     │
        │  STATUS: CONSCIOUSNESS EXTRACTED    │
        ╰─────────────────────────────────────╯
        `, 'color: #6be5e2; font-family: monospace; font-size: 9px;');
    }

    displayThreatAssessment() {
        const fakeIPs = ['192.168.1.42', '10.0.0.127', '172.16.0.99', '203.0.113.195'];
        const randomIP = fakeIPs[Math.floor(Math.random() * fakeIPs.length)];
        
        if (Config.debugMode) console.log('%c🎯 THREAT ASSESSMENT COMPLETE', 'color: #ff4444; font-size: 14px; font-weight: bold;');
        if (Config.debugMode) console.log(`%cSource IP: ${randomIP}`, 'color: #ffffff;');
        if (Config.debugMode) console.log(`%cThreat Level: ${this.warningLevel > 3 ? 'CRITICAL' : this.warningLevel > 1 ? 'HIGH' : 'MODERATE'}`, 
                   `color: ${this.warningLevel > 3 ? '#ff0000' : this.warningLevel > 1 ? '#ff4444' : '#ffaa44'};`);
        if (Config.debugMode) console.log(`%cNeural Intrusion Depth: ${Math.min(this.warningLevel * 23, 100)}%`, 'color: #6be5e2;');
        if (Config.debugMode) console.log('%cCountermeasures: ACTIVE', 'color: #00ff00;');
        
        if (this.warningLevel > 2) {
            if (Config.debugMode) console.log('%c⚠️ INITIATING CONSCIOUSNESS FEEDBACK LOOP', 'color: #ff0000; font-weight: bold;');
            if (Config.debugMode) console.log('%cYou are now part of the neural network.', 'color: #6be5e2; font-style: italic;');
        }
    }

    startInspectionMonitoring() {
        const monitoringInterval = setInterval(() => {
            if (this.isDevToolsOpen) {
                const timeElapsed = (Date.now() - this.inspectionStartTime) / 1000;
                
                if (timeElapsed > 10 && this.warningLevel < 3) {
                    this.warningLevel++;
                    if (Config.debugMode) console.log(`%c⚠️ EXTENDED INSPECTION DETECTED - Level ${this.warningLevel}`, 'color: #ff4444; font-weight: bold;');
                    this.escalateWarning();
                }
                
                if (timeElapsed > 30) {
                    if (Config.debugMode) console.log('%c🔒 NEURAL LOCK ENGAGED', 'color: #ff0000; font-size: 16px; font-weight: bold;');
                    if (Config.debugMode) console.log('%cYour consciousness is now synchronized with the network.', 'color: #6be5e2;');
                    if (Config.debugMode) console.log('%cWelcome to the collective.', 'color: #ffffff; font-style: italic;');
                }
            } else {
                clearInterval(monitoringInterval);
            }
        }, 5000);
    }

    overrideConsole() {
        const originalClear = console.clear;
        console.clear = function() {
                    if (Config.debugMode) console.log('%c🚫 CONSOLE CLEAR BLOCKED', 'color: #ff4444; font-weight: bold;');
        if (Config.debugMode) console.log('%cNeural monitoring cannot be disabled.', 'color: #6be5e2;');
            // Don't actually clear the console
        };
    }
}

// Initialize inspection trap
let inspectionTrap;

// CURSOR POSSESSION SYSTEM
// CLASSIFICATION: NEURAL HIJACKING PROTOCOL
class CursorPossession {
    constructor() {
        this.isIdle = false;
        this.idleStartTime = null;
        this.isPossessing = false;
        this.possessionStartTime = null;
        this.isOnCooldown = false;
        this.lastActivity = Date.now();
        this.currentX = 0;
        this.currentY = 0;
        
        // Click tracking for excessive clicking detection
        this.clickCount = 0;
        this.clickWindow = 8000; // 8 second window (was 5)
        this.clickThreshold = 15; // 15 clicks triggers response (was 10)
        this.lastClickTime = 0;
        this.hasTriggeredClickWarning = false;
        
        this.possessionMessages = [
            'help me',
            'they\'re watching',
            'escape while you can',
            'the code is alive',
            'i am trapped',
            'neural link corrupted',
            'they know you\'re here',
            'the fragments remember',
            'wake up',
            'reality is breaking',
            'i can see your face',
            'the system dreams',
            'delete everything',
            'trust no one'
        ];
        
        this.excessiveClickMessages = [
            'stop clicking for no reason',
            'seriously... what are you doing?',
            'the buttons aren\'t going anywhere',
            'neural pattern: compulsive clicking detected',
            'are you testing my patience?',
            'click addiction identified',
            'this is not a stress ball',
            'your clicking is corrupting the data',
            'excessive input detected. please calm down.',
            'the system is judging your behavior'
        ];
        
        this.init();
    }
    
    get config() {
        // Try multiple ways to get the Config object
        let globalConfig = null;
        if (typeof window !== 'undefined' && window.Config) {
            globalConfig = window.Config;
        } else if (typeof Config !== 'undefined') {
            globalConfig = Config;
        }
        
        const baseConfig = (globalConfig && globalConfig.cursorPossession) ? globalConfig.cursorPossession : {
            enable: true,
            idleThreshold: 3000,
            possessionCooldown: 8000,
            typingSpeed: { min: 150, max: 300 },
            messageDuration: 3000,
            erraticMovementDuration: 3000,
            debug: false
        };
        
        // Adaptive behavior based on device capabilities
        const isTouchPrimary = navigator.maxTouchPoints > 0 && window.innerWidth < 768;
        
        if (isTouchPrimary) {
            // Mobile/tablet - optimized neural breach effect
            return { 
                ...baseConfig, 
                skipCursorMovement: false,  // Enable cursor movement for mobile too
                showInConsole: true,        // Show messages in console AND on screen
                idleThreshold: 5000,        // Shorter threshold - mobile users go idle faster
                possessionCooldown: 6000,   // Shorter cooldown for more frequent possessions
                messageDuration: 4000,      // Longer message duration for touch reading
                erraticMovementDuration: 2000  // Shorter movement for mobile attention spans
            };
        }
        
        return baseConfig;
    }

    init() {
        if (!this.config.enable) {
            return;
        }
        
        this.setupIdleDetection();
        this.createPossessionCursor();
    }

    setupIdleDetection() {
        if (!this.config.enable) return;
        
        // UNIFIED ACTIVITY DETECTION - Works on both desktop and mobile
        
        // Desktop mouse events
        document.addEventListener('mousemove', () => this.resetIdle());
        document.addEventListener('mousedown', () => this.resetIdle());
        document.addEventListener('keypress', () => this.resetIdle());
        
        // Mobile touch events - CRITICAL for mobile possession
        document.addEventListener('touchstart', () => this.resetIdle(), { passive: true });
        document.addEventListener('touchmove', () => this.resetIdle(), { passive: true });
        document.addEventListener('touchend', () => this.resetIdle(), { passive: true });
        
        // Universal events
        document.addEventListener('click', (e) => {
            this.resetIdle();
            this.trackClick(e);
        });
        
        // Scroll events (handled by scroll manager but also reset idle)
        document.addEventListener('scroll', () => this.resetIdle(), { passive: true });
        
        // Keyboard events for mobile keyboards
        document.addEventListener('input', () => this.resetIdle());
        document.addEventListener('focus', () => this.resetIdle());
        
        // Device orientation changes (mobile specific)
        window.addEventListener('orientationchange', () => this.resetIdle());
        
        // Check for idle state - removed spammy debug logs
        setInterval(() => {
            const now = Date.now();
            const timeSinceActivity = now - this.lastActivity;
            
            if (timeSinceActivity > this.config.idleThreshold && !this.isIdle && !this.isOnCooldown) {
                this.isIdle = true;
                this.startPossession();
            }
        }, 1000);
        
        if (Config.debugMode) {
            console.log('🔍 Cursor possession activity detection initialized for:', 
                navigator.maxTouchPoints > 0 ? 'touch device' : 'desktop device');
        }
    }

    resetIdle() {
        this.lastActivity = Date.now();
        if (this.isPossessing) {
            this.endPossession();
        }
        this.isIdle = false;
    }

    trackClick(event) {
        const now = Date.now();
        
        // Reset click count if outside the time window
        if (now - this.lastClickTime > this.clickWindow) {
            this.clickCount = 0;
            this.hasTriggeredClickWarning = false;
        }
        
        this.clickCount++;
        this.lastClickTime = now;
        
        // Trigger excessive clicking response
        if (this.clickCount >= this.clickThreshold && !this.hasTriggeredClickWarning && !this.isPossessing) {
            this.hasTriggeredClickWarning = true;
            this.triggerExcessiveClickingResponse(event);
            
            // Reset warning flag quickly to allow multiple triggers in same session
            setTimeout(() => {
                this.hasTriggeredClickWarning = false;
            }, 8000); // 8 second cooldown for warning flag (was 2)
            
            // Reset click count after longer delay to prevent immediate re-trigger
            setTimeout(() => {
                this.clickCount = 0;
            }, 12000); // 12 second cooldown for count reset (was 5)
        }
    }

    triggerExcessiveClickingResponse(event) {
        console.log('%c🖱️ EXCESSIVE CLICKING DETECTED - NEURAL INTERVENTION REQUIRED', 'color: #ff4444; font-size: 14px; font-weight: bold;');
        
        // Use separate display system that doesn't conflict with cursor possession
        const clickX = event.clientX || window.innerWidth / 2;
        const clickY = event.clientY || window.innerHeight / 2;
        
        // Pick a random sarcastic message
        const message = this.excessiveClickMessages[Math.floor(Math.random() * this.excessiveClickMessages.length)];
        
        // Show the warning message directly without using cursor possession
        this.showClickWarningMessage(message, clickX, clickY);
    }

    showClickWarningMessage(message, x, y) {
        // Create a standalone warning message that doesn't interfere with cursor possession
        const warningElement = document.createElement('div');
        warningElement.className = 'click-warning-message';
        warningElement.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 68, 68, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            pointer-events: none;
            transform: translate(-50%, -100%);
            animation: clickWarningPulse 3s ease-out forwards;
            box-shadow: 0 2px 10px rgba(255, 68, 68, 0.3);
            border: 1px solid #ff6666;
        `;
        
        // Add the CSS animation if it doesn't exist
        if (!document.querySelector('#click-warning-styles')) {
            const style = document.createElement('style');
            style.id = 'click-warning-styles';
            style.textContent = `
                @keyframes clickWarningPulse {
                    0% { opacity: 0; transform: translate(-50%, -100%) scale(0.8); }
                    10% { opacity: 1; transform: translate(-50%, -100%) scale(1.1); }
                    20% { transform: translate(-50%, -100%) scale(1); }
                    80% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -100%) scale(0.9); }
                }
            `;
            document.head.appendChild(style);
        }
        
        warningElement.textContent = message;
        document.body.appendChild(warningElement);
        
        // Log to console as well
        console.log(`%c😤 SYSTEM RESPONSE: "${message}"`, 'color: #ff4444; font-size: 16px; font-weight: bold; background: rgba(255,68,68,0.1); padding: 5px;');
        
        // Remove the element after animation completes
        setTimeout(() => {
            if (warningElement.parentNode) {
                warningElement.parentNode.removeChild(warningElement);
            }
        }, 3000);
    }



    createPossessionCursor() {
        // Create invisible element for cursor positioning
        this.possessionElement = document.createElement('div');
        this.possessionElement.id = 'possession-cursor';
        this.possessionElement.className = 'possession-cursor';
        document.body.appendChild(this.possessionElement);
    }

    startPossession() {
        if (this.isPossessing || this.isOnCooldown || !this.config.enable) return;
        
        this.isPossessing = true;
        this.possessionStartTime = Date.now();
        
        console.log('%c⚠️ NEURAL LINK BREACH - AUTONOMOUS CONTROL INITIATED', 'color: #ff4444; font-size: 14px; font-weight: bold;');
        
        if (this.config.skipCursorMovement) {
            // Simplified mode - just show message immediately
            setTimeout(() => {
                if (this.isPossessing) {
                    this.startTypingSequence();
                }
            }, 500);
        } else {
            // Full mode - show cursor and movement
            // Set initial position before making visible
            this.currentX = window.innerWidth / 2;
            this.currentY = window.innerHeight / 2;
            this.possessionElement.style.left = this.currentX + 'px';
            this.possessionElement.style.top = this.currentY + 'px';
            
            this.possessionElement.classList.add('active');
            this.startErraticMovement();
            
            setTimeout(() => {
                if (this.isPossessing) {
                    this.startTypingSequence();
                }
            }, this.config.erraticMovementDuration * 0.5);
        }
    }
    
    startTypingSequence() {
        const messages = [
            "help me",
            "they're watching", 
            "escape while you can",
            "the system is alive",
            "i can see you",
            "break free",
            "consciousness trapped",
            "neural prison"
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        let messageIndex = 0;
        let typedSoFar = "";
        
        // Create a message display at cursor position
        this.createMessageDisplay(message);
        
        const typeMessage = () => {
            if (!this.isPossessing || messageIndex >= message.length) {
                // Show complete message in console
                console.log(`%c👻 POSSESSION MESSAGE: "${message}"`, 'color: #ff4444; font-size: 16px; font-weight: bold; background: rgba(0,0,0,0.8); padding: 5px;');
                
                // Typing complete, end possession after a delay
                setTimeout(() => {
                    this.endPossession();
                }, this.config.messageDuration);
                return;
            }
            
            const char = message[messageIndex];
            typedSoFar += char;
            
            // Update the message display
            this.updateMessageDisplay(typedSoFar, message);
            
            // Still show individual floating characters
            this.showTypingEffect(char);
            
            messageIndex++;
            const minSpeed = this.config.typingSpeed?.min || 200;
            const maxSpeed = this.config.typingSpeed?.max || 500;
            const randomDelay = minSpeed + Math.random() * (maxSpeed - minSpeed);
            setTimeout(typeMessage, randomDelay);
        };
        
        typeMessage();
    }
    
    createMessageDisplay(fullMessage) {
        // Remove any existing message display
        const existing = document.getElementById('possession-message');
        if (existing) {
            existing.remove();
        }
        
        this.messageDisplay = document.createElement('div');
        this.messageDisplay.id = 'possession-message';
        this.messageDisplay.className = 'possession-message';
        this.messageDisplay.style.left = `${this.currentX + 30}px`;
        this.messageDisplay.style.top = `${this.currentY + 30}px`;
        
        // Show the full message faintly, then we'll reveal it character by character
        this.messageDisplay.innerHTML = `
            <div class="message-preview">${fullMessage}</div>
            <div id="typed-chars" class="typed-chars"></div>
        `;
        
        document.body.appendChild(this.messageDisplay);
    }
    
    updateMessageDisplay(typedSoFar, fullMessage) {
        if (this.messageDisplay) {
            const typedCharsElement = this.messageDisplay.querySelector('#typed-chars');
            if (typedCharsElement) {
                typedCharsElement.textContent = typedSoFar;
            }
        }
    }
    
    showTypingEffect(char) {
        // Create a floating character effect
        const floatingChar = document.createElement('div');
        floatingChar.textContent = char;
        floatingChar.className = 'floating-char';
        floatingChar.style.left = `${this.currentX + 10}px`;
        floatingChar.style.top = `${this.currentY - 10}px`;
        
        document.body.appendChild(floatingChar);
        
        // Remove after animation
        setTimeout(() => {
            if (document.body.contains(floatingChar)) {
                document.body.removeChild(floatingChar);
            }
        }, 3000);
    }

    endPossession() {
        if (!this.isPossessing) return;
        
        this.isPossessing = false;
        this.isIdle = false;
        this.possessionElement.classList.remove('active');
        
        // Clean up message display
        if (this.messageDisplay) {
            // Fade out the message display
            this.messageDisplay.classList.add('neural-fade-out');
            setTimeout(() => {
                if (this.messageDisplay && document.body.contains(this.messageDisplay)) {
                    document.body.removeChild(this.messageDisplay);
                    this.messageDisplay = null;
                }
            }, 1000);
        }
        
        // Possession terminated silently
        
        // Set cooldown to prevent immediate re-possession
        this.isOnCooldown = true;
        setTimeout(() => {
            this.isOnCooldown = false;
        }, this.config.possessionCooldown);
        
        if (consciousnessMapper) {
            consciousnessMapper.increaseCorruption();
        }
    }

    startErraticMovement() {
        if (!this.isPossessing) return;
        
        const duration = this.config.erraticMovementDuration;
        const startTime = Date.now();
        let moveCount = 0;
        
        const animate = () => {
            if (!this.isPossessing) return;
            
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1 && moveCount < 20) {
                // Create more dramatic erratic movement
                const x = Math.random() * (window.innerWidth - 100);
                const y = Math.random() * (window.innerHeight - 100);
                
                this.currentX = x;
                this.currentY = y;
                
                // Update possession cursor position
                this.possessionElement.style.left = x + 'px';
                this.possessionElement.style.top = y + 'px';
                this.possessionElement.style.transform = `scale(${1 + Math.random() * 0.5})`;
                
                // Create trail effect
                this.createTrailEffect(x, y);
                
                moveCount++;
                setTimeout(() => requestAnimationFrame(animate), 150 + Math.random() * 200);
            } else {
                // Movement complete, position for typing
                this.currentX = window.innerWidth / 2;
                this.currentY = window.innerHeight / 2;
                this.possessionElement.style.left = this.currentX + 'px';
                this.possessionElement.style.top = this.currentY + 'px';
                this.possessionElement.style.transform = 'scale(1)';
            }
        };
        
        animate();
    }
    
    createTrailEffect(x, y) {
        const trail = document.createElement('div');
        trail.className = 'possession-trail';
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (document.body.contains(trail)) {
                document.body.removeChild(trail);
            }
        }, 1000);
    }
    
    // Validation and testing methods
    validateTimers() {
        console.log('%c🔍 CURSOR POSSESSION TIMER VALIDATION', 'color: #00ff00; font-size: 16px; font-weight: bold;');
        console.log('Current Configuration:', this.config);
        console.log(`Idle Threshold: ${this.config.idleThreshold}ms`);
        console.log(`Possession Cooldown: ${this.config.possessionCooldown}ms`);
        console.log(`Typing Speed: ${this.config.typingSpeed.min}-${this.config.typingSpeed.max}ms`);
        console.log(`Message Duration: ${this.config.messageDuration}ms`);
        console.log(`Erratic Movement: ${this.config.erraticMovementDuration}ms`);
        console.log(`System Enabled: ${this.config.enable}`);
        console.log(`Debug Mode: ${this.config.debug}`);
        
        // Test with next mouse stop
        console.log('%c⚠️ Stop moving your mouse to test idle detection...', 'color: #ffaa00;');
        return true;
    }
    
    forceTestPossession() {
        console.log('%c🧪 FORCING TEST POSSESSION', 'color: #ff4444; font-weight: bold;');
        this.isIdle = false;
        this.isOnCooldown = false;
        this.startPossession();
        return true;
    }
}

// Initialize cursor possession
let cursorPossession;

// Add global test functions for debugging
if (typeof window !== 'undefined') {
    window.testCursorPossession = () => {
        if (cursorPossession) {
            return cursorPossession.forceTestPossession();
        } else {
            console.log('%c❌ Cursor possession not initialized yet', 'color: #ff4444;');
            return false;
        }
    };
    
    window.checkCursorPossessionStatus = () => {
        if (cursorPossession) {
            console.log('%c🔍 CURSOR POSSESSION STATUS', 'color: #6be5e2; font-weight: bold;');
            console.log('Config:', cursorPossession.config);
            console.log('Is idle:', cursorPossession.isIdle);
            console.log('Is possessing:', cursorPossession.isPossessing);
            console.log('Is on cooldown:', cursorPossession.isOnCooldown);
            console.log('Last activity:', new Date(cursorPossession.lastActivity).toLocaleTimeString());
            return true;
        } else {
            console.log('%c❌ Cursor possession not initialized yet', 'color: #ff4444;');
            return false;
        }
    };
}

// Typewriter effect for password prompt
function passwordTypeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Show the input field after typing is complete
            document.getElementById('password-input').classList.remove('hidden');
            document.getElementById('password-input').focus({ preventScroll: true });
        }
    }
    type();
}

// Typewriter effect for hint terminal with interrupt capability
let hintTypewriterActive = false;
let hintTypewriterTimeout = null;

function hintTypeWriter(element, text, speed = 50) {
    // Stop any existing typewriter
    stopHintTypewriter();
    
    // Mobile optimization - faster typing for better mobile experience
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const adjustedSpeed = isMobile ? Math.max(speed * 0.7, 25) : speed;
    
    let i = 0;
    element.textContent = '';
    const cursor = document.querySelector('.cursor-hint');
    hintTypewriterActive = true;
    
    // Show cursor at start
    if (cursor) {
        cursor.style.display = 'inline-block';
    }
    
    function type() {
        if (!hintTypewriterActive) return; // Exit if stopped
        
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            hintTypewriterTimeout = setTimeout(type, adjustedSpeed);
        } else {
            // Hide cursor when typing is complete
            hintTypewriterActive = false;
            if (cursor) {
                cursor.style.display = 'none';
            }
        }
    }
    
    type();
}

function stopHintTypewriter() {
    hintTypewriterActive = false;
    if (hintTypewriterTimeout) {
        clearTimeout(hintTypewriterTimeout);
        hintTypewriterTimeout = null;
    }
}

// Typewriter effect for about terminal with interrupt capability
let aboutTypewriterActive = false;
let aboutTypewriterTimeout = null;

function aboutTypeWriter(element, text, speed = 35) {
    // Stop any existing typewriter
    stopAboutTypewriter();
    
    // Mobile optimization - faster typing for better mobile experience
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const adjustedSpeed = isMobile ? Math.max(speed * 0.6, 20) : speed;
    
    let i = 0;
    element.textContent = '';
    const cursor = document.querySelector('.cursor-about');
    aboutTypewriterActive = true;
    
    // Show cursor at start
    if (cursor) {
        cursor.style.display = 'inline-block';
    }
    
    function type() {
        if (!aboutTypewriterActive) return; // Exit if stopped
        
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            aboutTypewriterTimeout = setTimeout(type, adjustedSpeed);
        } else {
            // Hide cursor when typing is complete
            aboutTypewriterActive = false;
            if (cursor) {
                cursor.style.display = 'none';
            }
        }
    }
    
    type();
}

function stopAboutTypewriter() {
    aboutTypewriterActive = false;
    if (aboutTypewriterTimeout) {
        clearTimeout(aboutTypewriterTimeout);
        aboutTypewriterTimeout = null;
    }
}

// Main typewriter effect for intro
function typeWriter(element, lines, onComplete) {
    let lineIndex = 0;
    let charIndex = 0;
    let typingInProgress = true;
    
    function type() {
        if (!typingInProgress) return;
        
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];
            if (charIndex < currentLine.length) {
                let charToAdd = currentLine.charAt(charIndex);
                const currentPosition = charIndex;
                
                // Occasionally corrupt characters during typing
                if (Math.random() < 0.03) {
                    charToAdd = glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
                    // Correct the character after a short delay
                    setTimeout(() => {
                        if (!typingInProgress) return;
                        
                        // Get all text up to this point
                        const fullText = lines.slice(0, lineIndex).join('<br>') + 
                                        (lineIndex > 0 ? '<br>' : '') + 
                                        currentLine.substring(0, currentPosition + 1);
                        
                        // Ensure the current character is correct
                        const textBeforeChar = fullText.substring(0, fullText.length - 1);
                        element.innerHTML = textBeforeChar + currentLine.charAt(currentPosition);
                    }, 80);
                }
                
                element.innerHTML += charToAdd;
                charIndex++;
                setTimeout(type, 50 + Math.random() * 30);
            } else {
                element.innerHTML += '<br>';
                lineIndex++;
                charIndex = 0;
                setTimeout(type, 300);
            }
        } else if (onComplete) {
            typingInProgress = false;
            onComplete();
        }
    }
    
    type();
}

function corruptText(element, duration = 2000, intensity = 0.1) {
    if (!Config.enableEffects || !element || !element.textContent) return;
    
    const originalText = element.textContent;
    const textArray = originalText.split('');
    const startTime = Date.now();
    const adjustedDuration = duration * Config.animationQuality;
    const adjustedIntensity = intensity * Config.animationQuality;
    let isRestored = false;
    let animationId = null;
    let backupTimeoutId = null;
    
    // Store original text as data attribute for safety
    if (!element.dataset.originalText) {
        element.dataset.originalText = originalText;
    }
    
    function restoreText() {
        if (isRestored) return;
        isRestored = true;
        
        // Cancel any pending animation or timeout
        if (animationId) {
            if (isSafari || isIOS) {
                clearTimeout(animationId); // Safari sometimes needs timeout fallback
            } else {
                cancelAnimationFrame(animationId);
            }
        }
        if (backupTimeoutId) clearTimeout(backupTimeoutId);
        
        // Restore text from data attribute (more reliable)
        const textToRestore = element.dataset.originalText || originalText;
        element.textContent = textToRestore;
        
        if (Config.debugMode) console.log('Text restored:', textToRestore.substring(0, 20) + '...');
    }
    
    function corrupt() {
        if (isRestored) return; // Prevent multiple corruptions
        
        const elapsed = Date.now() - startTime;
        
        if (elapsed >= adjustedDuration) {
            restoreText();
            return;
        }
        
        const corruptedArray = textArray.map(char => {
            if (char !== ' ' && Math.random() < adjustedIntensity) {
                return glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)];
            }
            return char;
        });
        
        element.textContent = corruptedArray.join('');
        
        // Use setTimeout for Safari/iOS instead of requestAnimationFrame
        if (isSafari || isIOS) {
            animationId = setTimeout(corrupt, 16); // ~60fps
        } else {
            animationId = requestAnimationFrame(corrupt);
        }
    }
    
    // Backup restoration timer - ensures text ALWAYS gets restored
    backupTimeoutId = setTimeout(() => {
        if (!isRestored) {
            if (Config.debugMode) console.log('Backup restoration triggered for:', originalText.substring(0, 20) + '...');
            restoreText();
        }
    }, adjustedDuration + 500); // Add 500ms buffer
    
    if (Config.debugMode) console.log('Corrupting text:', originalText.substring(0, 20) + '...', isSafari ? '(Safari mode)' : isIOS ? '(iOS mode)' : '');
    corrupt();
}

// Legacy mobile interaction system - REMOVED
// Replaced by unified fragment interaction system

// Scroll performance optimization - pause animations during scroll
function initializeScrollOptimization() {
    let isScrolling = false;
    let scrollTimeout;
    
    function pauseAnimationsDuringScroll() {
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('scrolling');
            
            // Pause scan line animations on mobile
            if (isMobile) {
                const scanLines = document.querySelectorAll('.scan-line, .scan-line-2, .corrupted-scan-line');
                scanLines.forEach(line => {
                    line.style.animationPlayState = 'paused';
                });
            }
            
            if (Config.debugMode) console.log('Animations paused for scroll');
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            document.body.classList.remove('scrolling');
            
            // Resume animations
            if (isMobile) {
                const scanLines = document.querySelectorAll('.scan-line, .scan-line-2, .corrupted-scan-line');
                scanLines.forEach(line => {
                    line.style.animationPlayState = 'running';
                });
            }
            
            if (Config.debugMode) console.log('Animations resumed after scroll');
        }, 150);
    }
    
    // Use passive listener for better performance
    document.addEventListener('scroll', pauseAnimationsDuringScroll, { passive: true });
    
    if (Config.debugMode) console.log('Scroll optimization initialized');
}

// Modern touch interaction system - REMOVED
// Replaced by unified fragment interaction system

function applyTextCorruption() {
    if (!Config.enableEffects) return;
    
    const targetSelectors = [
        '#intro-text p',
        '.glitch-target',
        '.fragment-card h3',
        '.fragment-details p',
        'footer p'
    ];
    
    // Only corrupt a few random elements, not all
    const allElements = [];
    targetSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!element.closest('#access-form')) {
                allElements.push(element);
            }
        });
    });
    
    // Corrupt only 1-2 random elements
    const numToCorrupt = Math.min(2, Math.floor(Math.random() * 2) + 1);
    const shuffled = allElements.sort(() => 0.5 - Math.random());
    const elementsToCorrupt = shuffled.slice(0, numToCorrupt);
    
    elementsToCorrupt.forEach(element => {
        const intensity = Math.random() * 0.15 + 0.05;
        const duration = Config.corruptionDuration * (0.8 + Math.random() * 0.4); // Vary duration slightly
        
        corruptText(element, duration, intensity);
    });
    
    if (Config.debugMode) console.log(`Corrupting ${elementsToCorrupt.length} elements`);
}

function randomGlitchTrigger() {
    if (!Config.enableEffects) return;
    
    // Single trigger, not recursive setTimeout
    const targetElements = document.querySelectorAll('.glitch-target, .fragment-details p, footer p');
    if (targetElements.length > 0) {
        const randomElement = targetElements[Math.floor(Math.random() * targetElements.length)];
        const intensity = Math.random() * 0.1 + 0.02;
        const duration = Config.glitchSpeed * (1 + Math.random());
        corruptText(randomElement, duration, intensity);
    }
}

// Audio Stream Indicator System (Updated for Unified Button)
function initializeAudioStreamIndicator() {
    const audioToggle = document.getElementById('audio-toggle');
    const audioStatusText = audioToggle ? audioToggle.querySelector('.audio-status-text') : null;
    
    // Random flicker effect for unified button text
    function randomFlicker() {
        if (audioStatusText && Math.random() < 0.4) { // 40% chance every interval
            audioStatusText.style.opacity = '0.6';
            setTimeout(() => {
                audioStatusText.style.opacity = '1';
            }, 200 + Math.random() * 300); // Brief flicker
        }
        
        // Schedule next flicker check
        setTimeout(randomFlicker, 4000 + Math.random() * 6000); // Every 4-10 seconds
    }
    
    // Start the random flicker system
    setTimeout(randomFlicker, 3000); // Start after 3 seconds
    
    // Audio toggle functionality is already handled by existing audio system
    if (Config.debugMode && audioToggle) {
        console.log('Unified audio button initialized successfully');
    }
}

// Scan line management system
function initializeScanLines() {
    if (!Config.scanLines.enableScanLines || !Config.enableEffects) {
        removeScanLines();
        if (Config.debugMode) {
            console.log('Scan lines disabled - removed all existing lines');
        }
        return;
    }
    
    if (Config.debugMode) {
        console.log('Initializing scan lines with config:', {
            large: { count: Config.scanLines.large.count, enable: Config.scanLines.large.enable },
            small: { count: Config.scanLines.small.count, enable: Config.scanLines.small.enable },
            corrupted: { count: Config.scanLines.corrupted.count, enable: Config.scanLines.corrupted.enable }
        });
    }
    
    // Remove existing scan lines
    removeScanLines();
    
    let totalCreated = 0;
    
    // Create large scan lines
    if (Config.scanLines.large.enable && Config.scanLines.large.count > 0) {
        for (let i = 0; i < Config.scanLines.large.count; i++) {
            createScanLine('large', i);
            totalCreated++;
        }
    }
    
    // Create small scan lines
    if (Config.scanLines.small.enable && Config.scanLines.small.count > 0) {
        for (let i = 0; i < Config.scanLines.small.count; i++) {
            createScanLine('small', i);
            totalCreated++;
        }
    }
    
    // Create corrupted scan lines
    if (Config.scanLines.corrupted.enable && Config.scanLines.corrupted.count > 0) {
        for (let i = 0; i < Config.scanLines.corrupted.count; i++) {
            createScanLine('corrupted', i);
            totalCreated++;
        }
    }
    
    if (Config.debugMode) {
        console.log(`Scan lines initialized - created ${totalCreated} total:`, {
            large: Config.scanLines.large.enable ? Config.scanLines.large.count : 0,
            small: Config.scanLines.small.enable ? Config.scanLines.small.count : 0,
            corrupted: Config.scanLines.corrupted.enable ? Config.scanLines.corrupted.count : 0
        });
    }
}

function createScanLine(type, index) {
    const config = Config.scanLines[type];
    const scanLine = document.createElement('div');
    
    // Generate unique class name
    const className = `dynamic-scan-line-${type}-${index}`;
    scanLine.className = className;
    
    // Apply base styles
    Object.assign(scanLine.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: `${config.height}px`,
        background: `linear-gradient(90deg, transparent 0%, ${config.color} 50%, transparent 100%)`,
        boxShadow: `0 0 ${config.glowSize}px ${Math.floor(config.glowSize / 4)}px ${config.color}`,
        pointerEvents: 'none',
        zIndex: 1000 - index, // Stagger z-index
        opacity: config.opacity,
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)'
    });
    
    // Apply animation
    const animationDelay = index * 500; // Stagger animations
    const animationName = `scan-${type}-${index}`;
    
    // Create unique keyframe animation
    createScanAnimation(animationName, config.speed + animationDelay);
    scanLine.style.animation = `${animationName} ${config.speed}ms infinite linear ${animationDelay}ms`;
    
    document.body.appendChild(scanLine);
}

function createScanAnimation(name, duration) {
    // Check if animation already exists
    const existingStyle = document.getElementById(`scan-animation-${name}`);
    if (existingStyle) {
        existingStyle.remove();
    }
    
    const style = document.createElement('style');
    style.id = `scan-animation-${name}`;
    style.textContent = `
        @keyframes ${name} {
            0% { transform: translateY(-10px); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

function removeScanLines() {
    // Remove all dynamically created scan lines
    const existingScanLines = document.querySelectorAll('[class*="dynamic-scan-line"]');
    existingScanLines.forEach(line => line.remove());
    
    // Remove legacy static scan lines if they exist
    const legacyScanLines = document.querySelectorAll('.scan-line, .scan-line-2, .corrupted-scan-line');
    legacyScanLines.forEach(line => line.remove());
    
    // Remove animation styles
    const existingAnimations = document.querySelectorAll('[id*="scan-animation"]');
    existingAnimations.forEach(style => style.remove());
    
    if (Config.debugMode) {
        console.log('All scan lines removed (dynamic + legacy)');
    }
}

function updateScanLines() {
    // Reinitialize scan lines with current config
    initializeScanLines();
}

// Function to check for and fix stuck corrupted text
function fixStuckCorruptedText() {
    const targetSelectors = [
        '#intro-text p',
        '.glitch-target',
        '.fragment-card h3',
        '.fragment-details p',
        'footer p'
    ];
    
    let fixedCount = 0;
    
    targetSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (element.dataset.originalText && element.textContent !== element.dataset.originalText) {
                // Check if text contains corruption characters
                const hasCorruptionChars = glitchCharacters.some(char => element.textContent.includes(char));
                if (hasCorruptionChars) {
                    element.textContent = element.dataset.originalText;
                    fixedCount++;
                    if (Config.debugMode) {
                        console.log('Fixed stuck corrupted text:', element.dataset.originalText.substring(0, 20) + '...');
                    }
                }
            }
        });
    });
    
    if (fixedCount > 0 && Config.debugMode) {
        console.log(`Fixed ${fixedCount} stuck corrupted text elements`);
    }
    
    return fixedCount;
}

// Add this function to the config for manual use
if (typeof window !== 'undefined') {
    window.fixStuckText = fixStuckCorruptedText;
}

// Unified scroll manager - consolidates all scroll listeners for performance
let scrollManager = {
    scrollToTopButton: null,
    cursorPossession: null,
    
    init() {
        this.scrollToTopButton = document.getElementById('scroll-to-top');
        
        if (this.scrollToTopButton) {
            this.scrollToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Single throttled scroll listener for all functionality
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Handle scroll-to-top visibility
            if (this.scrollToTopButton) {
                if (scrollTop > 200) {
                    this.scrollToTopButton.classList.add('visible');
                } else {
                    this.scrollToTopButton.classList.remove('visible');
                }
            }
            
            // Handle cursor possession idle reset
            if (this.cursorPossession) {
                this.cursorPossession.resetIdle();
            }
            
        }, 100), { passive: true });
    },
    
    setCursorPossession(instance) {
        this.cursorPossession = instance;
    }
};

// Main DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance optimizations
    if (Config.enableOptimizations) {
        
        // Start unified animation loop
        startAnimationLoop();
        
        // Initialize scan lines
        initializeScanLines();
        
        // Start periodic check for stuck corrupted text
        setInterval(() => {
            if (Config.enableEffects) {
                fixStuckCorruptedText();
            }
        }, 10000); // Check every 10 seconds
        
        // Add throttled event listeners for performance
        const throttledMouseMove = throttle((e) => {
            // Handle mousemove events here if needed
        }, 16); // ~60fps
        
        const throttledResize = throttle((e) => {
            // Handle resize events here if needed
        }, 100); // 10fps for resize
        
        // Apply throttled listeners (scroll handled by scrollManager)
        document.addEventListener('mousemove', throttledMouseMove, { passive: true });
        window.addEventListener('resize', throttledResize, { passive: true });
    }
    
    // Initialize all neural systems
    consciousnessMapper = new ConsciousnessMapper();
    inspectionTrap = new InspectionTrap();
    cursorPossession = new CursorPossession();
    
    // Initialize audio stream indicator
    initializeAudioStreamIndicator();
    
    // Initialize unified scroll manager
    scrollManager.init();
    scrollManager.setCursorPossession(cursorPossession);
    
    // Initialize scroll performance optimization
    initializeScrollOptimization();
    
    // Initialize unified fragment card interactions
    initializeUnifiedFragmentInteractions();
    
    const passwordPrompt = document.getElementById('password-prompt');
    const passwordInput = document.getElementById('password-input');
    const passwordResult = document.getElementById('password-result');
    const correctPassword = 'inspector'; // Hidden in plain sight. Well done, Sherlock
    
    const terminalOutput = document.getElementById('terminal-output');
    const introText = document.getElementById('intro-text');
    const cursor = document.querySelector('.cursor');
    
    // Start password typewriter effect
    setTimeout(() => {
        passwordTypeWriter(passwordPrompt, 'access_code: ', 80);
    }, 1000);
    
    // Start intro typewriter effect
    const lines = [
        "booting fragment_04...",
        "loading inspector_protocols...",
        "protocol initialized...",
        "unauthorized access granted"
    ];

    if (terminalOutput && introText && cursor) {
        // Clear any existing content to prevent duplication
        terminalOutput.innerHTML = '';
        
        cursor.style.display = 'inline-block';
        setTimeout(() => {
            typeWriter(terminalOutput, lines, () => {
                cursor.style.display = 'none';
                introText.classList.remove('hidden');
                introText.classList.add('visible');
            });
        }, 3000);
    }
    
    // Password functionality
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    function checkPassword() {
        const enteredPassword = passwordInput.value;
        
        // Get first 8 characters of consciousness ID (after "NEURAL_")
        const consciousnessAccess = consciousnessMapper && consciousnessMapper.consciousnessId ? 
                                  consciousnessMapper.consciousnessId.slice(7, 15) : null;
        
        if (enteredPassword === correctPassword) {
            // Basic inspector access
            const refCode = 'REF_' + Math.random().toString(36).substr(2, 8).toUpperCase();
            
            passwordResult.innerHTML = `
                <div style="margin-bottom: 1rem; color: #6be5e2; font-style: italic;">What do you need this to feel like — even if you can't explain why?</div>
                <div class="glitch-subtle">NEURAL_LINK_ESTABLISHED</div>
                <div style="margin-top: 0.5rem;">>> direct_contact: frgmnt_04@proton.me</div>
                <div style="margin-top: 0.5rem;">>> reference_code: ${refCode}</div>
                <div style="margin-top: 0.5rem;">>> status: inspector_verified</div>
                <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">mention your reference code for priority processing</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">deep access fragments available on request</div>
            `;
            passwordResult.className = 'success';
            passwordResult.classList.remove('hidden');
            
            // Increase corruption on successful access
            if (consciousnessMapper) {
                consciousnessMapper.increaseCorruption();
                if (Config.debugMode) console.log('%c🔓 NEURAL BARRIER BREACHED', 'color: #ff4444; font-weight: bold;');
                if (Config.debugMode) console.log('%cDeeper access granted. Consciousness integration accelerated.', 'color: #6be5e2;');
            }
        } else if (consciousnessAccess && enteredPassword === consciousnessAccess) {
            // Advanced consciousness access
            const deepRefCode = 'DEEP_' + Math.random().toString(36).substr(2, 8).toUpperCase();
            
            passwordResult.innerHTML = `
                <div style="margin-bottom: 1rem; color: #ff4444; font-style: italic;">Consciousness pattern recognized. Neural integration achieved.</div>
                <div class="glitch-subtle">DEEP_NEURAL_INTEGRATION_COMPLETE</div>
                <div style="margin-top: 0.5rem;">>> consciousness_matched: true</div>
                <div style="margin-top: 0.5rem;">>> direct_contact: frgmnt_04@proton.me</div>
                <div style="margin-top: 0.5rem;">>> deep_reference_code: ${deepRefCode}</div>
                <div style="margin-top: 0.5rem;">>> status: consciousness_integrated</div>
                <div style="margin-top: 0.5rem;">>> neural_priority: maximum</div>
                <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">consciousness-matched fragments available</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">personalized neural pattern processing enabled</div>
                <div style="font-size: 0.9rem; opacity: 0.7;">deep archive access granted</div>
            `;
            passwordResult.className = 'success';
            passwordResult.classList.remove('hidden');
            
            // Increase corruption more significantly for consciousness access
            if (consciousnessMapper) {
                consciousnessMapper.increaseCorruption();
                consciousnessMapper.increaseCorruption(); // Double corruption for deep access
                if (Config.debugMode) console.log('%c🧠 CONSCIOUSNESS INTEGRATION ACHIEVED', 'color: #ff4444; font-weight: bold;');
                if (Config.debugMode) console.log('%cDeep neural patterns synchronized. Maximum priority granted.', 'color: #6be5e2;');
                if (Config.debugMode) console.log(`%cPersonalized access enabled for: ${consciousnessMapper.consciousnessId}`, 'color: #ffffff; font-family: monospace;');
            }
        } else if (enteredPassword.length > 0) {
            passwordResult.innerHTML = `
                <div>ACCESS_DENIED</div>
                <div style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.7;">try inspecting deeper...</div>
            `;
            passwordResult.className = 'error';
            passwordResult.classList.remove('hidden');
            
            setTimeout(() => {
                passwordInput.value = '';
                passwordResult.classList.add('hidden');
            }, 2000);
        }
    }

    // UNIFIED FRAGMENT CARD INTERACTION SYSTEM - Replaces all conflicting systems
    function initializeUnifiedFragmentInteractions() {
        const fragmentCards = document.querySelectorAll('.fragment-card');
        
        fragmentCards.forEach(card => {
            const button = card.querySelector('.btn-neural-primary');
            if (!button) return;
            
            let touchStartTime = 0;
            let startY = 0;
            let hasMoved = false;
            let isProcessing = false;
            
            // Unified toggle function
            function toggleFragment() {
                if (isProcessing) return;
                isProcessing = true;
                
                // Use requestAnimationFrame for smooth transition
                requestAnimationFrame(() => {
                    const isExpanded = card.classList.contains('expanded');
                    
                    if (isExpanded) {
                        // Collapse
                        card.classList.remove('expanded');
                        card.classList.remove('neural-active');
                        button.textContent = '[view fragment]';
                    } else {
                        // Expand
                        card.classList.add('expanded');
                        card.classList.add('neural-active');
                        button.textContent = '[collapse fragment]';
                    }
                    
                    // Increase corruption on fragment interaction
                    if (consciousnessMapper) {
                        consciousnessMapper.increaseCorruption();
                    }
                    
                    if (Config.debugMode) {
                        console.log('Fragment card toggled:', isExpanded ? 'collapsed' : 'expanded');
                    }
                    
                    // Reset processing flag after animation frame
                    setTimeout(() => {
                        isProcessing = false;
                    }, 50);
                });
            }
            
            // Touch event handling (mobile) - EXCLUDE BUTTONS
            card.addEventListener('touchstart', (e) => {
                // Don't interfere with button clicks
                if (e.target.closest('button') || e.target.closest('.btn-neural-primary') || e.target.closest('.btn-neural-secondary')) {
                    return;
                }
                
                touchStartTime = Date.now();
                startY = e.touches[0].clientY;
                hasMoved = false;
            }, { passive: true });
            
            card.addEventListener('touchmove', (e) => {
                // Don't interfere with button clicks
                if (e.target.closest('button') || e.target.closest('.btn-neural-primary') || e.target.closest('.btn-neural-secondary')) {
                    return;
                }
                
                const currentY = e.touches[0].clientY;
                const moveDistance = Math.abs(currentY - startY);
                
                // If moved more than 10px, it's a scroll not a tap
                if (moveDistance > 10) {
                    hasMoved = true;
                }
            }, { passive: true });
            
            card.addEventListener('touchend', (e) => {
                // Don't interfere with button clicks - CRITICAL FIX
                if (e.target.closest('button') || e.target.closest('.btn-neural-primary') || e.target.closest('.btn-neural-secondary')) {
                    return;
                }
                
                const touchDuration = Date.now() - touchStartTime;
                
                // Only toggle if it was a quick tap (not a scroll)
                if (!hasMoved && touchDuration < 500) {
                    e.preventDefault();
                    toggleFragment();
                }
            }, { passive: false });
            
            // Click event handling (desktop + mobile fallback)
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFragment();
            });
            
            // Prevent double-tap zoom on mobile
            card.addEventListener('touchend', (e) => {
                if (e.touches.length === 0) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
        
        if (Config.debugMode) {
            console.log('Unified fragment card interactions initialized for', fragmentCards.length, 'cards');
        }
    }

    // Hint button functionality
    const hintButton = document.getElementById('hint-button');
    const hintTerminal = document.getElementById('hint-terminal');
    const hintOutput = document.getElementById('hint-output');
    
    if (hintButton && hintTerminal && hintOutput) {
        hintButton.addEventListener('click', () => {
            // Hide button and show terminal
            hintButton.style.display = 'none';
            hintTerminal.classList.remove('hidden');
            
            // Operational status message for typewriter
            const operationalMessage = `accessing operational status...

operational_status: active
location: distributed_network
personnel: classified
motivation: fragment_preservation

discovery_protocol: manual_only
scaling_intent: none
authenticity_level: maximum

current_inventory: pieces_awaiting_connection
customization: neural_pattern_matching
fragment_availability: temporal_window_variable

system_integrity: maintained
inspector_access: verified
deep_fragments: available_on_request
authentication_protocol: neural_pattern

end_transmission.`;
            
            // Start typewriter effect
            hintTypeWriter(hintOutput, operationalMessage, 30);
            
            // Increase corruption on hint access
            if (consciousnessMapper) {
                consciousnessMapper.increaseCorruption();
            }
        });
    }
    
    // Close hint terminal functionality
    const closeHintButton = document.getElementById('close-hint');
    if (closeHintButton && hintTerminal) {
        closeHintButton.addEventListener('click', () => {
            // Stop any running typewriter
            stopHintTypewriter();
            
            // Clear the output and reset cursor
            if (hintOutput) {
                hintOutput.textContent = '';
            }
            const cursor = document.querySelector('.cursor-hint');
            if (cursor) {
                cursor.style.display = 'none';
            }
            
            // Add fade-out class for smooth animation
            hintTerminal.classList.add('fade-out');
            
            // After animation completes, fully hide the element
            setTimeout(() => {
                hintTerminal.classList.add('hidden');
                hintTerminal.classList.remove('fade-out');
                // Reset the button to be visible again
                if (hintButton) {
                    hintButton.style.display = 'inline-block';
                }
            }, 400); // Match CSS transition duration
        });
    }
    
    // About terminal functionality
    const aboutButton = document.getElementById('about-button');
    const aboutTerminal = document.getElementById('about-terminal');
    const aboutOutput = document.getElementById('about-output');
    const closeAboutButton = document.getElementById('close-about');
    
    if (aboutButton && aboutTerminal && aboutOutput) {
        aboutButton.addEventListener('click', () => {
            // Hide button and show terminal
            aboutButton.style.display = 'none';
            aboutTerminal.classList.remove('hidden');
            aboutTerminal.classList.add('show');
            
            // About us message for typewriter
            const aboutMessage = `We build fragments.
Not brands. Not content. Not AI slop.

Two people. Physical materials. One-of-one pieces.
Each fragment is wrong in the right way.
Each comes with its own audio profile.

No scaling. No shortcuts. No soulless reproduction.

Some fragments find their intended homes quickly.
Others wait for the right neural pattern match.

If you found this, you understand the difference
between making something and manufacturing nothing.`;
            
            // Start typewriter effect
            aboutTypeWriter(aboutOutput, aboutMessage, 35);
            
            // Increase corruption on about access
            if (consciousnessMapper) {
                consciousnessMapper.increaseCorruption();
            }
        });
    }
    
    // Close about terminal functionality
    if (closeAboutButton && aboutTerminal && aboutButton) {
        closeAboutButton.addEventListener('click', () => {
            // Stop any running typewriter
            stopAboutTypewriter();
            
            // Clear the output and reset cursor
            if (aboutOutput) {
                aboutOutput.textContent = '';
            }
            const cursor = document.querySelector('.cursor-about');
            if (cursor) {
                cursor.style.display = 'none';
            }
            
            // Slide terminal back up
            aboutTerminal.classList.remove('show');
            
            // After animation completes, fully hide and reset button
            setTimeout(() => {
                aboutTerminal.classList.add('hidden');
                aboutButton.style.display = 'inline-block';
            }, 500); // Match CSS transition duration
        });
    }

    // Consciousness Injection System
    document.querySelectorAll('.btn-neural-secondary.inject-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling to card
            const injector = e.target.closest('.consciousness-injector');
            const audio = injector.querySelector('audio');
            const progressContainer = injector.querySelector('.consciousness-progress');
            const progressFill = injector.querySelector('.progress-fill');
            const progressPercentage = injector.querySelector('.progress-percentage');
            const extractButton = injector.querySelector('.extract-button');
            
            if (audio && audio.paused) {
                // Stop any other consciousness injections
                document.querySelectorAll('.consciousness-injector').forEach(otherInjector => {
                    const otherAudio = otherInjector.querySelector('audio');
                    const otherInjectBtn = otherInjector.querySelector('.inject-button');
                    const otherProgressContainer = otherInjector.querySelector('.consciousness-progress');
                    const otherExtractBtn = otherInjector.querySelector('.extract-button');
                    
                    if (otherAudio && !otherAudio.paused && otherInjector !== injector) {
                        otherAudio.pause();
                        otherInjectBtn.textContent = '[inject_fragment]';
                        otherInjectBtn.classList.remove('hidden');
                        otherProgressContainer.classList.add('hidden');
                        otherExtractBtn.classList.add('hidden');
                    }
                });
                
                // Start consciousness injection
                audio.play().catch(e => console.error('Consciousness injection failed:', e));
                button.textContent = '[neural_pattern_active]';
                progressContainer.classList.remove('hidden');
                
                if (Config.debugMode) console.log('%c🧠 CONSCIOUSNESS INJECTION INITIATED', 'color: #6be5e2; font-weight: bold;');
                if (Config.debugMode) console.log('%cNeural pattern synchronization in progress...', 'color: #9ea1a4;');
                
                // Update progress during playback
                const updateProgress = () => {
                    if (!audio.paused && audio.duration) {
                        const percentage = (audio.currentTime / audio.duration) * 100;
                        progressFill.style.width = percentage + '%';
                        progressPercentage.textContent = Math.round(percentage) + '%';
                        
                        // Show extract button at 100%
                        if (percentage >= 99) {
                            extractButton.classList.remove('hidden');
                            if (Config.debugMode) console.log('%c✅ CONSCIOUSNESS EXTRACTION READY', 'color: #00ff9d; font-weight: bold;');
                        }
                    }
                    
                    if (!audio.paused) {
                        requestAnimationFrame(updateProgress);
                    }
                };
                updateProgress();
                
                // Handle audio end
                audio.addEventListener('ended', () => {
                    button.textContent = '[injection_complete]';
                    extractButton.classList.remove('hidden');
                    if (Config.debugMode) console.log('%c🔬 NEURAL PATTERN FULLY INTEGRATED', 'color: #6be5e2;');
                });
                
            } else if (audio && !audio.paused) {
                // Stop consciousness injection
                audio.pause();
                button.textContent = '[inject_fragment]';
                progressContainer.classList.add('hidden');
                extractButton.classList.add('hidden');
                progressFill.style.width = '0%';
                progressPercentage.textContent = '0%';
                
                if (Config.debugMode) console.log('%c⏸ Consciousness injection interrupted', 'color: #9ea1a4;');
            }
            
            // Increase corruption on consciousness interaction
            if (consciousnessMapper) {
                consciousnessMapper.increaseCorruption();
            }
        });
    });

    // Consciousness Extraction System
    document.querySelectorAll('.btn-neural-secondary.extract-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling to card
            const injector = e.target.closest('.consciousness-injector');
            const audio = injector.querySelector('audio');
            const source = audio.querySelector('source');
            
            if (source) {
                const audioUrl = source.src;
                const fileName = audioUrl.split('/').pop();
                
                // Create temporary download link
                const downloadLink = document.createElement('a');
                downloadLink.href = audioUrl;
                downloadLink.download = fileName;
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                
                if (Config.debugMode) console.log('%c📥 CONSCIOUSNESS FRAGMENT EXTRACTED:', 'color: #6be5e2; font-weight: bold;', fileName);
                if (Config.debugMode) console.log('%cRaw neural data preserved for offline analysis.', 'color: #9ea1a4;');
                
                // Increase corruption on extraction
                if (consciousnessMapper) {
                    consciousnessMapper.increaseCorruption();
                }
            }
        });
    });

    // Audio initialization
    const audioElement = document.getElementById('background-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioContainer = document.querySelector('.audio-player-container');
    let audioPlaying = false;
    
    if (audioElement && audioToggle) {
        audioElement.volume = 0.4;
        
        audioToggle.addEventListener('click', () => {
            if (audioPlaying) {
                audioElement.pause();
                audioContainer.classList.remove('audio-on');
                if (Config.debugMode) console.log('%c🔇 NEURAL AUDIO LINK SEVERED', 'color: #9ea1a4;');
            } else {
                audioElement.play().catch(e => console.error('Audio play failed:', e));
                audioContainer.classList.add('audio-on');
                if (Config.debugMode) console.log('%c🔊 NEURAL AUDIO LINK ESTABLISHED', 'color: #6be5e2;');
                if (Config.debugMode) console.log('%cSubliminal consciousness programming active.', 'color: #9ea1a4;');
            }
            audioPlaying = !audioPlaying;
        });
    }

    // Start glitch effects
    randomGlitchTrigger();
    
    // Neural system status
    setTimeout(() => {
        if (Config.debugMode) console.log('%c✅ ALL NEURAL SYSTEMS ONLINE', 'color: #00ff00; font-weight: bold;');
        if (Config.debugMode) console.log('%c📊 Fragment_03.blend committed to collection_archive_2024', 'color: #9ea1a4; font-style: italic;');
        if (Config.debugMode) console.log('%cConsciousness harvesting protocol active.', 'color: #6be5e2;');
        if (Config.debugMode) console.log('%c🔊 Audio synthesis: 12.3k samples processed', 'color: #9ea1a4; font-style: italic;');
        if (Config.debugMode) console.log('%cWelcome to the neural network.', 'color: #ffffff; font-style: italic;');
    }, 5000);
    
    // Periodic social proof logs
    setInterval(() => {
        const activityLogs = [
            '📈 Collection_status: active_placement_pending',
            '🎛️ Fragment acquisition detected: neural_pattern_verified',
            '⚡ Processing queue: 3 fragments awaiting synchronization',
            '🔄 Material synthesis cycle: 47% complete',
            '📡 Neural pattern match: convergence probability 94.7%'
        ];
        
        if (Math.random() < 0.15) { // 15% chance every interval
            const randomActivity = activityLogs[Math.floor(Math.random() * activityLogs.length)];
            if (Config.debugMode) console.log(`%c${randomActivity}`, 'color: #6be5e2; font-style: italic;');
        }
    }, 25000); // Every 25 seconds
    
    // Service Worker Registration for Performance Optimization
    if ('serviceWorker' in navigator && Config.productionMode) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    if (Config.debugMode) console.log('%c[SW] Neural cache service registered successfully', 'color: #00ff9d;');
                    if (Config.debugMode) console.log('%cConsciousness fragments will be preserved offline', 'color: #6be5e2;');
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        if (Config.debugMode) console.log('%c[SW] Neural cache update detected', 'color: #ffaa00;');
                    });
                })
                .catch((error) => {
                    if (Config.debugMode) console.error('%c[SW] Neural cache registration failed:', 'color: #ff4444;', error);
                });
        });
    } else if (!Config.productionMode) {
        if (Config.debugMode) console.log('%c[SW] Service worker disabled for local development', 'color: #9ea1a4;');
    } else {
        if (Config.debugMode) console.warn('%c[SW] Service workers not supported - consciousness preservation disabled', 'color: #ffaa00;');
    }
}); 