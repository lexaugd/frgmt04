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
        console.log('🧠 Initializing frgmnt_04 neural interface...');
        
        // Initialize core modules first
        if (Config.enableEffects) {
            MatrixRain.start();
            AnimationLoop.start();
        }
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
        this.initIntroSequence();
        
        console.log('✅ Neural interface online');
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
                // Scan lines are independent - only remove if specifically disabled in config
                if (!Config.scanLines.enableScanLines) {
                    ScanLineManager.removeAll();
                }
                AnimationLoop.stop();
                TextEffects.fixStuckText(); // Clean up any lingering glitches
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
            // Clear any existing content
            Dom.terminalOutput.innerHTML = '';
            
            // Show cursor
            Dom.mainCursor.style.display = 'inline-block';
            
            // Start typing after a delay
            setTimeout(() => {
                this.typeLines(Dom.terminalOutput, lines, () => {
                    // Hide cursor and show intro text
                    Dom.mainCursor.style.display = 'none';
                    Dom.introText.classList.remove('hidden');
                    Dom.introText.classList.add('visible');
                });
            }, 3000);
        }
    },

    typeLines(element, lines, onComplete) {
        let lineIndex = 0;
        let charIndex = 0;
        
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
} 