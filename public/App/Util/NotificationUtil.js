// noinspection ES6CheckImport
import {store} from 'react-notifications-component';

export const showErrorMessage = errorMessage => {
    store.addNotification({
        title: "Error",
        message: errorMessage,
        type: "danger",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });
}

export const showSuccessMessage = successMessage => {
    store.addNotification({
        title: "Success",
        message: successMessage,
        type: "success",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 5000,
            onScreen: true
        }
    });
}