// Typewriter.js - Fixed Typewriter Factory and Typer Class
class Typer {
    constructor(options) {
        this.element = options.element;
        this.text = options.text || '';
        this.speed = options.speed || 50;
        this.cursor = options.cursor;
        this.onComplete = options.onComplete;
        this.currentIndex = 0;
        this.timeoutId = null;
        this.isStopped = false;
    }

    start() {
        if (!this.element) return;
        this.isStopped = false;
        this.currentIndex = 0;
        this.element.innerHTML = '';
        if (this.cursor) this.cursor.style.display = 'inline';
        this._type();
    }

    stop() {
        this.isStopped = true;
        if (this.timeoutId) clearTimeout(this.timeoutId);
        this.element.innerHTML = ''; // Clear content on stop
        if (this.cursor) this.cursor.style.display = 'none';
    }

    _type() {
        if (this.isStopped || this.currentIndex >= this.text.length) {
            if (this.cursor) this.cursor.style.display = 'none'; // Hide cursor on complete
            if (this.onComplete) this.onComplete();
            return;
        }

        const char = this.text[this.currentIndex];
        this.element.innerHTML += (char === '\n') ? '<br>' : char;
        this.currentIndex++;

        this.timeoutId = setTimeout(() => this._type(), this.speed);
    }
}

export function create(options) {
    return new Typer(options);
} 