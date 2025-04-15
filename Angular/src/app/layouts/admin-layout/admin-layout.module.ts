import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavbarModule } from '../../shared/navbar/navbar.module';
import { FooterModule } from '../../shared/footer/footer.module';
import { SidebarModule } from '../../sidebar/sidebar.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NavbarModule,
    SidebarModule,
    FooterModule
  ],
  declarations: [
    ],
})
export class AdminLayoutModule {}