import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  myForm = new FormGroup({})
}
