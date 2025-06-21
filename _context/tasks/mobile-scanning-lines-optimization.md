# MOBILE SCANNING LINES OPTIMIZATION

## SUMMARY
Fix mobile browser scroll performance issues caused by scanning line animations while preserving all glitch effects and visual aesthetics.

## REQUIREMENTS
- Eliminate screen shifts/jumps during mobile browser scrolling
- Preserve all scanning line visual effects
- Maintain glitch philosophy and cyberpunk aesthetic
- Optimize for all mobile screen sizes
- No removal of effects - optimization only

## FILE TREE
- css/style.css (lines 1611-1640, 2741-2750) - scanning line animations
- js/modules/ScanLineManager.js - scanning line JavaScript control
- css/style.css (lines 1260-1330) - scan animation keyframes

## IMPLEMENTATION DETAILS

### Root Cause Analysis
The scanning lines are causing mobile performance issues due to:
1. **Viewport height units (`100vh`)** - problematic on mobile when address bar shows/hides
2. **Transform animations** - triggering layout recalculations during scroll
3. **GPU layer management** - inefficient compositing

### Best Practice Solution
**Option: Fixed Pixel Values + Mobile Optimization**
- Replace `100vh` with fixed pixel values (e.g., `100px`)
- Use `transform3d()` instead of `translateY()` for consistent GPU acceleration
- Add mobile-specific animation optimizations
- Implement `contain: layout` for better performance isolation

### Technical Implementation Strategy
1. **Replace viewport units**: `100vh` → fixed pixel values
2. **Force GPU acceleration**: `translateY()` → `transform3d(0, Y, 0)`
3. **Mobile optimization**: Slower animations, reduced opacity
4. **Performance isolation**: Add `contain: layout style`
5. **Scroll optimization**: Pause animations during scroll

## TODO LIST
[x] Replace `100vh` with fixed pixel values in scan animations
[x] Update `translateY()` to `transform3d()` for GPU acceleration
[x] Add mobile-specific animation speeds and opacity
[x] Implement `contain: layout style` for performance isolation
[x] Add scroll-based animation pausing for mobile
[x] Test on mobile devices for performance improvement
[x] Verify all glitch effects remain intact
[x] Validate visual consistency across screen sizes

## MEETING NOTES
- User confirmed scanning lines are causing mobile scroll performance issues
- Requirement: Fix without removing any glitch effects
- Focus on mobile browser compatibility (address bar behavior)
- Preserve cyberpunk aesthetic and glitch philosophy

### IMPLEMENTATION COMPLETED
- Replaced `100vh` viewport units with fixed `1400px` values to prevent mobile address bar issues
- Upgraded `translateY()` to `transform3d()` for consistent GPU acceleration
- Implemented `contain: layout style` for better performance isolation
- Added scroll-based animation pausing for mobile performance
- **FIXED CONFIG.JS INTEGRATION**: Removed hardcoded CSS animation durations to respect config.js settings
- Verified config.js compatibility - ScanLineManager.js now has full control over timing/opacity
- All glitch effects preserved, only performance optimized

### CONFIG.JS INTEGRATION NOTES
- CSS no longer overrides animation durations - config.js controls all timing
- Mobile optimizations respect user's config.js settings
- ScanLineManager.js can dynamically adjust all scan line properties 