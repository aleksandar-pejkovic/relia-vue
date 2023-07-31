import Swal from 'sweetalert2'

export function showErrorMessage(error) {
    let errorMessages = error.message;
    if (error.response && error.response.data) {
        errorMessages = error.response.data.error || error.response.data.message || error.response.data || errorMessages;
    }
    Swal.fire({
        title: 'Zahtev nije uspeo!',
        text: errorMessages,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

export function showLoginErrorMessage() {
    Swal.fire({
        title: 'Prijava nije uspela!',
        text: "Pogrešan username ili pasvord",
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

export function showSuccessMessage(title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: "OK",
    });
}

export function showInvalidRequestMessage() {
    Swal.fire({
        title: 'Nevažeći zahtev!',
        text: 'Ispravite greške u formularu.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

