// CardManager.js - Fragment Card Management with Fixed Closing
import Config from '../config.js';
import { State } from './State.js';

export const CardManager = {
    isTouchDevice: false,
    
    init: function() {
        // Detect touch device
        this.detectTouchDevice();
        
        // Initialize fragment cards
        this.initFragmentCards();
        
        // Initialize image cards
        this.initImageCards();
    },
    
    detectTouchDevice: function() {
        this.isTouchDevice = (('ontouchstart' in window) ||
                            (navigator.maxTouchPoints > 0) ||
                            (navigator.msMaxTouchPoints > 0));
        
        if (this.isTouchDevice) {
            document.body.classList.add('using-touch');
            if (Config.debugMode) console.log('%c📱 Touch device detected', 'color: #6be5e2;');
        } else {
            if (Config.debugMode) console.log('%c🖱️ Mouse device detected', 'color: #6be5e2;');
        }
    },
    
    initFragmentCards: function() {
        const fragmentCards = document.querySelectorAll('.fragment-card');

        fragmentCards.forEach((card, index) => {
            const viewButton = card.querySelector('.btn-neural-primary');
            const closeButton = card.querySelector('.extract-button'); // Using extract as close
            const injectButton = card.querySelector('.inject-button');
            const details = card.querySelector('.fragment-details');

            if (!viewButton || !details) return;

            const cardId = `fragment-${index}`;
            details.id = `${cardId}-details`;
            viewButton.setAttribute('aria-controls', details.id);
            viewButton.setAttribute('aria-expanded', 'false');
            card.setAttribute('role', 'region');
            const title = card.querySelector('h3');
            if (title) {
                title.id = `${cardId}-title`;
                card.setAttribute('aria-labelledby', title.id);
            }

            const expandCard = () => {
                if (card.classList.contains('expanded')) return;

                // Close any other expanded cards
                document.querySelectorAll('.fragment-card.expanded').forEach(otherCard => {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.btn-neural-primary').setAttribute('aria-expanded', 'false');
                    otherCard.querySelector('.fragment-details').setAttribute('aria-hidden', 'true');
                    otherCard.querySelector('.btn-neural-primary').textContent = '[view fragment]';
                    // Don't automatically pause audio when closing cards - let consciousness injection continue
                });

                card.classList.add('expanded');
                viewButton.setAttribute('aria-expanded', 'true');
                details.setAttribute('aria-hidden', 'false');
                viewButton.textContent = '[collapse fragment]';
                // Audio should only play when inject button is clicked, not when card opens
            };

            const collapseCard = () => {
                if (!card.classList.contains('expanded')) return;
                card.classList.remove('expanded');
                viewButton.setAttribute('aria-expanded', 'false');
                details.setAttribute('aria-hidden', 'true');
                viewButton.textContent = '[view fragment]';
                // Don't automatically pause audio when collapsing cards - let consciousness injection continue
            };

            // Button click handler (works on both desktop and mobile)
            viewButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (card.classList.contains('expanded')) {
                    collapseCard();
                } else {
                    expandCard();
                }
            });
            
            // Mobile: Add touch interaction for the entire card
            if (this.isTouchDevice) {
                const preview = card.querySelector('.fragment-preview');
                if (preview) {
                    preview.addEventListener('click', (e) => {
                        // Only expand if clicking on preview area (not buttons)
                        if (!e.target.closest('button')) {
                            e.stopPropagation();
                            if (card.classList.contains('expanded')) {
                                collapseCard();
                            } else {
                                expandCard();
                            }
                        }
                    });
                    
                    // Add visual feedback for touch
                    preview.style.cursor = 'pointer';
                    preview.addEventListener('touchstart', (e) => {
                        preview.style.transform = 'scale(0.98)';
                    }, { passive: true });
                    
                    preview.addEventListener('touchend', (e) => {
                        setTimeout(() => {
                            preview.style.transform = '';
                        }, 150);
                    }, { passive: true });
                }
            }
            
            if (injectButton) {
                injectButton.addEventListener('click', (e) => {
                    // No stopPropagation - this was causing the issue
                    this.handleConsciousnessInjection(e);
                });
            }

            const extractButton = card.querySelector('.extract-button');
            if (extractButton) {
                extractButton.addEventListener('click', (e) => {
                    this.handleConsciousnessExtraction(e);
                });
            }

            // Add a listener for a dedicated close button if it exists
            if (closeButton) {
                closeButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    collapseCard();
                });
            }
        });
    },
    
    initImageCards: function() {
        const imageCards = document.querySelectorAll('.image-card');
        
        imageCards.forEach((card, index) => {
            if (this.isTouchDevice) {
                // Mobile: Tap to expand/collapse
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close any other expanded image cards
                    document.querySelectorAll('.image-card.tap-expanded').forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('tap-expanded');
                        }
                    });
                    
                    // Toggle this card
                    card.classList.toggle('tap-expanded');
                    
                    if (Config.debugMode) {
                        console.log(`%c📱 Image card ${index} ${card.classList.contains('tap-expanded') ? 'expanded' : 'collapsed'}`, 'color: #6be5e2;');
                    }
                });
                
                // Add touch feedback
                card.addEventListener('touchstart', (e) => {
                    if (!card.classList.contains('tap-expanded')) {
                        card.style.transform = 'scale(0.98)';
                    }
                }, { passive: true });
                
                card.addEventListener('touchend', (e) => {
                    if (!card.classList.contains('tap-expanded')) {
                        setTimeout(() => {
                            card.style.transform = '';
                        }, 150);
                    }
                }, { passive: true });
                
                // Close expanded card when clicking outside
                document.addEventListener('click', (e) => {
                    if (!card.contains(e.target) && card.classList.contains('tap-expanded')) {
                        card.classList.remove('tap-expanded');
                    }
                });
            }
        });
    },

    handleConsciousnessInjection: function(e) {
        e.preventDefault();
        const injector = e.target.closest('.consciousness-injector');
        const audio = injector.querySelector('audio');
        const progressContainer = injector.querySelector('.consciousness-progress');
        const progressFill = injector.querySelector('.progress-fill');
        const progressPercentage = injector.querySelector('.progress-percentage');
        const extractButton = injector.querySelector('.extract-button');
        const injectButton = e.target;
        
        if (audio && audio.paused) {
            // Stop any other consciousness injections
            document.querySelectorAll('.consciousness-injector').forEach(otherInjector => {
                const otherAudio = otherInjector.querySelector('audio');
                const otherInjectBtn = otherInjector.querySelector('.inject-button');
                const otherProgressContainer = otherInjector.querySelector('.consciousness-progress');
                const otherExtractBtn = otherInjector.querySelector('.extract-button');
                const otherProgressFill = otherInjector.querySelector('.progress-fill');
                const otherProgressPercentage = otherInjector.querySelector('.progress-percentage');
                
                if (otherAudio && !otherAudio.paused && otherInjector !== injector) {
                    otherAudio.pause();
                    otherInjectBtn.textContent = '[inject_fragment]';
                    otherInjectBtn.classList.remove('hidden');
                    otherProgressContainer.classList.add('hidden');
                    otherExtractBtn.classList.add('hidden');
                    // Reset progress bar
                    if (otherProgressFill) otherProgressFill.style.width = '0%';
                    if (otherProgressPercentage) otherProgressPercentage.textContent = '0%';
                    
                    if (Config.debugMode) console.log('%c⏸ Previous consciousness injection stopped', 'color: #9ea1a4;');
                }
            });
            
            // Stop background audio if playing
            const backgroundAudio = document.getElementById('background-audio');
            if (backgroundAudio && !backgroundAudio.paused) {
                backgroundAudio.pause(); // This will trigger the event listeners in main.js to update the UI state
                if (Config.debugMode) console.log('%c🔇 Background audio stopped for consciousness injection', 'color: #9ea1a4;');
            }
            
            // Start consciousness injection
            audio.play().catch(e => console.error('Consciousness injection failed:', e));
            injectButton.textContent = '[neural_pattern_active]';
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
                injectButton.textContent = '[injection_complete]';
                extractButton.classList.remove('hidden');
                if (Config.debugMode) console.log('%c🔬 NEURAL PATTERN FULLY INTEGRATED', 'color: #6be5e2;');
            });
            
        } else if (audio && !audio.paused) {
            // Stop consciousness injection
            audio.pause();
            injectButton.textContent = '[inject_fragment]';
            progressContainer.classList.add('hidden');
            extractButton.classList.add('hidden');
            progressFill.style.width = '0%';
            progressPercentage.textContent = '0%';
            
            if (Config.debugMode) console.log('%c⏸ Consciousness injection interrupted', 'color: #9ea1a4;');
        }
        
        // Increase corruption on consciousness interaction
        if (State.consciousnessMapper) {
            State.consciousnessMapper.increaseCorruption();
        }
    },

    handleConsciousnessExtraction: function(e) {
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
            if (State.consciousnessMapper) {
                State.consciousnessMapper.increaseCorruption();
            }
        }
    }
}; 