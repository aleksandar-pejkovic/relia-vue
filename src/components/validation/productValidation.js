
export function validateName(name) {
    const regex = /^[a-zA-Z0-9\s-čćšđžČĆŠĐŽ]{2,50}/;
    if (!regex.test(name)) {
        return "Naziv neispravan";
    } else {
        return "";
    }
}

export function validateUnit(unit) {
    const regex = /^[A-Za-z0-9]{0,5}$/;
    if (!regex.test(unit)) {
        return "Jedinica mere može sadržati do 5 alfanumeričkih karaktera";
    } else {
        return "";
    }
}

export function validatePlu(plu) {
    if (plu > 0 && plu < 100000) {
        return "";
    } else {
        return "Plu mora biti između 1 i 99999";
    }
}

export function validateDescription(description) {
    const regex = /^[a-zA-Z0-9ČĆŠĐŽčćšđž,.!? \u0027-]{0,300}/;
    if (!regex.test(description)) {
        return "Opis neispravan";
    } else {
        return "";
    }
}

export function validatePrice(price) {
    const minPrice = 0;
    const maxPrice = 100000000.00;
    if (price < minPrice || price > maxPrice || !price) {
        return `Cena mora biti između ${minPrice.toFixed(2)} i ${maxPrice.toFixed(2)}`;
    } else {
        return "";
    }
}

