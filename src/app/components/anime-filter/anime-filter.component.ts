import { Component, inject } from '@angular/core';
import { Genre } from '../../models/genre';
import { AnimeHelperServiceService } from '../../services/anime-helper-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime-filter.component.html',
  styleUrl: './anime-filter.component.css'
})
export class AnimeFilterComponent {
  readonly defaultGenre = 'AllGenres';
  allGenre:Genre = {genreid:0,genreName:this.defaultGenre}
  animeHelperService = inject(AnimeHelperServiceService);
  router = inject(Router);
  genreList$ = this.animeHelperService.genreList$.pipe(
    map((result) => {
      console.log(result)
      if(result){
        return result.genreList.concat(this.allGenre).reverse();
      }else{
        return []
      }
    })
  )
  public setField = {
    text: 'genreName',
    value: 'genreId',
    tooltip: 'genreName',
  }
  filterAnime(event:any){
    console.log(event.target.innerText.toLocaleLowerCase())
    const selectedGenre = event.target.innerText.toLocaleLowerCase();
    if(selectedGenre === this.defaultGenre.toLocaleLowerCase()){
      this.router.navigate(['/home'])
    }else{
      this.router.navigate(['/home'],{
        queryParams:{genre:selectedGenre},
        queryParamsHandling:'merge'
      })
    }
  }

}
