import { Toast, Indicator, MessageBox } from 'mint-ui';
import 'mint-ui/lib/style.css';

export default {
    toastBottom(message) {
        Toast({
            message: message,
            position: 'bottom',
            duration: 3000,
            className: 'toast'
        });
    },
    toastTop(message) {
        Toast({
            message: message,
            position: 'top',
            duration: 3000,
            className: 'toast'
        });
    },
    toastCenter(message) {
        Toast({
            message: message,
            position: 'middle',
            duration: 3000,
            className: 'toast'
        });
    },
    toastSuccess(message) {
        Toast({
            message: message,
            iconClass: 'icon icon-success',
            className: 'toast'
        });
    },
    toastError(message) {
        Toast({
            message: message,
            iconClass: 'icon icon-error',
            className: 'toast'
        });
    },
    loadingShow(message) {
        Indicator.open(message);
    },
    loadingHide() {
        Indicator.close();
    },
    confirmMessageBox(message, callback) {
        MessageBox.confirm('确定执行此操作?').then(action => {
            callback();
        });
    },
    checkMobile(phone) {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
            return false;
        }
        else {
            return true;
        }
    },
    async setStore(name, content) { //存储localStorage
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    getStore(name) { //获取localStorage
        if (!name) return;
        return window.localStorage.getItem(name);
    },
    removeStore(name) { //删除localStorage
        if (!name) return;
        window.localStorage.removeItem(name);
    },
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}