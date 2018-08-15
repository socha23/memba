import {WithBottomBar} from './components/structural/PageBottomBar'

export const message = (text) => {
    toast(text, "badge badge-primary");
};

export const danger = (text) => {
    toast(text, "badge badge-danger");
};

export const success = (text) => {
    toast(text, "badge badge-success");
};

const toast = (text, className="", enterMs=200, remainMs=1000, leaveMs=500) => {
    const toast = $("<span style='margin-left: 4px' class='" + className + "'>" + text + "</span>");
    toast.hide();
    toast.appendTo(WithBottomBar.toastDiv);
    toast.fadeIn(200, () => {
        setTimeout(() => {
            toast.fadeOut(1000, () => {
                toast.remove();
            });
        }, 1000)

    });
};
