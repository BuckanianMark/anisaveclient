import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {ToastrModule} from 'ngx-toastr'
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { provideFirebaseApp,initializeApp } from '@angular/fire/app';
import {provideStorage,getStorage} from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../enviroments/enviroments'

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    importProvidersFrom(GraphQLModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates:true
    })),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ]
};
