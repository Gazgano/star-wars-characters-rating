import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const declarations = [
  PageNotFoundComponent
];

const imports = [
  MatFormFieldModule
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports, CommonModule],
  exports: [...imports, ...declarations],
})
export class SharedModule { }
