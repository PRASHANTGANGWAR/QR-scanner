import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  selectedProduct: any;
  selectedProduct2: any;
  productFound:boolean = false;
  producNotFound:boolean = false;
  phone:any;
  otp:any;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  scanoutercode() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);

        this.scaninnercode();

      } else {
        this.selectedProduct = {};
        this.productFound = false;
        this.producNotFound = true;
        this.toast.show('not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


  login(phone,otp)
  {
    console.log(this.otp); console.log(this.phone);
      if((this.phone == "9999999999" || "0000000000" || "1234") && (this.otp == "1234" || "undefined"))
       {
     //alert("login sucessful");
     this.scanoutercode();
       }
 }
  

  scaninnercode()
  {
      this.selectedProduct2 = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct2 = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct2 = {};
        this.productFound = false;
        this.toast.show('not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  
  }

}
