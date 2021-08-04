import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[passwordMatch]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PasswordMatchValidatorDirective, multi: true }]
})
export class PasswordMatchValidatorDirective implements Validator {
    @Input('passwordMatch') password: string;

    validate(control: AbstractControl): ValidationErrors | null {
        return (this.password === control.value)
            ? null // Validation Success
            : { passwordMatch: 'Password match validation error' }; // ValidationErrors object
    }
}