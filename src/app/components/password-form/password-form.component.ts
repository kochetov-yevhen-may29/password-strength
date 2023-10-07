import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent {

  passwordForm = new FormGroup({
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
      ],
    })
  })

  get password() {
    return this.passwordForm.get('password') as FormControl;
  }

  private checkPassword() {
    const value = this.password.value;
    this.hasLetters = /[a-zA-Zа-яА-ЯіІїЇєЄёЁ]/.test(value);
    this.hasDigits = /\d/.test(value);
    this.hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);
  }

  hasLetters: boolean = false;
  hasDigits: boolean = false;
  hasSymbols: boolean = false;

  applyDefault() {
    if (!this.password.value.length) {
      return;
    }
    const isInvalid = this.password.invalid && this.password.dirty;
    return isInvalid;
  }

  applyEasy() {
    if (this.password.value.length >= 8) {
      return true;
    }
    return false;
  }

  applyMedium() {
    this.checkPassword();
    if (this.hasLetters && (this.hasDigits || this.hasSymbols) || (this.hasDigits && this.hasSymbols)) {
      return true;
    }
    return false;
  }

  applyStrong() {
    this.checkPassword();
    if (this.hasLetters && this.hasDigits && this.hasSymbols) {
      return true;
    }
    return false;
  }
}
