import { FormControl } from "@angular/forms";

export interface AnimeForm{
    animeId: FormControl<number>;
    title: FormControl<string>;
    overview: FormControl<string>;
    genre: FormControl<string>;
    duration: FormControl<number>;
}