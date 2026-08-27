import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dinamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dinamic-page.html',
})
export class DinamicPage {
  private fb = inject(FormBuilder)
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Elden Ring', Validators.required]
    ], Validators.minLength(2))
  })

  newFavorite = new FormControl('', Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value!.trim();

    const gameExists = this.favoriteGames.value.some(
      (game: string) => game.toLowerCase() === newGame.toLowerCase()
    );

    if (gameExists) {
      this.newFavorite.setErrors({
        gameExists: true
      });

      return;
    };

    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number){
    this.favoriteGames.removeAt(index)
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
