import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { EMPTY, ReplaySubject, map, switchMap, takeUntil } from 'rxjs';
import { FetchAnimeByIdService } from '../../services/fetch-anime-by-id.service';
import { CommonModule } from '@angular/common';
import  DOMPurify from 'dompurify';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AddCharacterService } from '../../services/add-character.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character } from '../../models/character';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-anime-details',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css'
})
export class AnimeDetailsComponent implements OnDestroy,OnInit{
  private destroyed$ = new ReplaySubject(1);
  ngOnInit(): void {
    this.initializeForm()   
    this.animeDetails$.subscribe((data) => {
      this.currentAnimeId = data.animeId
      console.log(data)
    })
  }
 
  protected characterForm!:FormGroup
  protected submitted = false;
  showCharacterForm = false;
  showCharacter = false;
  characterId:any
  currentAnimeId:any
  posterFile = '';
  postPreview!:ArrayBuffer |string |null;
  characterPosterPreview = '';
  activatedRoute = inject(ActivatedRoute)
  fetchAnimeById = inject(FetchAnimeByIdService)
  addCharacterService = inject(AddCharacterService);
  toastr = inject(ToastrService)
  fb = inject(FormBuilder)

  public uploadPoster(args:any){
    if(args && args.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(args.target.files[0]);
      reader.onloadend = (myevent) => {
        if(myevent.target?.result != null)
          {
            this.postPreview = myevent.target.result;
            this.posterFile = (this.postPreview as string).split(',')[1];
            // console.log(this.postPreview)
          }
      }
    }
   }
   protected onSubmit():void{
    this.submitted = true;
    if(!this.characterForm.valid){
      this.toastr.error("Fill all the fields")
      return
    }
    if(this.characterId > 0){
      return
    }
    this.addCharacter();
    this.showCharacterForm = false
   }
   private addCharacter(){
  
    const characterData:Character ={
      characterId:this.characterForm.controls['characterId'].value,
      animeId:this.currentAnimeId,
      characterName:this.characterForm.controls['characterName'].value,
      characterPosterPath:this.posterFile
    }
    this.addCharacterService
        .mutate({characterData:characterData})
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next:() => {
            this.toastr.info('Character Added!!')
            this.showCharacterForm = false
          },error:(err) => {
            this.toastr.show('An error occured while adding character')
            console.log('An error occured',err)
          }
        })
   }

  private initializeForm():void{
    this.characterForm = this.fb.group({
      characterId:0,
      characterName:this.fb.control('',Validators.required)
    })
  }
  protected get characterFormControl(){
    return this.characterForm.controls;
  }
  toggleAddCharacterForm(){
    this.showCharacterForm = !this.showCharacterForm
  }
  sanitizer = inject(DomSanitizer)
  sanitize(content:string):SafeHtml{
    return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(content))
  }
  readonly animeDetails$ = this.activatedRoute.paramMap.pipe(
    switchMap((params:Params) => {
      const selectedanimeId = Number(params['get']('animeId'))
      if(selectedanimeId > 0){
        return this.fetchAnimeById.watch({
          filterInput:Number(selectedanimeId)
        },
        {
          fetchPolicy:'network-only'
        })
        .valueChanges.pipe(map((res) => res?.data?.animeList[0] ))
      }else{
        return EMPTY;
      }
    })
  )
  ngOnDestroy(): void {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }
}
