import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { CustomValidators } from './custom-validators';

fdescribe('CustomValidators', () => {
  let control: AbstractControl;

  describe('passwordContainsNumber', () => {
    it('should return null when the password contains a number', () => {
      control = new FormControl('password1');
      const result = CustomValidators.passwordContainsNumber(control);
      expect(result).toBeNull();
    });

    it('should return an error when the password does not contain a number', () => {
      control = new FormControl('password');
      const result = CustomValidators.passwordContainsNumber(control);
      expect(result).toEqual({passwordInvalid: true});
    });
  });

  describe('passwordsMatch', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = new FormGroup({
        password: new FormControl(),
        passwordConfirm: new FormControl(),
      });
    });

    it('should return null when the passwords match', () => {
      formGroup.setValue({ password: 'password1', passwordConfirm: 'password1' });
      const result = CustomValidators.passwordsMatch(formGroup);
      expect(result).toBeNull();
    });

    it('should return an error when the passwords do not match', () => {
      formGroup.setValue({ password: 'password1', passwordConfirm: 'password2' });
      const result = CustomValidators.passwordsMatch(formGroup);
      expect(result).toEqual({passwordsNotMatching: true});
    });

    it('should return an error when the passwords are both null', () => {
      formGroup.setValue({ password: null, passwordConfirm: null });
      const result = CustomValidators.passwordsMatch(formGroup);
      expect(result).toEqual({passwordsNotMatching: true});
    });
  });
});
