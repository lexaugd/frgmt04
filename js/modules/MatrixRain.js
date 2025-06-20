// MatrixRain.js - Matrix Rain Background Effect
import Config from '../config.js';

export const MatrixRain = {
    _resizeTimeout: null,
    _container: null,

    start: function() {
        if (!Config.enableEffects) return;
        this._container = document.getElementById('matrix-rain');
        if (!this._container) return;

        const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>[]{}()+-*/=_|\\~`!@#$%^&ПИДОРПИДОРПИДОРПИДОР';
        const columnWidth = 20;
        const numColumns = Math.floor(window.innerWidth / columnWidth);

        this._container.innerHTML = ''; // Clear previous

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = (i * columnWidth) + 'px';

            let columnText = '';
            const columnHeight = Math.floor(Math.random() * 20) + 10;
            const includeSpecialWord = Math.random() < 0.2;

            for (let j = 0; j < columnHeight; j++) {
                if (includeSpecialWord && j === Math.floor(columnHeight / 2)) {
                    columnText += 'ПИДОР<br>';
                } else {
                    columnText += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '<br>';
                }
            }

            column.innerHTML = columnText;
            this._container.appendChild(column);

            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 8;

            column.style.animationDelay = `-${delay}s`;
            column.style.animationDuration = `${duration}s`;
        }

        window.addEventListener('resize', this._resizeHandler.bind(this));
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
        clearTimeout(this._resizeTimeout);
        this._resizeTimeout = setTimeout(() => this.start(), 250);
    }
}; 