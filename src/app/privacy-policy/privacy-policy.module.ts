import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { MaterialModule } from '../angular_material/material.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ContactComponent,
    FaqComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    MaterialModule,
    MatExpansionModule,
    TranslateModule
  ],
  exports: [MatExpansionModule]
})
export class PrivacyPolicyModule { }
