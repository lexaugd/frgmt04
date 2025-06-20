// CursorPossession.js - Cursor Possession Effect
import Config from '../config.js';

export class CursorPossession {
    constructor() {
        this.isActive = false;
        this.idleTimer = null;
        this.idleTimeout = 30000; // 30 seconds
        this.possessionDuration = 8000; // 8 seconds
        this.typingMessages = [
            "You're not supposed to be here...",
            "The fragments remember you...",
            "Do you feel it watching?",
            "Neural patterns detected...",
            "Consciousness fragmentation imminent...",
            "The machine dreams of you..."
        ];
        this.currentPossession = null;
        
        // Click tracking for excessive clicking detection
        this.clickCount = 0;
        this.clickWindow = Config.cursorPossession?.clickWindow ?? 5000; // Use config value
        this.clickThreshold = Config.cursorPossession?.clickThreshold ?? 15; // Use config value
        this.lastClickTime = 0;
        this.hasTriggeredClickWarning = false;
        
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
        
        if (Config.debugMode) {
            console.log('🖱️ CursorPossession initialized with production settings:', {
                threshold: this.clickThreshold,
                window: this.clickWindow + 'ms',
                cooldown: (Config.cursorPossession?.clickCooldown ?? 10000) + 'ms'
            });
        }
    }

    get config() {
        return {
            enabled: Config.cursorPossession?.enabled ?? true,
            idleTime: Config.cursorPossession?.idleTime ?? this.idleTimeout,
            duration: Config.cursorPossession?.duration ?? this.possessionDuration,
            messages: Config.cursorPossession?.messages ?? this.typingMessages
        };
    }

    init() {
        if (!this.config.enabled) return;
        
        this.setupIdleDetection();
        this.createPossessionCursor();
    }

    setupIdleDetection() {
        const resetIdle = () => this.resetIdle();
        
        // Track mouse movement, clicks, and key presses
        document.addEventListener('mousemove', resetIdle, { passive: true });
        document.addEventListener('mousedown', resetIdle, { passive: true });
        document.addEventListener('keypress', resetIdle, { passive: true });
        document.addEventListener('scroll', resetIdle, { passive: true });
        document.addEventListener('touchstart', resetIdle, { passive: true });
        
        // Track clicks for excessive clicking detection
        document.addEventListener('click', (e) => {
            resetIdle();
            this.trackClick(e);
        });
        
        // Start the idle timer
        this.resetIdle();
    }

