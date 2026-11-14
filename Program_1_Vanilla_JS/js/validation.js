/**
 * CLOSETÉ - Program 1 Validation Module
 * Academic concepts: Regex validation, input sanitation, form state evaluation.
 */
const Validation = {
  patterns: {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[6-9]\d{9}$/,
    pincode: /^[1-9][0-9]{5}$/,
    card: /^\d{16}$/,
    upi: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
  },

  validateProductForm(data) {
    const errors = {};
    if (!data.name || data.name.trim().length < 3) errors.name = 'Name must be at least 3 characters.';
    if (!data.category) errors.category = 'Category is required.';
    if (!data.price || Number(data.price) <= 0) errors.price = 'Price must be greater than 0.';
    if (data.sizes && (!Array.isArray(data.sizes) || data.sizes.length === 0)) errors.sizes = 'Select at least one size.';
    if (!data.description || data.description.trim().length < 10) errors.description = 'Description must be at least 10 characters.';

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  validateCheckout(data) {
    const errors = {};
    if (!data.fullName || data.fullName.trim().split(' ').length < 2) errors.fullName = 'Please enter your full name.';
    if (!data.email || !this.patterns.email.test(data.email)) errors.email = 'Valid email address required.';
    if (!data.phone || !this.patterns.phone.test(data.phone)) errors.phone = 'Valid 10-digit mobile required.';
    if (!data.pincode || !this.patterns.pincode.test(data.pincode)) errors.pincode = 'Valid 6-digit PIN required.';

    if (data.paymentMethod === 'card') {
      if (!data.cardNumber || !this.patterns.card.test(data.cardNumber)) errors.cardNumber = 'Valid 16-digit card required.';
    } else if (data.paymentMethod === 'upi') {
      if (!data.upiId || !this.patterns.upi.test(data.upiId)) errors.upiId = 'Valid UPI ID required (e.g. user@bank).';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }
};
