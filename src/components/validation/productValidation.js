
export function validateName(name) {
    const regex = /^[a-zA-Z0-9\s-]{2,50}/; // Only allows letters and spaces
    if (!regex.test(name)) {
        return "Please enter a valid name";
    } else {
        return "";
    }
}

export function validateUnit(unit) {
    if (unit.length > 5) {
        return "Unit can be up to 5 characters long";
    } else {
        return "";
    }
}

export function validatePlu(plu) {
    if (plu < 0 || plu > 10000) {
        return "Plu must be a number between 0 and 10000";
    } else {
        return "";
    }
}

export function validateDescription(description) {
    const regex = /^[a-zA-Z0-9ČĆŠĐŽčćšđž,.!? \u0027-]{1,300}/;
    if (!regex.test(description)) {
        return "Please enter a valid description";
    } else {
        return "";
    }
}

export function validatePrice(price) {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
        return "Please enter a valid price";
    } else {
        const minPrice = 0;
        const maxPrice = 100000000.00;
        if (parsedPrice < minPrice || parsedPrice > maxPrice) {
            return `Please enter a price between ${minPrice.toFixed(2)} and ${maxPrice.toFixed(2)}`;
        } else {
            return "";
        }
    }
}

