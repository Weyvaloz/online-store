import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../../types';
import { Product } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { PaginatorModule } from 'primeng/paginator';
import { HttpClient } from '@angular/common/http';
import { error } from 'node:console';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Paginator } from 'primeng/paginator';
import { Rating } from 'primeng/rating';
import { TableModule } from 'primeng/table'; // Import TableModule
import { InputTextModule } from 'primeng/inputtext'; // Import InputTextModule for the search bar
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
    ConfirmPopupModule,
    RatingModule,
    TableModule,
    InputTextModule,
    NgIf,
  ],
  providers: [ProductsService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator') paginator: Paginator | undefined;
  constructor(private productsService: ProductsService) {}
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }
  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }
  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    price: '',
    name: '',
    image: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }
  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', {
        page,
        perPage,
      })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.paginator?.changePage(0);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.paginator?.changePage(0);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.paginator?.changePage(0);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  onSearch(event: any) {
    const query = event.target.value.toLowerCase().trim();
    this.searchQuery = query;
    if (query) {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.price.toString().toLowerCase().includes(query) ||
          product.rating.toString().toLowerCase().includes(query)
      );
    } else {
      this.filteredProducts = [];
    }
  }
}
