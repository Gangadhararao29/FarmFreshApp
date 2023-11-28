import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css'],
})
export class EditproductComponent implements OnInit {
  productsArray = [];
  productsOrgainc = [];
  productsOrgaincFruits = [];
  productsOrgaincVegetables = [];
  productsInorgainc = [];
  productsInorgaincFruits = [];
  productsInorgaincVegetables = [];

  constructor(
    private ps: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res;
      // console.log("mes2",this.productsArray)
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
    });
  }

  edit(id) {
    this.router.navigateByUrl(`admin/editdetails/${id}`);
  }

  delete(product) {
    let exp = confirm('Press Ok to delete the product from Database');
    if (exp) {
      // DOM
      let index = this.productsArray.findIndex((x) => x == product);

      if (this.productsArray[index].productBrand == 'Organic') {
        if (this.productsArray[index].productCategory == 'Fruits') {
          let index = this.productsOrgaincFruits.findIndex((x) => x == product);
          this.productsOrgaincFruits.splice(index, 1);
        } else if (this.productsArray[index].productCategory == 'Vegetables') {
          let index = this.productsOrgaincVegetables.findIndex(
            (x) => x == product
          );
          this.productsOrgaincVegetables.splice(index, 1);
        }
      } else {
        if (this.productsArray[index].productCategory == 'Fruits') {
          let index = this.productsInorgaincFruits.findIndex(
            (x) => x == product
          );
          this.productsInorgaincFruits.splice(index, 1);
        } else if (this.productsArray[index].productCategory == 'Vegetables') {
          let index = this.productsInorgaincVegetables.findIndex(
            (x) => x == product
          );
          this.productsInorgaincVegetables.splice(index, 1);
        }
      }

      //Backend
      this.ps.deleteProduct(product).subscribe((res) => {
        if (res['message'] == 'Product deleted') {
          this.toastr.success('Product deleted Successfully');
        } else if (res['message'] == 'Unauthorised access') {
          this.toastr.warning('Unauthorised access', 'Please login to access');
          this.router.navigateByUrl('/login');
        } else if (res['message'] == 'Session Expired') {
          this.toastr.warning('Session Expired', 'Please relogin to continue');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.warning('Something went wrong in deleting the Product');
          console.log(res['message']);
        }
      });
    }
  }
}
