export function isValidBrazilianPhone(phone: string): boolean {
    const phoneRegex = /^\(\d{2}\)\s?\d?\s?\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
}

