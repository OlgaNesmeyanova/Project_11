import "../pages/index.css";
import Api from './Api';
import Card from './Card';
import CardList from './CardList';
import FormValidator from './FormValidator';
import Popup from './Popup';
import UserInfo from './UserInfo'
(function () {
const placesList = document.querySelector('.places-list');

const popupElementPlace = document.querySelector('.popup_new-place');
const popupNewPlace = new Popup(popupElementPlace);
const addNewPlaceButton = document.querySelector('.user-info__button_new-place');
const newPlaceForm = popupElementPlace.querySelector('.popup__form');
const closeNewPlaceButton = popupElementPlace.querySelector('.popup__close');

const popupElement = document.querySelector('.popup_profile');
const popupProfile = new Popup(popupElement);
const editButton = document.querySelector('.user-info__button_edit');
const profileForm = popupElement.querySelector('.popup__form');
const closeProfileButton = popupElement.querySelector('.popup__close');

const largePictureElement = document.querySelector('.popup_large-picture');
const largePicture = new Popup(largePictureElement)
const closeLargePictureButton = largePictureElement.querySelector('.popup__close');

const profileValidator = new FormValidator (profileForm);
const newPlaceValidator = new FormValidator (newPlaceForm);

const api = new Api();

const userName = document.querySelector('.user-info__name');
const job = document.querySelector('.user-info__job');
const avatar = document.querySelector('.user-info__photo');

const userInfoBlock = new UserInfo(userName, job, avatar);

api.getUserData ()
  .then ((res)=> {
    userInfoBlock.setUserInfo (res.name, res.about, res.avatar);
    userInfoBlock.updateUserInfo();
  })
  .catch ((err)=> {
    console.log(err);
  })

editButton.addEventListener ('click', function () {
    profileForm.elements.name.value = userName.textContent;
    profileForm.elements.about.value = job.textContent;
    popupProfile.open();
    profileValidator.setEventListeners();

    });

function editProfile (event) {
    event.preventDefault();
    api.editProfile (profileForm.elements.name.value, profileForm.elements.about.value)
    .then( () => {
      userInfoBlock.setUserInfo(profileForm.elements.name.value, profileForm.elements.about.value, avatar)
      userInfoBlock.updateUserInfo();
      popupProfile.close();
      profileValidator.removeEventListener();
      profileForm.reset();
    })
      .catch((err) => {
      console.log(err);
     })
  }

profileForm.addEventListener('submit', editProfile);

closeProfileButton.addEventListener('click', function () {
    popupProfile.close();
    profileValidator.resetErrors();
    profileValidator.removeEventListener();
  })

const cardList = new CardList(placesList);

api.getInitialCards ()
  .then((res)=> {
    const initialCards = res.map((item)=> {
      return new Card (item.name, item.link, largePicture).create();
      })
    cardList.render(initialCards);
    })
  .catch((err) => {
    console.log(err);
     })


function addNewCard (event) {
  event.preventDefault();
  const name = newPlaceForm.elements.name;
  const link = newPlaceForm.elements.link;
  const newPlaceCard = new Card (name.value, link.value, largePicture);
  const newPlaceCardElement = newPlaceCard.create();
  api.addNewCard (name.value, link.value)
  .then(() => {
    cardList.addCard(newPlaceCardElement);
    popupNewPlace.close();
    newPlaceValidator.removeEventListener();
    newPlaceForm.reset();
  })
  .catch((err) => {
    console.log(err);
   })

  }

newPlaceForm.addEventListener('submit', addNewCard);

addNewPlaceButton.addEventListener ('click', function () {
    popupNewPlace.open();
    newPlaceValidator.setEventListeners();
    })

closeNewPlaceButton.addEventListener('click', function () {
    popupNewPlace.close();
    newPlaceValidator.resetErrors();
    newPlaceValidator.removeEventListener();
    newPlaceForm.reset();
  })

closeLargePictureButton.addEventListener ('click', () => largePicture.close());

})();

