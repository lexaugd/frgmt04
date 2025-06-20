// TextEffects.js - Text Corruption and Glitch Effects
import Config from '../config.js';

const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

export const TextEffects = {
    glitchCharacters: ['█', '▓', '░', '▒', '▄', '▀', '■', '□', '▪', '▫', '◆', '◇', '◼', '◻', '⬛', '⬜'],

    corrupt: function(element, duration = 2000, intensity = 0.1) {
        if (!Config.enableEffects || !element || !element.textContent) return;

        const originalText = element.textContent;
        const textArray = originalText.split('');
        const startTime = Date.now();
        const adjustedDuration = duration * Config.animationQuality;
        const adjustedIntensity = intensity * Config.animationQuality;
        let isRestored = false;
        let animationId = null;
        let backupTimeoutId = null;
        
        if (!element.dataset.originalText) {
            element.dataset.originalText = originalText;
        }
        
        const restoreText = () => {
            if (isRestored) return;
            isRestored = true;
            
            if (animationId) {
                if (isSafari || isIOS) {
                    clearTimeout(animationId);
                } else {
                    cancelAnimationFrame(animationId);
                }
            }
            if (backupTimeoutId) clearTimeout(backupTimeoutId);
            
            const textToRestore = element.dataset.originalText || originalText;
            element.textContent = textToRestore;
        };
        
        const doCorruption = () => {
            if (isRestored) return;
            
            const elapsed = Date.now() - startTime;
            
            if (elapsed >= adjustedDuration) {
                restoreText();
                return;
            }
            
            const corruptedArray = textArray.map(char => {
                if (char !== ' ' && Math.random() < adjustedIntensity) {
                    return this.glitchCharacters[Math.floor(Math.random() * this.glitchCharacters.length)];
                }
                return char;
            });
            
            element.textContent = corruptedArray.join('');
            
            if (typeof isSafari !== 'undefined' && (isSafari || isIOS)) {
                animationId = setTimeout(doCorruption, 16);
            } else {
                animationId = requestAnimationFrame(doCorruption);
            }
        };
        
        backupTimeoutId = setTimeout(() => {
            if (!isRestored) restoreText();
        }, adjustedDuration + 500);
        
        doCorruption();
    },

    applyCorruption: function() {
        if (!Config.enableEffects) return;

        const targetSelectors = [
            '#intro-text p', '.glitch-target', '.fragment-card h3',
            '.fragment-details p', 'footer p'
        ];
        
        const allElements = [];
        targetSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.closest('#access-form')) {
                    allElements.push(element);
                }
            });
        });
        
        const numToCorrupt = Math.min(2, Math.floor(Math.random() * 2) + 1);
        const shuffled = allElements.sort(() => 0.5 - Math.random());
        const elementsToCorrupt = shuffled.slice(0, numToCorrupt);
        
        elementsToCorrupt.forEach(element => {
            const intensity = Math.random() * 0.15 + 0.05;
            const duration = Config.corruptionDuration * (0.8 + Math.random() * 0.4);
            this.corrupt(element, duration, intensity);
        });
    },

    randomGlitch: function() {
        if (!Config.enableEffects) return;

        const targetElements = document.querySelectorAll('.glitch-target, .fragment-details p, footer p');
        if (targetElements.length > 0) {
            const randomElement = targetElements[Math.floor(Math.random() * targetElements.length)];
            const intensity = Math.random() * 0.1 + 0.02;
            const duration = Config.glitchSpeed * (1 + Math.random());
            this.corrupt(randomElement, duration, intensity);
        }
    },

    fixStuckText: function() {
        const targetSelectors = [
            '#intro-text p', '.glitch-target', '.fragment-card h3',
            '.fragment-details p', 'footer p'
        ];
        
        let fixedCount = 0;
        
        targetSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element.dataset.originalText && element.textContent !== element.dataset.originalText) {
                    const hasCorruptionChars = this.glitchCharacters.some(char => element.textContent.includes(char));
                    if (hasCorruptionChars) {
                        element.textContent = element.dataset.originalText;
                        fixedCount++;
                    }
                }
            });
        });
        return fixedCount;
    }
}; 