import { Injectable } from '@angular/core';
import { FetchGenreService } from './fetch-genre.service';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeHelperServiceService {
  genreList$ = this.fetchGenre.watch().valueChanges.pipe(
    map((res) => res.data),
    shareReplay(1)
  )
  constructor(private readonly fetchGenre:FetchGenreService) { }

}
