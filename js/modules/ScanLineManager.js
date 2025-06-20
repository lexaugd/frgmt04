// ScanLineManager.js - Scan Line Effects Management
import Config from '../config.js';

export const ScanLineManager = {
    init: function() {
        if (!Config.scanLines.enableScanLines) {
            this.removeAll();
            return;
        }
        
        this.removeAll();
        
        if (Config.scanLines.large.enable) {
            for (let i = 0; i < Config.scanLines.large.count; i++) this.create('large', i);
        }
        if (Config.scanLines.small.enable) {
            for (let i = 0; i < Config.scanLines.small.count; i++) this.create('small', i);
        }
        if (Config.scanLines.corrupted.enable) {
            for (let i = 0; i < Config.scanLines.corrupted.count; i++) this.create('corrupted', i);
        }
    },

    create: function(type, index) {
        const scanLine = document.createElement('div');
        
        if (type === 'large') {
            scanLine.className = 'scan-line';
            scanLine.style.animationDelay = `${index * 0.7}s`;
            scanLine.style.animationDuration = `${Config.scanLines.large.speed}ms`;
            scanLine.style.opacity = Config.scanLines.large.opacity;
            scanLine.style.height = `${Config.scanLines.large.height}px`;
            if (Config.scanLines.large.color) {
                scanLine.style.background = `linear-gradient(90deg, transparent 0%, ${Config.scanLines.large.color} 50%, transparent 100%)`;
                if (Config.scanLines.large.glowSize > 0) {
                    scanLine.style.boxShadow = `0 0 ${Config.scanLines.large.glowSize}px 1px ${Config.scanLines.large.color}`;
                } else {
                    scanLine.style.boxShadow = 'none';
                }
            }
        } else if (type === 'small') {
            scanLine.className = 'scan-line-2';
            scanLine.style.animationDelay = `${index * 0.5}s`;
            scanLine.style.animationDuration = `${Config.scanLines.small.speed}ms`;
            scanLine.style.opacity = Config.scanLines.small.opacity;
            scanLine.style.height = `${Config.scanLines.small.height}px`;
            if (Config.scanLines.small.color) {
                scanLine.style.background = `linear-gradient(90deg, transparent 20%, ${Config.scanLines.small.color} 50%, transparent 80%)`;
                if (Config.scanLines.small.glowSize > 0) {
                    scanLine.style.boxShadow = `0 0 ${Config.scanLines.small.glowSize}px 1px ${Config.scanLines.small.color}`;
                } else {
                    scanLine.style.boxShadow = 'none';
                }
            }
        } else if (type === 'corrupted') {
            scanLine.className = 'corrupted-scan-line';
            scanLine.style.animationDelay = `${index * 0.3}s`;
            scanLine.style.animationDuration = `${Config.scanLines.corrupted.speed}ms`;
        }
        
        scanLine.setAttribute('data-scan-type', type);
        document.body.appendChild(scanLine);
        
        // Debug logging
        if (Config.debugMode) {
            console.log(`✅ Created ${type} scan line:`, scanLine.className, `delay: ${scanLine.style.animationDelay}`, `duration: ${scanLine.style.animationDuration}`);
            console.log('Scan line element:', scanLine);
        }
    },

    removeAll: function() {
        const existingScanLines = document.querySelectorAll('.scan-line, .scan-line-2, .corrupted-scan-line');
        if (Config.debugMode && existingScanLines.length > 0) {
            console.log(`🗑️ Removing ${existingScanLines.length} existing scan lines`);
        }
        existingScanLines.forEach(line => line.remove());
    }
}; 