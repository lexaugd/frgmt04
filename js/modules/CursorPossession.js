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
            idleTime: Config.cursorPossession?.idleThreshold ?? this.idleTimeout,
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
        
        // Throttle touch events to prevent constant resetting on mobile
        let touchThrottle = false;
        const throttledTouchReset = () => {
            if (!touchThrottle) {
                touchThrottle = true;
                resetIdle();
                setTimeout(() => {
                    touchThrottle = false;
                }, 1000); // Only reset once per second for touch events
            }
        };
        
        // Track mouse movement, clicks, and key presses (immediate reset)
        document.addEventListener('mousemove', resetIdle, { passive: true });
        document.addEventListener('mousedown', resetIdle, { passive: true });
        document.addEventListener('keypress', resetIdle, { passive: true });
        document.addEventListener('scroll', resetIdle, { passive: true });
        
        // Track touch events with throttling to prevent constant resetting
        document.addEventListener('touchstart', throttledTouchReset, { passive: true });
        document.addEventListener('touchmove', throttledTouchReset, { passive: true });
        document.addEventListener('touchend', resetIdle, { passive: true }); // touchend can reset immediately
        
        // Track clicks for excessive clicking detection
        document.addEventListener('click', (e) => {
            resetIdle();
            this.trackClick(e);
        });
        
        // Start the idle timer
        this.resetIdle();
    }

    resetIdle() {
        // If possession is active, end it immediately but smoothly
        if (this.isActive) {
            this.endPossessionSmoothly();
            return;
        }
        
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
        
        // Ensure the message stays within screen bounds
        const maxWidth = window.innerWidth - 40; // Leave 40px margin
        const constrainedX = Math.max(20, Math.min(window.innerWidth - 20, x));
        const constrainedY = Math.max(60, Math.min(window.innerHeight - 20, y)); // Extra top margin for mobile
        
        warningElement.style.cssText = `
            position: fixed;
            left: ${constrainedX}px;
            top: ${constrainedY}px;
            background: rgba(255, 68, 68, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: ${window.innerWidth <= 767 ? '12px' : '14px'};
            font-weight: bold;
            z-index: 10000;
            pointer-events: none;
            transform: translate(-50%, -100%);
            animation: clickWarningPulse 3s ease-out forwards;
            box-shadow: 0 2px 10px rgba(255, 68, 68, 0.3);
            border: 1px solid #ff6666;
            max-width: ${maxWidth}px;
            word-wrap: break-word;
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
        
        // Start scattered character effects
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
        
        // Clean up message
        const message = document.querySelector('.possession-message');
        if (message) {
            message.remove();
        }
        
        // Clean up scattered characters
        const scatteredChars = document.querySelectorAll('.scattered-possession-char');
        scatteredChars.forEach(char => char.remove());
        
        // Clean up floating characters
        const floatingChars = document.querySelectorAll('.floating-char');
        floatingChars.forEach(char => char.remove());
        
        if (this.currentPossession) {
            clearTimeout(this.currentPossession.movement);
            clearTimeout(this.currentPossession.typing);
        }
        
        // Reset idle detection
        this.resetIdle();
    }

    endPossessionSmoothly() {
        if (!this.isActive) return;
        
        this.isActive = false;
        
        // Stop creating new effects
        if (this.currentPossession) {
            clearTimeout(this.currentPossession.movement);
            clearTimeout(this.currentPossession.typing);
        }
        
        // Smoothly fade out message
        const message = document.querySelector('.possession-message');
        if (message) {
            // First, quickly fade out the text content
            const textContent = message.querySelector('.typed-chars');
            const cursor = message.querySelector('.cursor-blink');
            
            if (textContent) {
                textContent.style.transition = 'opacity 0.2s ease-out';
                textContent.style.opacity = '0';
            }
            if (cursor) {
                cursor.style.transition = 'opacity 0.2s ease-out';
                cursor.style.opacity = '0';
            }
            
            // Then fade out the entire message box
            setTimeout(() => {
                message.style.transition = 'all 0.4s ease-out';
                message.style.opacity = '0';
                
                // Handle transform properly for mobile (which uses translateX(-50%)) vs desktop
                const currentTransform = message.style.transform || '';
                if (currentTransform.includes('translateX(-50%)')) {
                    // Mobile: preserve the centering transform and add scale
                    message.style.transform = 'translateX(-50%) scale(0.8)';
                } else {
                    // Desktop: just add scale to existing transform
                    message.style.transform = currentTransform + ' scale(0.8)';
                }
                
                setTimeout(() => {
                    message.remove();
                }, 400);
            }, 200);
        }
        
        // Smoothly fade out scattered characters
        const scatteredChars = document.querySelectorAll('.scattered-possession-char');
        scatteredChars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transition = 'all 0.3s ease-out';
                char.style.opacity = '0';
                char.style.transform = (char.style.transform || '') + ' scale(0.5)';
                setTimeout(() => {
                    char.remove();
                }, 300);
            }, index * 50); // Stagger the fade-out
        });
        
        // Smoothly fade out floating characters
        const floatingChars = document.querySelectorAll('.floating-char');
        floatingChars.forEach((char, index) => {
            setTimeout(() => {
                char.style.transition = 'all 0.4s ease-out';
                char.style.opacity = '0';
                char.style.transform = (char.style.transform || '') + ' scale(0.3)';
                setTimeout(() => {
                    char.remove();
                }, 400);
            }, index * 30); // Stagger the fade-out
        });
        
        // Reset idle detection after smooth transition
        setTimeout(() => {
            this.resetIdle();
        }, 600);
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
        messageDiv.style.zIndex = '10000';
        messageDiv.style.color = '#ff6b6b';
        messageDiv.style.fontFamily = 'monospace';
        messageDiv.style.fontSize = '14px';
        messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        messageDiv.style.padding = '15px 20px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.border = '1px solid #ff6b6b';
        messageDiv.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
        
        // Essential text wrapping and sizing properties
        messageDiv.style.wordWrap = 'break-word';
        messageDiv.style.whiteSpace = 'pre-wrap';
        messageDiv.style.overflowWrap = 'break-word';
        messageDiv.style.boxSizing = 'border-box';
        messageDiv.style.minHeight = '50px';
        messageDiv.style.display = 'block';
        
        // Random position in center area of screen
        const margin = 120;
        const maxWidth = 300;
        const isMobile = window.innerWidth <= 767;
        
        if (isMobile) {
            // Mobile: center horizontally, random vertical in middle third
            messageDiv.style.left = '50%';
            messageDiv.style.transform = 'translateX(-50%)';
            messageDiv.style.top = (window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4) + 'px';
            messageDiv.style.maxWidth = `${window.innerWidth - 40}px`;
            messageDiv.style.width = `${window.innerWidth - 40}px`;
            messageDiv.style.fontSize = '12px';
        } else {
            // Desktop: random position in center area
            const x = margin + Math.random() * (window.innerWidth - margin * 2 - maxWidth);
            const y = margin + Math.random() * (window.innerHeight - margin * 2 - 100);
            
            messageDiv.style.left = x + 'px';
            messageDiv.style.top = y + 'px';
            messageDiv.style.maxWidth = maxWidth + 'px';
            messageDiv.style.width = maxWidth + 'px';
        }
        
        return messageDiv;
    }

    updateMessageDisplay(typedSoFar, fullMessage) {
        const messageDiv = document.querySelector('.possession-message');
        if (!messageDiv) return;
        
        messageDiv.innerHTML = `<span class="typed-chars">${typedSoFar}</span><span class="cursor-blink">█</span>`;
    }

    showTypingEffect(char) {
        // Create floating character from random position near message
        const messageDiv = document.querySelector('.possession-message');
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        
        if (messageDiv) {
            const rect = messageDiv.getBoundingClientRect();
            x = rect.left + rect.width / 2 + (Math.random() - 0.5) * 100;
            y = rect.top + rect.height / 2 + (Math.random() - 0.5) * 100;
        }
        
        const floatingChar = document.createElement('div');
        floatingChar.className = 'floating-char';
        floatingChar.textContent = char;
        floatingChar.style.position = 'fixed';
        floatingChar.style.left = x + 'px';
        floatingChar.style.top = y + 'px';
        floatingChar.style.color = '#6be5e2';
        floatingChar.style.fontFamily = 'monospace';
        floatingChar.style.fontSize = '14px';
        floatingChar.style.pointerEvents = 'none';
        floatingChar.style.zIndex = '9999';
        floatingChar.style.textShadow = '0 0 8px #6be5e2';
        floatingChar.style.opacity = '0.9';
        
        document.body.appendChild(floatingChar);
        
        // Animate and remove
        setTimeout(() => {
            floatingChar.style.transform = `translate(${(Math.random() - 0.5) * 60}px, ${-30 - Math.random() * 40}px) scale(0.7)`;
            floatingChar.style.opacity = '0';
            floatingChar.style.transition = 'all 0.8s ease-out';
        }, 50);
        
        setTimeout(() => {
            floatingChar.remove();
        }, 850);
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
        
        // Create scattered random characters instead of single cursor
        const characters = ['█', '▓', '▒', '░', '▪', '▫', '●', '○', '◆', '◇', '■', '□'];
        const colors = ['#ff6b6b', '#ff4444', '#ff8888', '#ffaaaa'];
        
        const createScatteredChar = () => {
            if (!this.isActive) return;
            
            // Random position in center area (avoid edges)
            const margin = 100;
            const x = margin + Math.random() * (window.innerWidth - margin * 2);
            const y = margin + Math.random() * (window.innerHeight - margin * 2);
            
            const char = document.createElement('div');
            char.className = 'scattered-possession-char';
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.position = 'fixed';
            char.style.left = x + 'px';
            char.style.top = y + 'px';
            char.style.color = colors[Math.floor(Math.random() * colors.length)];
            char.style.fontFamily = 'monospace';
            char.style.fontSize = (12 + Math.random() * 8) + 'px';
            char.style.pointerEvents = 'none';
            char.style.zIndex = '9999';
            char.style.opacity = '0.8';
            char.style.textShadow = `0 0 5px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            document.body.appendChild(char);
            
            // Animate and remove
            setTimeout(() => {
                char.style.transition = 'all 1s ease-out';
                char.style.opacity = '0';
                char.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(0.5)`;
            }, 100);
            
            setTimeout(() => {
                char.remove();
            }, 1100);
            
            // Schedule next character
            if (this.isActive) {
                this.currentPossession.movement = setTimeout(createScatteredChar, 150 + Math.random() * 200);
            }
        };
        
        createScatteredChar();
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