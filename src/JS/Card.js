export default class Card {
    constructor (name, link, popup) {
        this.name = name;
        this.link = link;
        this.popup = popup;
        this._remove = this._remove.bind(this);
        this._like = this._like.bind(this);
        this._openLargePicture = this._openLargePicture.bind(this);
    
    }
    create () {
        const template = document.createElement('div');
        template.insertAdjacentHTML('beforeend', `
            <div class="place-card">
              <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
              </div>
              <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <button class="place-card__like-icon"></button>
              </div>
            </div>
        `);
        const placeCard = template.firstElementChild;
        placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
        placeCard.querySelector('.place-card__name').textContent = this.name;
        this.cardElement = placeCard;
        this.setEventListeners();
        return placeCard;
    }
    setEventListeners () {
        const likeButton = this.cardElement.querySelector('.place-card__like-icon');
        const deleteButton = this.cardElement.querySelector('.place-card__delete-icon');
        const image = this.cardElement.querySelector('.place-card__image');
        this.likeButtonElement = likeButton;
        this.deleteButtonElement = deleteButton;
        this.imageElement = image;
        this.likeButtonElement.addEventListener('click', this._like);
        this.deleteButtonElement.addEventListener('click', this._remove);
        this.imageElement.addEventListener('click', this._openLargePicture);
    }
    _removeEventListeners() {
        this.likeButtonElement.removeEventListener('click', this._like);
        this.deleteButtonElement.removeEventListener('click', this._remove);
        this.imageElement.removeEventListener('click', this._openLargePicture);
    }
    _like (event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    _remove (event) {
        const element = event.target.parentElement.parentElement;
        element.parentNode.removeChild(element);
        this._removeEventListeners();
    }

    _openLargePicture (event) {
        document.querySelector('.popup__image').src = event.target.style.backgroundImage.slice(5, event.target.style.backgroundImage.length-2);
        this.popup.open();
    }
}
