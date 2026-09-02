export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export function isValidUrl(url) {
  if (!url || url === "#") return true;
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export function validateContactForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Please provide a valid email address.";
  }
  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters long.";
  }
  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
