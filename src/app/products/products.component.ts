import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsArray = [];
  productsOrgainc = [];
  productsOrgaincFruits = [];
  productsOrgaincVegetables = [];
  productsInorgainc = [];
  productsInorgaincFruits = [];
  productsInorgaincVegetables = [];

  constructor(
    private ps: ProductService,
    private us: UserService,
    private router: Router,
    private toastr: ToastrService,
    private cs: CartService
  ) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res;
      // console.log("mes2",this.productsArray)

      // Organic and Inorganic products separation
      this.productsArray.forEach((product) => {
        if (product.productBrand == 'Organic') {
          if (product.productCategory == 'Fruits') {
            this.productsOrgaincFruits.push(product);
          } else if (product.productCategory == 'Vegetables') {
            this.productsOrgaincVegetables.push(product);
          }
        } else if (product.productBrand == 'Inorganic') {
          if (product.productCategory == 'Fruits') {
            this.productsInorgaincFruits.push(product);
          } else if (product.productCategory == 'Vegetables') {
            this.productsInorgaincVegetables.push(product);
          }
        }
      });
      // console.log("mes3",this.productsOrgainc)
      // console.log("mes4",this.productsInorgainc)
      // console.log("mes5",this.productsOrgaincFruits)
      // console.log("mes6",this.productsOrgaincVegetables)
    });
  }

  details(id) {
    let user = localStorage.getItem('userName');
    if (user) {
      let userObject = {
        userName: '',
      };
      userObject.userName = user;

      this.us.checkAdminUser(userObject).subscribe((res) => {
        if (res['message'] == 'User is Admin') {
          this.router.navigateByUrl(`admin/productdetails/${id}`);
        } else {
          this.router.navigateByUrl(`user/productdetails/${id}`);
        }
      });
    } else {
      this.router.navigateByUrl(`/productdetails/${id}`);
    }
  }

  addToCart(event, product) {
    event.stopPropagation();
    const CartObj = {
      userName: localStorage.getItem('userName'),
      productId: product.productId,
      quantity: 1,
    };

    if (CartObj.userName) {
      this.us.addToCart(CartObj).subscribe((res) => {
        if (res['message'] == 'Product added to the cart Successful') {
          this.toastr.success('  ', 'Product added to the cart Successful');
        } else if (res['message'] == 'Product quantity updated') {
          this.toastr.success(
            'Product quantity updated',
            'Product already exists'
          );
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.warning('Something went wrong');
          console.log(res['message']);
        }
      });
    } else {
      this.toastr.warning('Please login to Add to your cart');
      this.router.navigateByUrl('/login');
    }

    this.us.getCount(CartObj.userName).subscribe((res) => {
      // this.num =res['message']
      // this.cs.setNum(this.num)
      this.cs.setNum(res['message'] + 1);
    });
  }
}
