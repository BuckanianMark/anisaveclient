import { Component,OnInit,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchAnimeListService } from '../../services/fetch-anime-list.service';
import { Observable, combineLatestWith, map } from 'rxjs';
import { Anime } from '../../models/anime';
import { AnimeHelperServiceService } from '../../services/anime-helper-service.service';
import { CommonModule } from '@angular/common';
import { GenreType } from '../../models/genre';
import { AnimeFilterComponent } from '../anime-filter/anime-filter.component';
import { AnimeCardComponent } from '../anime-card/anime-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AnimeFilterComponent,
    AnimeCardComponent,
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{



  genreList:Observable<GenreType>
  activatedRote = inject(ActivatedRoute)
  fetchAnimeService = inject(FetchAnimeListService)
  fetchGenres = inject(AnimeHelperServiceService)
  constructor(){
    this.genreList = this.fetchGenres.genreList$;
  
  }
  ngOnInit(): void {
  this.anime$.subscribe((data) => {
  console.log(data)

})
  }
  private readonly anime$ = this.fetchAnimeService.watch({
    fetchPolicy:'network-only'
  }).valueChanges.pipe(map((res) => res.data )) 
  

  vm$ = this.activatedRote.queryParams.pipe(
    combineLatestWith(this.anime$),
    map(([params,animes]) => {
      let homeVm = new Vm();

      homeVm.selectedGenre = params['genre'];
      if(homeVm.selectedGenre){
        const filterByGenre = animes?.animeList.filter(
          (anime) => anime.genre.toLocaleLowerCase() === homeVm.selectedGenre
        )
        homeVm.animeList = filterByGenre;
      }else{
        homeVm.animeList = animes?.animeList
      }
      return homeVm;
    })
  )
}
class Vm{
  animeList:Anime[];
  selectedGenre:string;
  constructor() {
    this.animeList = []
    this.selectedGenre = '';
  }

}