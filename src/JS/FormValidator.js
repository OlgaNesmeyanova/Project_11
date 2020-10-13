export default class FormValidator {
    constructor (form) {
        this.form = form;
        this.button = this.form.querySelector('.button');
        this.inputs = Array.from(this.form.querySelectorAll('.popup__input'));
        this._handler = this._handler.bind(this)
    }
    _checkInputValidity (input, error) {
        let inputIsValid = true;
        if (input.validity.valid) {
          error.textContent = '';
        } else {
          if (input.validity.valueMissing) {
          error.textContent = 'Это обязательное поле';
          }
          else if (input.validity.tooShort || input.validity.tooLong) {
            error.textContent = 'Должно быть от 2 до 30 символов';
          }
          else if (input.validity.typeMismatch) {
            error.textContent = 'Здесь должна быть ссылка';
          }
          inputIsValid = false;
        }
        return inputIsValid;
    }
    _setSubmitButtonState (button, status) {
        if (status) {
            button.removeAttribute('disabled');
          } else {
            button.setAttribute('disabled', true); 
          }  
    }
    
    _checkFormValidity (inputs){
      let formIsValid = true; 
            inputs.forEach(input => {
              this.error = input.nextElementSibling;
              let inputIsValid = this._checkInputValidity(input, this.error);
              if (!inputIsValid) {
                formIsValid = false;
              }
            });
            return formIsValid;
    }

    _handler () {
      let status = this._checkFormValidity (this.inputs);
      this._setSubmitButtonState (this.button, status);
    }

  setEventListeners () {
      this._handler();
      this.form.addEventListener ('input', this._handler);
    }

  removeEventListener () {
    this.form.removeEventListener ('input',  this._handler)
  }

    resetErrors () {
      const errors = Array.from(this.form.querySelectorAll('.popup__error'));
      errors.forEach((error) => {error.textContent=''})
  }

 

}
