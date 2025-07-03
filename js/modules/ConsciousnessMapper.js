// ConsciousnessMapper.js - Consciousness Tracking and Fingerprinting
import Config from '../config.js';

export class ConsciousnessMapper {
    constructor() {
        this.fingerprint = null;
        this.consciousnessId = null;
        this.corruptionLevel = 0;
        this.isInitialized = false;
        this.isWidgetExpanded = false;
    }

    async init() {
        if (this.isInitialized) return;
        
        try {
            this.fingerprint = await this.collectFingerprint();
            this.generateConsciousnessId();
            this.startNeuralMonitoring();
            this.isInitialized = true;
        } catch (error) {
            console.error('ConsciousnessMapper initialization failed:', error);
        }
    }

    async collectFingerprint() {
        // Match the original fingerprint structure exactly
        const fingerprint = {
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth,
                pixelRatio: window.devicePixelRatio || 1
            },
            browser: {
                userAgent: navigator.userAgent,
                language: navigator.language,
                languages: navigator.languages,
                platform: navigator.platform,
                cookieEnabled: navigator.cookieEnabled,
                doNotTrack: navigator.doNotTrack
            },
            system: {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                timezoneOffset: new Date().getTimezoneOffset(),
                cores: navigator.hardwareConcurrency || 'unknown',
                memory: navigator.deviceMemory || 'unknown',
                connection: navigator.connection ? {
                    effectiveType: navigator.connection.effectiveType,
                    downlink: navigator.connection.downlink
                } : 'unknown'
            },
            canvas: this.getCanvasFingerprint(),
            webgl: this.getWebGLFingerprint(),
            audio: await this.getAudioFingerprint(),
            fonts: this.detectFonts()
        };
        
        return fingerprint;
    }

    getCanvasFingerprint() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                return 'canvas_unavailable';
            }
            
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
        const testFonts = ['Arial', 'Helvetica', 'Times', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond'];
        const baseFonts = ['monospace', 'sans-serif', 'serif'];
        const testString = 'mmmmmmmmmmlli';
        const testSize = '72px';
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        const baseSizes = {};
        baseFonts.forEach(baseFont => {
            context.font = testSize + ' ' + baseFont;
            baseSizes[baseFont] = context.measureText(testString).width;
        });
        
        const availableFonts = [];
        testFonts.forEach(testFont => {
            baseFonts.forEach(baseFont => {
                context.font = testSize + ' ' + testFont + ',' + baseFont;
                const matched = context.measureText(testString).width !== baseSizes[baseFont];
                if (matched && !availableFonts.includes(testFont)) {
                    availableFonts.push(testFont);
                }
            });
        });
        
        return availableFonts;
    }

    generateConsciousnessId() {
        // Check if we already have a stored consciousness ID
        const storedId = localStorage.getItem('consciousness_id');
        if (storedId) {
            this.consciousnessId = storedId;
            return;
        }
        
        const data = JSON.stringify(this.fingerprint);
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
            const char = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        // Use original format: NEURAL_12345678 (8 digit hex, padded)
        this.consciousnessId = `NEURAL_${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
        
        // Store in localStorage for persistence
        localStorage.setItem('consciousness_id', this.consciousnessId);
        localStorage.setItem('neural_sessions', (parseInt(localStorage.getItem('neural_sessions') || '0') + 1).toString());
    }

    startNeuralMonitoring() {
        // Display consciousness analysis in console (like original)
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
            // Update the minimized display - just show static text like original
            shortIdElement.textContent = `consciousness_id`;
            
            // Populate the expanded data with original format
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
        
        if (!minimized || !expanded) return;
        
        // Only the minimized view should be clickable to expand
        minimized.addEventListener('click', (e) => {
            e.stopPropagation();
            this.expandWidget();
        });
        
        // Add a close button or click-outside behavior for the expanded view
        // For now, let's add a small close area at the top right
        const closeArea = document.createElement('div');
        closeArea.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            color: #ff4444;
            font-weight: bold;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            border-radius: 50%;
            background: rgba(255, 68, 68, 0.1);
            transition: background 0.2s ease;
        `;
        closeArea.innerHTML = '×';
        closeArea.title = 'Close';
        
        closeArea.addEventListener('mouseenter', () => {
            closeArea.style.background = 'rgba(255, 68, 68, 0.3)';
        });
        
        closeArea.addEventListener('mouseleave', () => {
            closeArea.style.background = 'rgba(255, 68, 68, 0.1)';
        });
        
        closeArea.addEventListener('click', (e) => {
            e.stopPropagation();
            this.collapseWidget();
        });
        
        expanded.appendChild(closeArea);
        
        // Prevent clicks inside the expanded content from closing it
        expanded.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Add click-outside-to-close functionality
        this.setupClickOutsideToClose();
        
        // Add escape key to close
        this.setupEscapeKeyToClose();
    }
    
    expandWidget() {
        const minimized = document.getElementById('widget-minimized');
        const expanded = document.getElementById('widget-expanded');
        
        if (minimized && expanded) {
            expanded.classList.remove('hidden');
            minimized.classList.add('hidden');
            this.isWidgetExpanded = true;
        }
    }
    
    collapseWidget() {
        const minimized = document.getElementById('widget-minimized');
        const expanded = document.getElementById('widget-expanded');
        
        if (minimized && expanded) {
            expanded.classList.add('hidden');
            minimized.classList.remove('hidden');
            this.isWidgetExpanded = false;
        }
    }
    
    setupClickOutsideToClose() {
        document.addEventListener('click', (e) => {
            // Only handle if widget is expanded
            if (!this.isWidgetExpanded) return;
            
            const widgetElement = document.getElementById('consciousness-widget');
            
            // Don't close if clicking inside the widget
            if (widgetElement && widgetElement.contains(e.target)) return;
            
            // Close the widget
            this.collapseWidget();
        });
    }
    
    setupEscapeKeyToClose() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isWidgetExpanded) {
                this.collapseWidget();
            }
        });
    }



    increaseCorruption() {
        this.corruptionLevel += 0.1;
        if (this.corruptionLevel > 10) this.corruptionLevel = 10;
    }
} 