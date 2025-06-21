// main.js - Application Orchestrator (ES6 Module Version)
import Config from './config.js';
import { State } from './modules/State.js';
import { Dom } from './modules/Dom.js';
import { fetchText } from './modules/Utils.js';
import { TextEffects } from './modules/TextEffects.js';
import { MatrixRain } from './modules/MatrixRain.js';
import { ScanLineManager } from './modules/ScanLineManager.js';
import { AnimationLoop } from './modules/AnimationLoop.js';
import { create as createTypewriter } from './modules/Typewriter.js';
import { CardManager } from './modules/CardManager.js';
import { ConsciousnessMapper } from './modules/ConsciousnessMapper.js';
import { InspectionTrap } from './modules/InspectionTrap.js';
import { CursorPossession } from './modules/CursorPossession.js';
import { SidebarManager } from './modules/SidebarManager.js';

const App = {
    async init() {
    
        
        // Initialize core modules first
        if (Config.enableEffects) {
            MatrixRain.start();
            AnimationLoop.start();
        }
        
        // Make MatrixRain globally accessible for config changes
        window.MatrixRain = MatrixRain;
                ScanLineManager.init();
        CardManager.init();

        // Initialize consciousness modules
            State.consciousnessMapper = new ConsciousnessMapper();
        await State.consciousnessMapper.init();
            
            State.inspectionTrap = new InspectionTrap();
            State.inspectionTrap.init();
            
            State.cursorPossession = new CursorPossession();
            State.cursorPossession.init();
            
            // Initialize sidebar navigation
            State.sidebarManager = new SidebarManager();
            
                        // Initialize UI interactions
            this.initGlitchToggle();
        await this.initTypewriters();
        this.initPasswordSystem();
        this.initScrollBehavior();
        this.initAudioSystem();
        this.initLogoCorruption();
        this.initIntroSequence();
        

    },

    initGlitchToggle() {
        if (!Dom.glitchToggle) return;

        Dom.glitchToggle.addEventListener('click', () => {
            Config.enableEffects = !Config.enableEffects;
                document.body.classList.toggle('glitches-disabled', !Config.enableEffects);
            Dom.glitchToggle.classList.toggle('disabled', !Config.enableEffects);

            if (Config.enableEffects) {
                MatrixRain.start();
                ScanLineManager.init(); // Re-creates scan lines
                AnimationLoop.start();
            } else {
                MatrixRain.stop();
                ScanLineManager.removeAll(); // Always remove scan lines when effects are disabled
                AnimationLoop.stop();
                TextEffects.fixStuckText(); // Clean up any lingering glitches
            }
            
            // Close sidebar on mobile after glitch toggle
            if (window.matchMedia('(max-width: 767px)').matches && State.sidebarManager) {
                setTimeout(() => State.sidebarManager.collapseSidebar(), 300);
            }
        });
    },

        async initTypewriters() {
        // Hint Terminal - Operational Status Message
        const hintText = `accessing operational status...

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

        const hintTyper = createTypewriter({
            element: Dom.hintOutput,
            text: hintText,
            speed: 30,
            cursor: Dom.hintOutput.nextElementSibling
        });

                Dom.hintButton.addEventListener('click', () => {
                    Dom.hintButton.style.display = 'none';
                    Dom.hintTerminal.classList.remove('hidden');
            hintTyper.start();
            
            // Increase corruption on hint access
            if (State.consciousnessMapper) {
                State.consciousnessMapper.increaseCorruption();
            }
        });
                Dom.closeHintButton.addEventListener('click', () => {
                        Dom.hintTerminal.classList.add('hidden');
                        Dom.hintButton.style.display = 'inline-block';
            hintTyper.stop();
        });

        // About Terminal
        const aboutText = await fetchText('assets/data/about.txt');
        const aboutTyper = createTypewriter({
            element: Dom.aboutOutput,
            text: aboutText,
            speed: Config.typewriterSpeed,
            cursor: Dom.aboutOutput.nextElementSibling
        });

                        Dom.aboutButton.addEventListener('click', () => {
            // Toggle about terminal - if showing, hide it; if hidden, show it
            if (Dom.aboutTerminal.classList.contains('show')) {
                Dom.aboutTerminal.classList.remove('show');
                aboutTyper.stop();
            } else {
                Dom.aboutTerminal.classList.remove('hidden', 'show'); // Reset animation state
                void Dom.aboutTerminal.offsetWidth; // Trigger reflow
                Dom.aboutTerminal.classList.add('show');
                aboutTyper.start();
            }
            
            // Close sidebar on mobile after about terminal action
            if (window.matchMedia('(max-width: 767px)').matches && State.sidebarManager) {
                setTimeout(() => State.sidebarManager.collapseSidebar(), 300);
            }
        });
                Dom.closeAboutButton.addEventListener('click', () => {
                    Dom.aboutTerminal.classList.remove('show');
            aboutTyper.stop();
        });
    },

    initPasswordSystem() {
        // Password prompt typewriter
        const passwordTyper = createTypewriter({
            element: Dom.passwordPrompt,
            text: Config.passwordPrompt,
            speed: Config.typewriterSpeed,
            onComplete: () => {
                Dom.passwordInput.classList.remove('hidden');
                Dom.passwordInput.focus();
            }
        });
        passwordTyper.start();

        Dom.passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
                }
            });
        },

        checkPassword() {
            const enteredPassword = Dom.passwordInput.value;
        
        // Get first 8 characters of consciousness ID (after "NEURAL_")
            const consciousnessAccess = State.consciousnessMapper && State.consciousnessMapper.consciousnessId ?
                State.consciousnessMapper.consciousnessId.slice(7, 15) : null;
            
        if (enteredPassword === 'inspector') {
            // Basic inspector access
            const refCode = 'REF_' + Math.random().toString(36).substr(2, 8).toUpperCase();
            
            Dom.passwordResult.innerHTML = `
                    <div style="margin-bottom: 1rem; color: #6be5e2; font-style: italic;">What do you need this to feel like — even if you can't explain why?</div>
                    <div class="glitch-subtle">NEURAL_LINK_ESTABLISHED</div>
                    <div style="margin-top: 0.5rem;">>> direct_contact: frgmnt_04@proton.me</div>
                    <div style="margin-top: 0.5rem;">>> reference_code: ${refCode}</div>
                    <div style="margin-top: 0.5rem;">>> status: inspector_verified</div>
                    <div style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">mention your reference code for priority processing</div>
                    <div style="font-size: 0.9rem; opacity: 0.7;">deep access fragments available on request</div>
                `;
            Dom.passwordResult.className = 'success';
            Dom.passwordResult.classList.remove('hidden');
            
            // Increase corruption on successful access
            if (State.consciousnessMapper) {
                State.consciousnessMapper.increaseCorruption();
                if (Config.debugMode) console.log('%c🔓 NEURAL BARRIER BREACHED', 'color: #ff4444; font-weight: bold;');
                if (Config.debugMode) console.log('%cDeeper access granted. Consciousness integration accelerated.', 'color: #6be5e2;');
            }
            } else if (consciousnessAccess && enteredPassword === consciousnessAccess) {
            // Advanced consciousness access
                const deepRefCode = 'DEEP_' + Math.random().toString(36).substr(2, 8).toUpperCase();
            
            Dom.passwordResult.innerHTML = `
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
            Dom.passwordResult.className = 'success';
            Dom.passwordResult.classList.remove('hidden');
            
            // Increase corruption more significantly for consciousness access
                if (State.consciousnessMapper) {
                    State.consciousnessMapper.increaseCorruption();
                State.consciousnessMapper.increaseCorruption(); // Double corruption for deep access
                if (Config.debugMode) console.log('%c🧠 CONSCIOUSNESS INTEGRATION ACHIEVED', 'color: #ff4444; font-weight: bold;');
                if (Config.debugMode) console.log('%cDeep neural patterns synchronized. Maximum priority granted.', 'color: #6be5e2;');
                if (Config.debugMode) console.log(`%cPersonalized access enabled for: ${State.consciousnessMapper.consciousnessId}`, 'color: #ffffff; font-family: monospace;');
                }
            } else if (enteredPassword.length > 0) {
            Dom.passwordResult.innerHTML = `
                    <div>ACCESS_DENIED</div>
                    <div style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.7;">try inspecting deeper...</div>
                `;
            Dom.passwordResult.className = 'error';
            Dom.passwordResult.classList.remove('hidden');
            
                setTimeout(() => {
                    Dom.passwordInput.value = '';
                    Dom.passwordResult.classList.add('hidden');
                }, 2000);
            }
    },

    initScrollBehavior() {
        if (!Dom.scrollToTopButton) return;

        const toggleScrollButton = () => {
            const scrolled = window.pageYOffset > 300;
            Dom.scrollToTopButton.classList.toggle('visible', scrolled);
        };

        window.addEventListener('scroll', toggleScrollButton, { passive: true });
        
        Dom.scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Close sidebar on mobile after scroll action
            if (window.matchMedia('(max-width: 767px)').matches && State.sidebarManager) {
                setTimeout(() => State.sidebarManager.collapseSidebar(), 300);
                }
            });
        },

    initAudioSystem() {
            const audioElement = document.getElementById('background-audio');
            const audioToggle = document.getElementById('audio-toggle');
        const audioContainer = document.querySelector('.audio-player-container');
        
        // Track audio state properly
        let audioPlaying = false;
        
        // Update state when audio ends or is paused externally
        if (audioElement) {
            audioElement.addEventListener('pause', () => {
                audioPlaying = false;
                audioContainer.classList.remove('audio-on');
            });
            audioElement.addEventListener('play', () => {
                audioPlaying = true;
                audioContainer.classList.add('audio-on');
            });
        }
        
            if (audioElement && audioToggle) {
                audioElement.volume = 0.4;
            
                audioToggle.addEventListener('click', () => {
                if (audioPlaying) {
                    audioElement.pause();
                    audioContainer.classList.remove('audio-on');
                    if (Config.debugMode) console.log('%c🔇 NEURAL AUDIO LINK SEVERED', 'color: #9ea1a4;');
                } else {
                    // Stop any active consciousness injections before starting background audio
                    document.querySelectorAll('.consciousness-injector').forEach(injector => {
                        const injectorAudio = injector.querySelector('audio');
                        const injectBtn = injector.querySelector('.inject-button');
                        const progressContainer = injector.querySelector('.consciousness-progress');
                        const extractBtn = injector.querySelector('.extract-button');
                        const progressFill = injector.querySelector('.progress-fill');
                        const progressPercentage = injector.querySelector('.progress-percentage');
                        
                        if (injectorAudio && !injectorAudio.paused) {
                            injectorAudio.pause();
                            injectBtn.textContent = '[inject_fragment]';
                            injectBtn.classList.remove('hidden');
                            progressContainer.classList.add('hidden');
                            extractBtn.classList.add('hidden');
                            if (progressFill) progressFill.style.width = '0%';
                            if (progressPercentage) progressPercentage.textContent = '0%';
                            
                            if (Config.debugMode) console.log('%c⏸ Consciousness injection stopped for background audio', 'color: #9ea1a4;');
                        }
                    });
                    
                    audioElement.play().catch(e => console.error('Audio play failed:', e));
                    audioContainer.classList.add('audio-on');
                    if (Config.debugMode) console.log('%c🔊 NEURAL AUDIO LINK ESTABLISHED', 'color: #6be5e2;');
                    if (Config.debugMode) console.log('%cSubliminal consciousness programming active.', 'color: #9ea1a4;');
                }
                audioPlaying = !audioPlaying;
                });
            }
        },

    initIntroSequence() {
        // Start intro terminal typewriter effect
        const lines = [
            "booting fragment_04...",
            "loading inspector_protocols...",
            "protocol initialized...",
            "unauthorized access granted"
        ];

        if (Dom.terminalOutput && Dom.introText && Dom.mainCursor) {
            if (Config.debugMode) console.log('🔧 LAYOUT SHIFT FIX: Pre-allocating terminal container space');
            
            // Pre-allocate space on the terminal CONTAINER, not just the output
            const terminalContainer = Dom.terminalOutput.parentElement; // This is .terminal
            const fullText = lines.join('<br>');
            Dom.terminalOutput.innerHTML = fullText;
            const terminalHeight = Dom.terminalOutput.offsetHeight;
            Dom.terminalOutput.innerHTML = '';
            
            // Set height on the container that's positioned, not just the output span
            terminalContainer.style.height = terminalHeight + 'px';
            terminalContainer.style.minHeight = terminalHeight + 'px';
            
            // Show cursor immediately
            Dom.mainCursor.style.display = 'inline-block';
            
            // Start typing after delay
            setTimeout(() => {
                this.typeLines(Dom.terminalOutput, lines, () => {
                    // Hide cursor and reveal intro text
                    Dom.mainCursor.style.display = 'none';
                    if (Dom.introText) {
                        Dom.introText.style.visibility = 'visible';
                        Dom.introText.style.opacity = '1';
                    }
                }, false);
            }, 3000);
        }
    },

    initLogoCorruption() {
        const logoText = document.querySelector('.logo-text');
        const logoSubtitle = document.querySelector('.logo-subtitle');
        
        // Get all sidebar navigation labels
        const sidebarLabels = document.querySelectorAll('.sidebar-label');
        
        // Get intro text elements
        const introTextPs = document.querySelectorAll('#intro-text p');
        const terminalOutput = document.getElementById('terminal-output');
        
        if (!logoText || !logoSubtitle) return;
        
        const originalText = logoText.textContent;
        const originalSubtitle = logoSubtitle.textContent;
        
        // Store original sidebar label texts
        const originalSidebarTexts = new Map();
        sidebarLabels.forEach(label => {
            originalSidebarTexts.set(label, label.textContent);
        });
        
        // Store original intro text
        const originalIntroTexts = new Map();
        introTextPs.forEach(p => {
            originalIntroTexts.set(p, p.innerHTML); // Use innerHTML to preserve <br> tags
        });
        
        // Store original terminal output
        let originalTerminalText = '';
        if (terminalOutput) {
            originalTerminalText = terminalOutput.innerHTML;
        }
        
        // LAYOUT-SAFE CORRUPTION: Use same-width characters to preserve glitch philosophy
        const monoCorruptChars = ['█', '▓', '▒', '░', '■', '□']; // Block chars that work in monospace
        
        const corruptTextContent = (element, original) => {
            // REAL text corruption - replace characters with same-width corruption chars
            const chars = original.split('');
            const corrupted = chars.map(char => {
                // 25% chance to corrupt each character (except spaces and underscores)
                if (char !== ' ' && char !== '_' && Math.random() < 0.25) {
                    return monoCorruptChars[Math.floor(Math.random() * monoCorruptChars.length)];
                }
                return char;
            }).join('');
            
            // Force monospace font to ensure consistent character width
            const originalFont = element.style.fontFamily;
            element.style.fontFamily = 'var(--font-mono)';
            element.textContent = corrupted;
            
            // Restore original after 300-800ms
            setTimeout(() => {
                element.textContent = original;
                element.style.fontFamily = originalFont;
            }, 300 + Math.random() * 500);
        };
        
        const corruptTextSafe = (element, original) => {
            // REAL HTML corruption - replace text content while preserving HTML structure
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = original;
            
            // Corrupt only text nodes, not HTML tags
            const textNodes = [];
            const walker = document.createTreeWalker(
                tempDiv,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }
            
            // Corrupt text in text nodes
            textNodes.forEach(textNode => {
                const text = textNode.textContent;
                const chars = text.split('');
                const corrupted = chars.map(char => {
                    // 20% chance to corrupt (lower for HTML to preserve readability)
                    if (char !== ' ' && char !== '\n' && char !== '\t' && Math.random() < 0.2) {
                        return monoCorruptChars[Math.floor(Math.random() * monoCorruptChars.length)];
                    }
                    return char;
                }).join('');
                textNode.textContent = corrupted;
            });
            
            // Force monospace font to ensure consistent character width
            const originalFont = element.style.fontFamily;
            element.style.fontFamily = 'var(--font-mono)';
            element.innerHTML = tempDiv.innerHTML;
            
            // Restore original after 300-800ms
            setTimeout(() => {
                element.innerHTML = original;
                element.style.fontFamily = originalFont;
            }, 300 + Math.random() * 500);
        };
        
        const startCorruption = () => {
            // Always corrupt logo text
            corruptTextContent(logoText, originalText);
            
            // Corrupt subtitle 50% of the time
            if (Math.random() < 0.5) {
                setTimeout(() => {
                    corruptTextContent(logoSubtitle, originalSubtitle);
                }, 200 + Math.random() * 400);
            }
            
            // Corrupt random sidebar labels (30% chance each)
            sidebarLabels.forEach(label => {
                if (Math.random() < 0.3) {
                    const original = originalSidebarTexts.get(label);
                    setTimeout(() => {
                        corruptTextContent(label, original);
                    }, Math.random() * 1000);
                }
            });
            
            // Corrupt intro text paragraphs with layout-safe method (20% chance each)
            introTextPs.forEach(p => {
                if (Math.random() < 0.2) {
                    const original = originalIntroTexts.get(p);
                    setTimeout(() => {
                        corruptTextSafe(p, original);
                    }, Math.random() * 1200);
                }
            });
            
            // Corrupt terminal output with layout-safe method (15% chance)
            if (terminalOutput && originalTerminalText && Math.random() < 0.15) {
                setTimeout(() => {
                    corruptTextSafe(terminalOutput, originalTerminalText);
                }, Math.random() * 800);
            }
        };
        
        // Start corruption cycles every 3-6 seconds
        const scheduleNext = () => {
            setTimeout(() => {
                if (Config.enableEffects) {
                    startCorruption();
                }
                scheduleNext();
            }, 3000 + Math.random() * 3000);
        };
        
        // Start first corruption after 2 seconds
        setTimeout(() => {
            if (Config.enableEffects) {
                startCorruption();
            }
            scheduleNext();
        }, 2000);
    },

    typeLines(element, lines, onComplete, shouldClearFirst = false) {
        let lineIndex = 0;
        let charIndex = 0;
        
        // Clear content if requested
        if (shouldClearFirst) {
            element.innerHTML = '';
        }
        
        const type = () => {
            if (lineIndex < lines.length) {
                const currentLine = lines[lineIndex];
                if (charIndex < currentLine.length) {
                    element.innerHTML += currentLine.charAt(charIndex);
                    charIndex++;
                    setTimeout(type, 50 + Math.random() * 30);
            } else {
                    element.innerHTML += '<br>';
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(type, 300);
                }
            } else if (onComplete) {
                onComplete();
            }
        };
        
        type();
    }
};

// Unregister service worker if disabled in config
if (!Config.enableServiceWorker && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
} 