
export default class CardList {
    constructor (container) {
        this.container = container;
    }
    addCard (placeCard) {
        this.container.appendChild(placeCard);
    }
    render (cards) {
        cards.forEach((card)=> {
            this.addCard(card);
        })
    }
}
