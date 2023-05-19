export function validateDate(dateString) {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateString.match(regex)) {
        return 'Invalid date format. Please use the format dd.mm.yyyy.';
    }

    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return 'Invalid date. Please enter a valid date.';
    }

    const date = new Date(year, month - 1, day);

    if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
        return 'Invalid date. Please enter a valid date.';
    }

    return ''; // Empty string indicates a valid date
}