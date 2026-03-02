import { get } from 'http';
import { FormGroup, UntypedFormGroup, FormArray, UntypedFormArray, UntypedFormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {

  constructor() { }

  getErrorMessage(FormGroup: UntypedFormGroup, fieldName: string) {
    const field = FormGroup.get(fieldName) as UntypedFormGroup;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFormArray(FormGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number) {
    const FormArray = FormGroup.get(formArrayName) as UntypedFormArray;
    const field = FormArray.controls[index].get(fieldName) as UntypedFormGroup;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormGroup) {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return 'Campo inválido';
  }

  isFormArrayEmpty(formGroup: FormGroup, formArrayName: string): boolean {
  const control = formGroup.get(formArrayName) as FormArray;
  return !!(
    control &&
    control.invalid &&
    (control.touched || control.dirty || formGroup.touched)
  );
}

}
