import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {EditorModule} from '@tinymce/tinymce-angular';
import { AddAnimeComponent } from './components/add-anime/add-anime.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,EditorModule,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';
  ngOnInit(): void {
    try {
      AOS.init({
        animatedClassName: 'aos-animate',
        delay: 0,
        duration: 800,
        easing: 'ease',
        mirror: false,
      });
    } catch (error) {
      console.error('Failed to initialize AOS:', error);
    }
  }
}
