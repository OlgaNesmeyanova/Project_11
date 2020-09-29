
export default class Api {

   getUserData = () => {
    return fetch('https://nomoreparties.co/cohort12/users/me', {
        headers: {
            authorization: '46d818af-6583-45d0-bc0a-1d0bd5d211c1'
        }
      })
      .then((result) => {
        if (!result.ok) {
          return Promise.reject(`Ошибка: ${result.status}`);
        } else {
          return result.json();
        }
      })
    }

    getInitialCards = ()=> {
        return fetch('https://nomoreparties.co/cohort12/cards', {
        headers: {
            authorization: '46d818af-6583-45d0-bc0a-1d0bd5d211c1'
        }
      })
      .then((result) => {
        if (!result.ok) {
          return Promise.reject(`Ошибка: ${result.status}`);
        } else {
          return result.json();
        }
      })
  }

  editProfile = (name, job)=> {
    return fetch('https://nomoreparties.co/cohort12/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '46d818af-6583-45d0-bc0a-1d0bd5d211c1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
  .then((result) => {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    } else {
      return result.json();
    }
  })
  }

  addNewCard = (nameValue, linkValue) => {
    return fetch('https://nomoreparties.co/cohort12/cards', {
    method: 'POST',
    headers: {
      authorization: '46d818af-6583-45d0-bc0a-1d0bd5d211c1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameValue,
      link: linkValue
    })
  })
  .then((result) => {
    if (!result.ok) {
      return Promise.reject(`Ошибка: ${result.status}`);
    } else {
      return result.json();
    }
  })
  }

}

