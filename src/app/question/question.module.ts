import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';

import { QuestionPage } from './question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [QuestionPage]
})
export class QuestionPageModule { }
