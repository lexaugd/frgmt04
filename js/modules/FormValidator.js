/**
 * FormValidator.js - Pure validation functions for neural contact forms
 */

/**
 * Validates email format using neural-approved patterns
 * @param {string} email - Email address to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { isValid: false, error: 'neural_error: email_input_required' };
    }

    const trimmedEmail = email.trim();
    
    if (trimmedEmail.length === 0) {
        return { isValid: false, error: 'neural_error: email_field_empty' };
    }

    // Basic email regex pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(trimmedEmail)) {
        return { isValid: false, error: 'neural_error: invalid_email_format' };
    }

    // Check for common disposable email domains
    const disposableDomains = [
        '10minutemail.com', 'tempmail.org', 'guerrillamail.com',
        'mailinator.com', 'trash-mail.com', 'temp-mail.org'
    ];
    
    const domain = trimmedEmail.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
        return { isValid: false, error: 'neural_error: disposable_email_detected' };
    }

    return { isValid: true, error: null };
}

/**
 * Validates message content for neural transmission
 * @param {string} message - Message content to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export function validateMessage(message) {
    if (!message || typeof message !== 'string') {
        return { isValid: false, error: 'neural_error: message_input_required' };
    }

    const trimmedMessage = message.trim();
    
    if (trimmedMessage.length === 0) {
        return { isValid: false, error: 'neural_error: message_field_empty' };
    }

    if (trimmedMessage.length < 10) {
        return { isValid: false, error: 'neural_error: message_too_short (minimum 10 characters)' };
    }

    if (trimmedMessage.length > 2000) {
        return { isValid: false, error: 'neural_error: message_too_long (maximum 2000 characters)' };
    }

    // Check for spam patterns
    const spamPatterns = [
        /viagra|cialis|pharmacy/i,
        /lottery|winner|congratulations/i,
        /nigerian prince|inheritance|millions/i,
        /click here|act now|limited time/i,
        /www\.|https?:\/\//i  // Basic URL detection
    ];

    for (const pattern of spamPatterns) {
        if (pattern.test(trimmedMessage)) {
            return { isValid: false, error: 'neural_error: suspicious_content_detected' };
        }
    }

    return { isValid: true, error: null };
}

/**
 * Validates name field for neural contact forms
 * @param {string} name - Name to validate
 * @returns {object} - { isValid: boolean, error: string }
 */
export function validateName(name) {
    if (!name || typeof name !== 'string') {
        return { isValid: false, error: 'neural_error: name_input_required' };
    }

    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
        return { isValid: false, error: 'neural_error: name_field_empty' };
    }

    if (trimmedName.length < 2) {
        return { isValid: false, error: 'neural_error: name_too_short' };
    }

    if (trimmedName.length > 50) {
        return { isValid: false, error: 'neural_error: name_too_long' };
    }

    // Only allow letters, spaces, hyphens, and apostrophes
    const namePattern = /^[a-zA-Z\s\-']+$/;
    
    if (!namePattern.test(trimmedName)) {
        return { isValid: false, error: 'neural_error: invalid_name_characters' };
    }

    return { isValid: true, error: null };
}

/**
 * Validates entire form data for neural transmission
 * @param {object} formData - Form data object
 * @returns {object} - { isValid: boolean, errors: array }
 */
export function validateContactForm(formData) {
    const errors = [];
    
    // Validate email
    const emailResult = validateEmail(formData.email);
    if (!emailResult.isValid) {
        errors.push({ field: 'email', message: emailResult.error });
    }

    // Validate message
    const messageResult = validateMessage(formData.message);
    if (!messageResult.isValid) {
        errors.push({ field: 'message', message: messageResult.error });
    }

    // Validate name if provided
    if (formData.name) {
        const nameResult = validateName(formData.name);
        if (!nameResult.isValid) {
            errors.push({ field: 'name', message: nameResult.error });
        }
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Sanitizes input for neural processing
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
    if (!input || typeof input !== 'string') {
        return '';
    }

    return input
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .slice(0, 2000); // Limit length
}

/**
 * Checks if form submission rate is within neural limits
 * @param {string} identifier - Unique identifier (IP, email, etc.)
 * @returns {boolean} - Whether submission is allowed
 */
export function checkSubmissionRate(identifier) {
    if (!identifier) return false;
    
    const storageKey = `neural_contact_${identifier}`;
    const lastSubmission = localStorage.getItem(storageKey);
    
    if (!lastSubmission) {
        localStorage.setItem(storageKey, Date.now().toString());
        return true;
    }

    const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
    const minInterval = 60000; // 1 minute minimum between submissions
    
    if (timeSinceLastSubmission < minInterval) {
        return false;
    }

    localStorage.setItem(storageKey, Date.now().toString());
    return true;
} 