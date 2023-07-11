import Swal from 'sweetalert2'

export function showErrorMessage(error) {
    let errorMessages = error.message;
    if (error.response && error.response.data) {
        errorMessages = error.response.data.error || error.response.data.message || error.response.data || errorMessages;
    }
    Swal.fire({
        title: 'Request unsuccessful!',
        text: errorMessages,
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

export function showLoginErrorMessage() {
    Swal.fire({
        title: 'Login unsuccessful!',
        text: "Wrong username or password",
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
        title: 'Invalid request!',
        text: 'Please fix the errors in the form.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
}

