import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {EditorModule,EditorComponent} from '@tinymce/tinymce-angular';
import { AnimeHelperServiceService } from '../../services/anime-helper-service.service';
import { AddAnimeService } from '../../services/add-anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from '../../models/anime';
import { ReplaySubject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-anime',
  standalone: true,
  imports: [FormsModule,EditorModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-anime.component.html',
  styleUrl: './add-anime.component.css'
})
export class AddAnimeComponent implements OnDestroy,OnInit {
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount'
  };
  protected animeForm!:FormGroup;
  protected submitted = false;
  genreList:any;
  animeId:any;
  posterFile = '';
  postPreview!:ArrayBuffer |string |null;
  animePosterPreview = '';
  public fields:Object = {text:'genreName', value:'genreName'};
  private destroyed$ = new ReplaySubject(1);

 constructor(
  private animeHelperService:AnimeHelperServiceService,
  private readonly fb:FormBuilder,
  private readonly addAnimeService:AddAnimeService,
  private readonly router:Router,
  private readonly activatedRoute:ActivatedRoute,
  private readonly toastr:ToastrService
 ){
  this.animeHelperService.genreList$.subscribe((data) => {
    this.genreList = data.genreList;
    // console.log(this.postPreview)
  })

 }
 public editorConfig = {
  plugins: 'lists link image table code help wordcount',
  toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat',
  menubar: false
};

  ngOnInit(): void {
    this.initializeForm()
  
  }
 
 protected get animeFormControl(){
  return this.animeForm.controls;
 }
 protected onSubmit():void{
  this.submitted = true;
  if(!this.animeForm.valid){
    console.log("all fields are required");
    return
  }
  if(this.animeId > 0){
    return
  }
  this.addMovie();
 }
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

 private addMovie(){
  const animeData:Anime = {
    animeId:this.animeForm.controls['animeId'].value,
    title:this.animeForm.controls['title'].value,
    genre:this.animeForm.controls['genre'].value,
    previewUrl:this.animeForm.controls['previewurl'].value,
    overview:this.animeForm.controls['overview'].value,
    duration:Number(this.animeForm.controls['duration'].value),
    posterPath:this.posterFile
  };
  this.addAnimeService
    .mutate({animeData:animeData})
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      next:() => {
        this.toastr.info('Anime Added Successfully')
        // this.toastr.success("Added")
        //console.log("Added")
        this.router.navigate(['/home'])
      },error:(err) => {
        this.toastr.show('An error occured while adding anime')
        console.log('An error occured',err)
      }
    })
 }

 private initializeForm():void{
  this.animeForm = this.fb.group({
    animeId:0,
    title:this.fb.control('',Validators.required),
    genre:this.fb.control('',Validators.required),
    previewurl:this.fb.control('',Validators.required),
    overview:this.fb.control('',[
      Validators.required,
      Validators.maxLength(1000),
    ]),
    duration:this.fb.control('',[
      Validators.required,
      Validators.min(1),
    ])
  })
 }
 ngOnDestroy(): void {
  this.destroyed$.next(0);
  this.destroyed$.complete();
}
}
