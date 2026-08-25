import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dinamic-page.html',
})
export class DinamicPage {
  private fb = inject(FormBuilder)

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Elden Ring', Validators.required]
    ], Validators.minLength(3))
  })

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }
}
