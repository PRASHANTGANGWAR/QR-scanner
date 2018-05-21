import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageScanPage } from './page-scan';

@NgModule({
  declarations: [
    PageScanPage,
  ],
  imports: [
    IonicPageModule.forChild(PageScanPage),
  ],
})
export class PageScanPageModule {}
