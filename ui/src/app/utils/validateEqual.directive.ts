import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { find } from 'lodash/find';

@Directive({
  selector: '[validateEqual]',
  providers: [
      {provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true}
  ]
})
export class EqualValidator implements Validator {
  constructor( @Attribute('validateEqual') public validateEqual: string) {}
  validate(c: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    let v = c.value;
    // control value (e.g. password)
    let e = c.root['controls'][this.validateEqual];
    // value not equal
    if (e && v !== e.value) return {
      validateEqual: true
    }
    return null;
  }
}
