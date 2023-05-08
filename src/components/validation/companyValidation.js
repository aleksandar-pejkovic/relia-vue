// Function to validate company name
export function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
    if (!regex.test(name)) {
        return "Please enter a valid name";
    } else {
        return "";
    }
}

// Function to validate city
export function validateCity(city) {
    const regex = /^[a-zA-Z\s]*$/; // Only allows letters and spaces
    if (!regex.test(city)) {
        return "Please enter a valid city";
    } else {
        return "";
    }
}

// Function to validate zip number
export function validateZip(zip) {
    const regex = /^[0-9]{5}$/; // Only allows 5 digits
    if (!regex.test(zip)) {
        return "Please enter a valid zip number";
    } else {
        return "";
    }
}

// Function to validate address
export function validateAddress(street) {
    const regex = /^[a-zA-Z0-9\s]*$/; // Allows letters, numbers, and spaces
    if (!regex.test(street)) {
        return "Please enter a valid address";
    } else {
        return "";
    }
}

// Function to validate registration number
export function validateRegistrationNumber(registrationNumber) {
    const regex = /^[0-9]{8}$/; // Only allows 8 digits
    if (!regex.test(registrationNumber)) {
        return "Please enter a valid registration number";
    } else {
        return "";
    }
}

// Function to validate tax number
export function validateTaxNumber(taxNumber) {
    const regex = /^[0-9]{9}$/; // Only allows 9 digits
    if (!regex.test(taxNumber)) {
        return "Please enter a valid tax number";
    } else {
        return "";
    }
}

// Function to validate bank account
export function validateBankAccount(bankAccount) {
    const regex = /^(?:\d{3})-(?:0*(\d{1,13})|\1)-(\d{2})$/; // Only allows 12 digits
    if (!regex.test(bankAccount)) {
        return "Please enter a valid bank account number";
    } else {
        return "";
    }
}

// Function to validate phone number
export function validatePhoneNumber(phone) {
    const regex = /^([+\d{1,3}])?[\d\-/]{6,15}$/;
    if (!regex.test(phone)) {
        return "Please enter a valid phone number";
    } else {
        return "";
    }
}

// Function to validate email
export function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Checks if input is in email format
    if (!regex.test(email)) {
        return "Please enter a valid email address";
    } else {
        return "";
    }
}

// Function to validate website
export function validateWebsite(website) {
    const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?[a-zA-Z0-9-]*$/; // Checks if input is in website format
    if (!regex.test(website)) {
        return "Please enter a valid website address";
    } else {
        return "";
    }
}

export function validateDirector(director) {
    const regex = /^[a-zA-Z\s]*$/; // Checks if input is in website format
    if (!regex.test(director)) {
        return "Please enter a valid director name";
    } else {
        return "";
    }
}