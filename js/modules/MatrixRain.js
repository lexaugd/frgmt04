// MatrixRain.js - Matrix Rain Background Effect
import Config from '../config.js';

export const MatrixRain = {
    _resizeTimeout: null,
    _container: null,

    start: function() {
        // Check master switches
        if (!Config.enableEffects || !Config.matrixRain.enabled) return;
        
        this._container = document.getElementById('matrix-rain');
        if (!this._container) return;

        // Get configuration
        const config = Config.matrixRain;
        const isMobile = window.innerWidth <= config.performance.mobileBreakpoint;
        
        // Calculate columns based on configuration
        const densityMultiplier = isMobile ? config.columns.density.mobile : config.columns.density.desktop;
        const totalColumns = Math.floor(window.innerWidth / config.columns.width);
        const numColumns = Math.floor(totalColumns * densityMultiplier);
        
        // Calculate even spacing across screen width
        const columnSpacing = window.innerWidth / numColumns;

        this._container.innerHTML = ''; // Clear previous

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            
            // Position columns evenly across screen width
            column.style.left = Math.floor(i * columnSpacing) + 'px';

            // Generate column content
            let columnText = '';
            const columnHeight = Math.floor(Math.random() * (config.columns.maxHeight - config.columns.minHeight + 1)) + config.columns.minHeight;

            for (let j = 0; j < columnHeight; j++) {
                columnText += config.characters[Math.floor(Math.random() * config.characters.length)] + '<br>';
            }

            column.innerHTML = columnText;
            
            // Apply styling from configuration
            const fontSize = isMobile ? config.styling.fontSize.mobile : config.styling.fontSize.desktop;
            column.style.fontSize = fontSize + 'px';
            
            // Apply opacity based on column position
            let opacity = config.styling.opacity.base;
            if (i % 5 === 0) opacity = config.styling.opacity.fifth;
            else if (i % 4 === 0) opacity = config.styling.opacity.fourth;
            else if (i % 3 === 0) opacity = config.styling.opacity.third;
            else if (i % 2 === 0) opacity = config.styling.opacity.even;
            else opacity = config.styling.opacity.odd;
            
            column.style.opacity = opacity;
            
            // Apply colors and text shadows
            if (i % 2 === 0) {
                column.style.color = config.styling.colors.primary;
                column.style.textShadow = config.styling.textShadow.primary;
            } else {
                column.style.color = config.styling.colors.secondary;
                column.style.textShadow = config.styling.textShadow.secondary;
            }
            
            this._container.appendChild(column);

            // Apply timing from configuration
            const timing = isMobile ? config.timing.mobile : config.timing.desktop;
            const duration = Math.random() * (timing.maxDuration - timing.minDuration) + timing.minDuration;

            // NO DELAYS: All columns start immediately
            column.style.animationDelay = '0s';
            column.style.animationDuration = duration + 'ms';
        }

        // Setup resize handler if enabled
        if (config.performance.enableResize) {
            window.addEventListener('resize', this._resizeHandler.bind(this));
        }
    },

    stop: function() {
        if (this._container) {
            this._container.innerHTML = '';
        }
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);
        }
        window.removeEventListener('resize', this._resizeHandler);
    },

    _resizeHandler: function() {
        const config = Config.matrixRain;
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(() => this.start(), config.performance.resizeDelay);
    }
}; 