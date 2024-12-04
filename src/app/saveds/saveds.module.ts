import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedsPageRoutingModule } from './saveds-routing.module';

import { SavedsPage } from './saveds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedsPageRoutingModule
  ],
  declarations: [SavedsPage]
})
export class SavedsPageModule {}