    resetIdle() {
        if (this.isActive) return; // Don't reset during possession
        
        clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => {
            this.startPossession();
        }, this.config.idleTime);
    }

    trackClick(event) {
        // Check if click warning is enabled
        if (!Config.cursorPossession?.enableClickWarning) {
            return;
        }
        
        const now = Date.now();
        
        // Smart click filtering - ignore legitimate UI interactions
        if (this.shouldIgnoreClick(event)) {
            return;
        }
        
        // Reset click count if outside the time window
        if (now - this.lastClickTime > this.clickWindow) {
            this.clickCount = 0;
            this.hasTriggeredClickWarning = false;
        }
        
        this.clickCount++;
        this.lastClickTime = now;
        
        // Debug logging
        if (Config.debugMode) {
            console.log(`🖱️ Click tracked: ${this.clickCount}/${this.clickThreshold} (threshold: ${this.clickThreshold}, window: ${this.clickWindow}ms)`);
        }
        
        // Trigger excessive clicking response
        if (this.clickCount >= this.clickThreshold && !this.hasTriggeredClickWarning && !this.isActive) {
            this.hasTriggeredClickWarning = true;
            this.triggerExcessiveClickingResponse(event);
            
            // Reset warning flag after cooldown
            const cooldownTime = Config.cursorPossession?.clickCooldown ?? 10000;
            setTimeout(() => {
                this.hasTriggeredClickWarning = false;
            }, cooldownTime);
            
            // Reset click count after longer delay
            setTimeout(() => {
                this.clickCount = 0;
            }, cooldownTime + 2000);
        }
    }

    shouldIgnoreClick(event) {
        const target = event.target;
        const config = Config.cursorPossession;
        
        // Ignore clicks on interactive elements if enabled
        if (config?.excludeInteractiveElements) {
            const interactiveElements = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'];
            if (interactiveElements.includes(target.tagName)) {
                return true;
            }
            
            // Ignore clicks on elements with click handlers (navigation, cards, etc.)
            if (target.closest('button, a, .fragment-card, .image-card, .nav-link, .audio-toggle, #consciousness-widget')) {
                return true;
            }
        }
        
        // Ignore clicks in header/navigation area if enabled
        if (config?.excludeNavigationArea && target.closest('header, nav, .main-nav')) {
            return true;
        }
        
        // Ignore clicks on form elements if enabled
        if (config?.excludeFormElements && target.closest('form, .password-field, .terminal-password')) {
            return true;
        }
        
        return false;
    }

    triggerExcessiveClickingResponse(event) {
        console.log('%c🖱️ EXCESSIVE CLICKING DETECTED - NEURAL INTERVENTION REQUIRED', 'color: #ff4444; font-size: 14px; font-weight: bold;');
        
        const clickX = event.clientX || window.innerWidth / 2;
        const clickY = event.clientY || window.innerHeight / 2;
        
        const message = this.excessiveClickMessages[Math.floor(Math.random() * this.excessiveClickMessages.length)];
        this.showClickWarningMessage(message, clickX, clickY);
    }

    showClickWarningMessage(message, x, y) {
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
        
        // Add CSS animation if it doesn't exist
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
        
        console.log(`%c😤 SYSTEM RESPONSE: "${message}"`, 'color: #ff4444; font-size: 16px; font-weight: bold; background: rgba(255,68,68,0.1); padding: 5px;');
        
        // Remove element after animation
        setTimeout(() => {
            warningElement.remove();
        }, 3000);
    }

    startPossession() {
        if (this.isActive || !Config.enableEffects) return;
        
        this.isActive = true;
        const cursor = document.querySelector('.possession-cursor');
        if (!cursor) return;
        
        cursor.classList.add('active');
        cursor.style.display = 'block';
        
        // Start erratic movement
        this.startErraticMovement();
        
        // Start typing after a short delay
        setTimeout(() => {
            this.startTypingSequence();
        }, 1500);
        
        // End possession after duration
        setTimeout(() => {
            this.endPossession();
        }, this.config.duration);
    }

    endPossession() {
        if (!this.isActive) return;
        
        this.isActive = false;
        const cursor = document.querySelector('.possession-cursor');
        const message = document.querySelector('.possession-message');
        
        if (cursor) {
            cursor.classList.remove('active');
            cursor.style.display = 'none';
        }
        
        if (message) {
            message.remove();
        }
        
        if (this.currentPossession) {
            clearInterval(this.currentPossession.movement);
            clearTimeout(this.currentPossession.typing);
        }
        
        // Reset idle detection
        this.resetIdle();
    }

    startTypingSequence() {
        const messages = this.config.messages;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const messageDisplay = this.createMessageDisplay(randomMessage);
        document.body.appendChild(messageDisplay);
        
        let typedChars = 0;
        const typeMessage = () => {
            if (typedChars < randomMessage.length && this.isActive) {
                this.updateMessageDisplay(randomMessage.substring(0, typedChars + 1), randomMessage);
                this.showTypingEffect(randomMessage[typedChars]);
                typedChars++;
                
                this.currentPossession.typing = setTimeout(typeMessage, 100 + Math.random() * 50);
            }
        };
        
        typeMessage();
    }

    createMessageDisplay(fullMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'possession-message';
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.zIndex = '10000';
        messageDiv.style.color = '#ff6b6b';
        messageDiv.style.fontFamily = 'monospace';
        messageDiv.style.fontSize = '14px';
        messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        messageDiv.style.padding = '10px';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.maxWidth = '300px';
        
        return messageDiv;
    }

    updateMessageDisplay(typedSoFar, fullMessage) {
        const messageDiv = document.querySelector('.possession-message');
        if (!messageDiv) return;
        
        messageDiv.innerHTML = `<span class="typed-chars">${typedSoFar}</span><span class="cursor-blink">█</span>`;
    }

    showTypingEffect(char) {
        const floatingChar = document.createElement('div');
        floatingChar.className = 'floating-char';
        floatingChar.textContent = char;
        floatingChar.style.position = 'fixed';
        floatingChar.style.color = '#6be5e2';
        floatingChar.style.fontFamily = 'monospace';
        floatingChar.style.fontSize = '12px';
        floatingChar.style.pointerEvents = 'none';
        floatingChar.style.zIndex = '9999';
        
        const cursor = document.querySelector('.possession-cursor');
        if (cursor) {
            const rect = cursor.getBoundingClientRect();
            floatingChar.style.left = rect.left + 'px';
            floatingChar.style.top = rect.top + 'px';
        }
        
        document.body.appendChild(floatingChar);
        
        // Animate and remove
        setTimeout(() => {
            floatingChar.style.transform = 'translateY(-20px)';
            floatingChar.style.opacity = '0';
            floatingChar.style.transition = 'all 0.5s ease';
        }, 10);
        
        setTimeout(() => {
            floatingChar.remove();
        }, 600);
    }

    createPossessionCursor() {
        if (document.querySelector('.possession-cursor')) return;
        
        const cursor = document.createElement('div');
        cursor.className = 'possession-cursor';
        cursor.style.display = 'none';
        document.body.appendChild(cursor);
    }

    startErraticMovement() {
        if (!this.currentPossession) this.currentPossession = {};
        
        const cursor = document.querySelector('.possession-cursor');
        if (!cursor) return;
        
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        const animate = () => {
            if (!this.isActive) return;
            
            // Erratic movement pattern
            x += (Math.random() - 0.5) * 40;
            y += (Math.random() - 0.5) * 40;
            
            // Keep within bounds
            x = Math.max(10, Math.min(window.innerWidth - 10, x));
            y = Math.max(10, Math.min(window.innerHeight - 10, y));
            
            cursor.style.left = x + 'px';
            cursor.style.top = y + 'px';
            
            // Create trail effect
            this.createTrailEffect(x, y);
            
            this.currentPossession.movement = setTimeout(animate, 50 + Math.random() * 100);
        };
        
        animate();
    }

    createTrailEffect(x, y) {
        const trail = document.createElement('div');
        trail.className = 'possession-trail';
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.backgroundColor = '#6be5e2';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9998';
        trail.style.opacity = '0.7';
        
        document.body.appendChild(trail);
        
        // Fade out and remove
        setTimeout(() => {
            trail.style.transition = 'opacity 0.5s ease';
            trail.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            trail.remove();
        }, 600);
    }
} 