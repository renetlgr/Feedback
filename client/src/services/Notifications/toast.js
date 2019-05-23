import 'izitoast/dist/css/iziToast.min.css'
import iZtoast from 'izitoast'

const toast = {
    error: (message, title = 'Error') => {
        return iZtoast.error({
            title: title,
            message: message,
            position: 'topCenter'
        });
    },
    success: (message, title = 'Success') => {
        return iZtoast.success({
            title: title,
            message: message,
            position: 'topCenter'
        });
    },
    info: (message, title = 'Info') => {
        return iZtoast.info({
            title: title,
            message: message,
            position: 'topCenter'
        });
    },
    warning: (message, title = 'Warning') => {
        return iZtoast.warning({
            title: title,
            message: message,
            position: 'topCenter'
        });
    }
};

export default toast;