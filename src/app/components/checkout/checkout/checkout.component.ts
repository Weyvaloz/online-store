import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { Form } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder, private cartService: CartService) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
    });
  }

  formatExpiryDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }

    input.value = value;
    this.checkoutForm.get('expiryDate')?.setValue(value, { emitEvent: false });
  }
}
