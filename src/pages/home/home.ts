import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, MenuController, Events } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { AlertProvider } from '../../providers/alert/alert';
import { UserOptions } from '../../interface/user-options';
import { PageScanPage } from '../page-scan/page-scan';



//import {SucessPage} from '../sucess'; 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  //SucessPage=SucessPage;

  products: any[] = [];
  selectedProduct: any;
  selectedProduct2: any;
  productFound:boolean = false;
  producNotFound:boolean = false;
  phone:any;
  otp:any;
    loginForm:any;
      submitted = false;
  login: UserOptions = { mobile: '', password: '' };
    public flag : boolean = false;


  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public dataService: DataServiceProvider,
      public events: Events,
    public menu: MenuController,
    public alerts:AlertProvider,
    private fb: FormBuilder
    ) {
      this.dataService.getProducts()
        .subscribe((response)=> {
            this.products = response
            console.log(this.products);
        });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'mobile':[null,[Validators.required,Validators.pattern(/^[\s()+-]*([0-9][\s()+-]*){1,10}$/)]],
      'password':[null,[Validators.required]]
    });
  } 

  scanoutercode() {
                    this.navCtrl.setRoot(PageScanPage);

    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
        alert("you scanned :(" + barcodeData.text+")" + "  "+"now scan inner barcode")
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
        alert("Scanned code invalid please scan valid 'OUTER' Bar/QR code");
      this.scanoutercode();
      }
        

    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

/*switch()
{
          this.navCtrl.push('SucessPage');

}*/
  onLogin(phone,otp)
  {
      if (this.loginForm.valid) {
    console.log(this.otp); console.log(this.phone);
      if((this.phone == "9999999999" || "0000000000" || "1234") && (this.otp == "1234" || "undefined"))
       {
     //alert("login sucessful");
     this.scanoutercode();
       }

     }
     else{
      this.submitted = true;
      return false;
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
                alert("scanning inner and outer bar code sucessful");
         this.scanoutercode();
        
      } else {
        this.selectedProduct2 = {};
        this.productFound = false;
        this.toast.show('not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        alert("Scanned code invalid please scan valid 'INNER' Bar/QR code");
        this.scaninnercode();

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
