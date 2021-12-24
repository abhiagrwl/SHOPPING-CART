import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [

  ];

  cartTotal = 0

  constructor(private msg: MessengerService) { }

  ngOnInit() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product)
    })
  }

  addProductToCart(product: Product) {

    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product.id) {
        alert("This Product already exist in Cart")
        productExists = true
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product.id,
        productName: product.name,
        qty: 1,
        price: product.price
      })
    }
    
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }


  removeItem(item)
  {
    console.log(item)
    
    
    this.cartItems = this.cartItems.filter(e=> e.productId != item.productId)
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })

  }  
}

placeOrderBanner()
  {

    console.log("Order Placed Successfully !! ")
    //this.placeOrderMessage = true;
    alert("Order Placed Successfully !!")
    this.cartItems.length = 0;
    this.cartTotal = 0;


    // setTimeout(() => {
    //   this.cartItems.length = 0;
    //   this.cartTotal = 0;
    // }, 3000)

  }

