import {
  Component,
  EventEmitter,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { Confirmation } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ViewChild } from '@angular/core';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';
import { PricePipe } from '../../pipes/price.pipe';
import { CartComponent } from '../cart/cart/cart.component';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    TruncateNamePipe,
    PricePipe,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [ConfirmationService, ConfirmPopupModule],
})
export class ProductComponent {
  constructor(
    private ConfirmationService: ConfirmationService,
    private cartService: CartService
  ) {}
  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }
  confirmDelete() {
    this.ConfirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }
  ngOnInit() {}
  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
