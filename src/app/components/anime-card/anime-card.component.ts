import { Component, Input } from '@angular/core';
import { Anime } from '../../models/anime';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anime-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.css'
})
export class AnimeCardComponent {
  @Input({required:true}) anime!:Anime;
  isActive = false

}
