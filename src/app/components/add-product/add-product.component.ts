import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: any = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: ''
  };

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.addProduct(this.product).subscribe(response => {
      alert('Product added successfully!');
    });
  }
}