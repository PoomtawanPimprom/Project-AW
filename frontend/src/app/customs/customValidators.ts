import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static forbiddenWords(forbiddenWords: string[]): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const hasForbiddenWord = forbiddenWords.some(word => control.value.includes(word));
      return hasForbiddenWord ? { forbiddenWords: true } : null;
    };
  }

  static maxLength(max: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value.length > max ? { maxLength: true } : null;
    };
  }

  static notPastDate(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate < today ? { pastDate: true } : null;
  }
}