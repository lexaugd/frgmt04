/**
 * Neural Contact Manager
 * Handles expandable contact interface with neural terminal theming
 */

export class ContactManager {
    constructor() {
        this.contactPanel = null;
        this.contactToggle = null;
        this.contactForm = null;
        this.closeButton = null;
        this.isExpanded = false;
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        this.contactPanel = document.getElementById('neural-contact-panel');
        this.contactToggle = document.getElementById('contact-nav');
        this.contactForm = document.getElementById('neural-contact-form');
        this.closeButton = document.getElementById('close-contact-button');
        
        if (!this.contactPanel || !this.contactToggle) {
            console.warn('Neural contact elements not found');
            return;
        }
        
        this.setupEventListeners();
        this.setupFormSubmission();
        this.setupClickOutsideToClose();
    }
    
    setupEventListeners() {
        // Contact toggle button
        if (this.contactToggle) {
            this.contactToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleContact();
            });
        }
        
        // Close button
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => {
                this.closeContact();
            });
        }
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isExpanded) {
                this.closeContact();
            }
        });
    }
    
    setupFormSubmission() {
        if (!this.contactForm) return;
        
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }
    
    setupClickOutsideToClose() {
        document.addEventListener('click', (e) => {
            // Only close if contact panel is expanded
            if (!this.isExpanded) return;
            
            // Don't close if clicking on the contact panel itself
            if (this.contactPanel.contains(e.target)) return;
            
            // Don't close if clicking on the contact toggle button
            if (this.contactToggle && this.contactToggle.contains(e.target)) return;
            
            // Close the contact panel
            this.closeContact();
        });
    }
    
    toggleContact() {
        if (this.isExpanded) {
            this.closeContact();
        } else {
            this.openContact();
        }
    }
    
    openContact() {
        if (this.isExpanded) return;
        
        this.isExpanded = true;
        this.contactPanel.classList.add('expanded');
        this.contactToggle.classList.add('active');
        
        // Track contact panel opening in Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_panel_open', {
                'event_category': 'engagement',
                'event_label': 'neural_contact_interface',
                'value': 1
            });
        }
        
        // Focus on first input
        const firstInput = this.contactForm.querySelector('input, textarea');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
        
        // Close sidebar on mobile after opening contact
        if (window.matchMedia('(max-width: 767px)').matches && window.State && window.State.sidebarManager) {
            setTimeout(() => window.State.sidebarManager.collapseSidebar(), 300);
        }
    }
    
    closeContact() {
        if (!this.isExpanded) return;
        
        this.isExpanded = false;
        this.contactPanel.classList.remove('expanded');
        this.contactToggle.classList.remove('active');
        
        // Clear form if not submitting
        if (!this.isSubmitting) {
            this.resetForm();
        }
    }
    
    async submitForm() {
        if (this.isSubmitting) return;
        
        const formData = new FormData(this.contactForm);
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!email || !message) {
            this.showError('Please fill in all required fields');
            return;
        }
        
        // reCAPTCHA validation
        if (typeof grecaptcha !== 'undefined') {
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                this.showError('Please complete the neural verification');
                return;
            }
        } else {
            console.warn('reCAPTCHA not loaded');
        }
        
        this.isSubmitting = true;
        this.showLoading();
        
        try {
            // FormSubmit.co integration
            const response = await fetch(this.contactForm.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                this.showSuccess();
                
                // Track successful contact form submission in Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_form_submit', {
                        'event_category': 'engagement',
                        'event_label': 'neural_contact_interface',
                        'value': 1
                    });
                    
                    // Track as conversion
                    gtag('event', 'generate_lead', {
                        'currency': 'CAD',
                        'value': 1.0
                    });
                }
                
                setTimeout(() => this.closeContact(), 3000);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            this.showError('Failed to send message. Please try again.');
            
            // Track form submission errors in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_error', {
                    'event_category': 'error',
                    'event_label': 'neural_contact_interface',
                    'value': 1
                });
            }
        } finally {
            this.isSubmitting = false;
        }
    }
    
    showLoading() {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'transmitting...';
            submitButton.disabled = true;
        }
    }
    
    showSuccess() {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'neural-contact-result success';
        resultDiv.innerHTML = `
            <div class="neural-message">neural_link_established</div>
            <div class="neural-subtext">message transmitted successfully</div>
        `;
        
        this.contactForm.innerHTML = '';
        this.contactForm.appendChild(resultDiv);
    }
    
    showError(message) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'neural-contact-result error';
        resultDiv.innerHTML = `
            <div class="neural-message">transmission_failed</div>
            <div class="neural-subtext">${message}</div>
        `;
        
        // Remove existing error messages
        const existingError = this.contactForm.querySelector('.neural-contact-result.error');
        if (existingError) {
            existingError.remove();
        }
        
        this.contactForm.appendChild(resultDiv);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            if (resultDiv.parentNode) {
                resultDiv.remove();
            }
        }, 5000);
    }
    
    resetForm() {
        if (this.contactForm) {
            this.contactForm.reset();
            // Remove any result messages
            const resultElements = this.contactForm.querySelectorAll('.neural-contact-result');
            resultElements.forEach(el => el.remove());
            
            // Reset submit button
            const submitButton = this.contactForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'transmit';
                submitButton.disabled = false;
            }
            
            // Reset reCAPTCHA
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        }
    }
    
    destroy() {
        // Clean up event listeners if needed
        if (this.contactToggle) {
            this.contactToggle.removeEventListener('click', this.toggleContact);
        }
        
        if (this.closeButton) {
            this.closeButton.removeEventListener('click', this.closeContact);
        }
    }
} 