import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddAnimeComponent } from './components/add-anime/add-anime.component';
import { AnimeDetailsComponent } from './pages/anime-details/anime-details.component';
import { SplashComponent } from './pages/splash/splash.component';

export const routes: Routes = [
    {
        path:'',
        component:SplashComponent,
        pathMatch:'full'
    },
    {
        path:'home',
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
