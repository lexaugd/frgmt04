// AnimationLoop.js - Main Animation Loop Controller
import Config from '../config.js';
import { TextEffects } from './TextEffects.js';

export const AnimationLoop = {
    _animationId: null,
    _lastTimestamp: 0,
    _isRunning: false,

    start: function() {
        if (this._isRunning || !Config.enableEffects) return;
        this._isRunning = true;
        this._animationId = requestAnimationFrame(this._tick.bind(this));
    },

    stop: function() {
        if (!this._isRunning) return;
        this._isRunning = false;
        if (this._animationId) {
            cancelAnimationFrame(this._animationId);
        }
        this._animationId = null;
    },

    _tick: function(currentTime) {
        if (!this._isRunning) return;

        const deltaTime = currentTime - this._lastTimestamp;

        if (deltaTime >= Config.glitchSpeed) {
            if (Math.random() < 0.2) {
                TextEffects.randomGlitch();
            }
            this._lastTimestamp = currentTime;
        }

        if (deltaTime >= Config.corruptionInterval) {
            if (Math.random() < 0.1) {
                TextEffects.applyCorruption();
            }
        }
        
        this._animationId = requestAnimationFrame(this._tick.bind(this));
    }
}; 