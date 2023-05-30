
export function validateName(name) {
    const regex = /^[a-zA-Z0-9\s-čćšđžČĆŠĐŽ]{2,50}/;
    if (!regex.test(name)) {
        return "Please enter a valid name";
    } else {
        return "";
    }
}

export function validateUnit(unit) {
    const regex = /^[A-Za-z0-9]{0,5}$/;
    if (!regex.test(unit)) {
        return "Unit can contain up to 5 alphanumeric characters";
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
    const regex = /^[a-zA-Z0-9ČĆŠĐŽčćšđž,.!? \u0027-]{0,300}/;
    if (!regex.test(description)) {
        return "Please enter a valid description";
    } else {
        return "";
    }
}

export function validatePrice(price) {
    const minPrice = 0;
    const maxPrice = 100000000.00;
    if (price < minPrice || price > maxPrice) {
        return `Please enter a price between ${minPrice.toFixed(2)} and ${maxPrice.toFixed(2)}`;
    } else {
        return "";
    }
}

