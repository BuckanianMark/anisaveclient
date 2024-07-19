import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {ToastrModule} from 'ngx-toastr'
import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(GraphQLModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates:true
    })),
    provideExperimentalZonelessChangeDetection(), 
    provideRouter(routes),
    ]
};
