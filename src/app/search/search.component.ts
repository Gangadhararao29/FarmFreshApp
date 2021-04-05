import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'services/cart.service';
import { ProductService } from 'services/product.service';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  productsArray=[];

  constructor(private ps:ProductService, private router:Router,private us:UserService, private toastr:ToastrService,private cs:CartService) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res) => {
      // console.log("mes1",res['message'])
      this.productsArray = res['message'];
    })
  }

  link(id){
    if(localStorage.getItem('userName'))
    this.router.navigateByUrl(`/user/productdetails/${id}`)
    else{
      this.router.navigateByUrl(`/productdetails/${id}`)
    }
  }

  addToCart(product) {
    let CartObj = {
      userName: ' ',
      productId: Number,
      quantity: 1,
    };
    CartObj.userName = localStorage.getItem('userName');
    CartObj.productId = product.productId;

    if (CartObj.userName) {
      this.us.addToCart(CartObj).subscribe((res) => {
        if (res['message'] == 'Product added to the cart Successful') {
          this.toastr.success('Product added to the cart Successful');
        } else if (res['message'] == 'Product quantity updated') {
          this.toastr.success(
            'Product quantity updated',
            'Product already exists'
          );
        } else {
          this.toastr.warning('Something went wrong');
          console.log(res['err']);
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
