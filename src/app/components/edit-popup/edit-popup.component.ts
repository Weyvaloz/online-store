import { CommonModule } from '@angular/common';
import { Component, input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Input } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ValidatorFn } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}
  @Input() display: boolean = false;
  @Input() header!: string;
  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();
  @Output() displayChange = new EventEmitter<boolean>();
  @Input() product: Product = {
    price: '',
    name: '',
    image: '',
    rating: 0,
  };

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }
  numericValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const isValid = /^[0-9.]*$/.test(control.value);
      return isValid ? null : { numeric: true };
    };
  }
  productForm = this.formBuilder.group({
    price: ['', [Validators.required, this.numericValidator()]],
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: [''],
    rating: [0],
  });

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }
  onConfirm() {
    this.confirm.emit({
      name: this.productForm.value.name || '',
      image: this.productForm.value.image || '',
      price: this.productForm.value.price || '',
      rating: this.productForm.value.rating || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
