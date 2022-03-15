import { NotificationManager } from '../../components/common/react-notifications';

class Notifier {
    static primary = (
        message = '',
        title = '',
        timeOut = 2000,
        onClick = () => { },
        priority = 1,
        customClassName = ''
    ) => {
        NotificationManager.primary(
            message,
            title,
            timeOut,
            onClick,
            priority,
            customClassName
        );
    };

    static secondary = (
        message = '',
        title = '',
        timeOut = 2000,
        onClick = () => { },
        priority = 1,
        customClassName = ''
    ) => {
        NotificationManager.secondary(
            message,
            title,
            timeOut,
            onClick,
            priority,
            customClassName
        );
    };

    static success = (
        message = '',
        title = '',
        timeOut = 2000,
        onClick = () => { },
        priority = 1,
        customClassName = ''
    ) => {
        NotificationManager.success(
            message,
            title,
            timeOut,
            onClick,
            priority,
            customClassName
        );
    };

    static warning = (
        message = '',
        title = '',
        timeOut = 2000,
        onClick = () => { },
        priority = 1,
        customClassName = ''
    ) => {
        NotificationManager.warning(
            message,
            title,
            timeOut,
            onClick,
            priority,
            customClassName
        );
    };

    static error = (
        message = '',
        title = '',
        timeOut = 2000,
        onClick = () => { },
        priority = 1,
        customClassName = ''
    ) => {
        NotificationManager.error(
            message,
            title,
            timeOut,
            onClick,
            priority,
            customClassName
        );
    };

    static info = (
        message = '',
        title = '',
        timeOut = 2000,
        onClick = () => { },
        priority = 1,
        customClassName = ''
    ) => {
        NotificationManager.info(
            message,
            title,
            timeOut,
            onClick,
            priority,
            customClassName
        );
    };

}
export default Notifier;