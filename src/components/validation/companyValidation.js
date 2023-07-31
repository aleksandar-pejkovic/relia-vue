// Function to validate company name
export function validateName(name) {
    const regex = /^[a-zA-Z0-9\sčćžšđČĆŽŠĐ\-']*$/
    if (!regex.test(name)) {
        return "Ime neispravno";
    } else {
        return "";
    }
}

// Function to validate city
export function validateCity(city) {
    const regex = /^[a-zA-Z0-9\sčćžšđČĆŽŠĐ]*$/
    if (!regex.test(city)) {
        return "Naziv mesta neispravan";
    } else {
        return "";
    }
}

// Function to validate zip number
export function validateZip(zip) {
    const regex = /^[0-9]{5}$/; // Only allows 5 digits
    if (!regex.test(zip)) {
        return "Poštanski broj neispravan";
    } else {
        return "";
    }
}

// Function to validate address
export function validateAddress(street) {
    const regex = /^[a-zA-Z0-9\sčćžšđČĆŽŠĐ]*$/; // Allows letters, numbers, and spaces
    if (!regex.test(street)) {
        return "Adresa neispravna";
    } else {
        return "";
    }
}

// Function to validate registration number
export function validateRegistrationNumber(registrationNumber) {
    const regex = /^[0-9]{8}$/; // Only allows 8 digits
    if (!regex.test(registrationNumber)) {
        return "Matični broj neispravan";
    } else {
        return "";
    }
}

// Function to validate tax number
export function validateTaxNumber(taxNumber) {
    const regex = /^[0-9]{9}$/; // Only allows 9 digits
    if (!regex.test(taxNumber)) {
        return "PIB neispravan";
    } else {
        return "";
    }
}

// Function to validate bank account
export function validateBankAccount(bankAccount) {
    const regex = /^(?:\d{3})-(?:0*(\d{1,13})|\1)-(\d{2})$/; // Only allows 12 digits
    if (!regex.test(bankAccount)) {
        return "Tekući račun neispravan";
    } else {
        return "";
    }
}

// Function to validate phone number
export function validatePhoneNumber(phone) {
    const regex = /^([+\d{1,3}])?[\d\-/]{6,15}$/;
    if (!regex.test(phone)) {
        return "Broj telefona neispravan";
    } else {
        return "";
    }
}

// Function to validate email
export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks if input is in email format
    if (!regex.test(email)) {
        return "Imejl neispravan";
    } else {
        return "";
    }
}

// Function to validate website
export function validateWebsite(website) {
    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?[a-zA-Z0-9-]*$/; // Checks if input is in website format
    if (!regex.test(website)) {
        return "Internet stranica neispravna";
    } else {
        return "";
    }
}

export function validateDirector(director) {
    const regex = /^[a-zA-Z\sčćžšđČĆŽŠĐ]*$/; // Checks if input is in website format
    if (!regex.test(director)) {
        return "Ime direktora neispravno";
    } else {
        return "";
    }
}