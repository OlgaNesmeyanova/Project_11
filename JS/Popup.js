class Popup {
    constructor (popupElement) {
        this.popupElement = popupElement;
    }
    open () {
        this.popupElement.classList.add('popup_is-opened');
    }
    close () {
        this.popupElement.classList.remove('popup_is-opened');
    }
}