import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

//const uri = 'https://aniserver-35jo.onrender.com/graphql/'; 
const uri = 'http://localhost:5068/graphql'; 
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext(() => {
    const headerToken = localStorage.getItem('auth-token-animeapp')
    if(headerToken === null)
      {
        return {};
      }else
      {
        return {
          headers:{
            Authorization: `Bearer ${headerToken}`,
          }
        }
      }
  });
  const link = ApolloLink.from([auth,httpLink.create({ uri })])
  const cache = new InMemoryCache()
  return {
    link,
    cache,
    connectToDevTools:true
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink,HttpClient],
    },
  ],
})
export class GraphQLModule {}
