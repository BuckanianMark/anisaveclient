import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddAnimeComponent } from './components/add-anime/add-anime.component';
import { AnimeDetailsComponent } from './components/anime-details/anime-details.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        pathMatch:'full'
    },
    {
        path:'add-anime',
        component:AddAnimeComponent,
        pathMatch:'full'
    },
    {
        path:'animes/details/:animeId',
        component:AnimeDetailsComponent,
       
    }
];
