export function validateDate(dateString) {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!dateString.match(regex)) {
        return 'Datum neispravan. Koristi format: dd.mm.yyyy.';
    }

    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return 'Datum neispravan.';
    }

    const date = new Date(year, month - 1, day);

    if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
        return 'Datum neispravan.';
    }

    return ''; // Empty string indicates a valid date
}

export function validateInvoiceNumber(invoiceNumber) {
    const regex = /^[a-zA-Z0-9/-]{2,30}$/;
    if (!regex.test(invoiceNumber)) {
        return "Broj dokumenta neispravan";
    } else {
        return "";
    }
}
