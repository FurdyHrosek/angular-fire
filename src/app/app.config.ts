import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyCB6oI5JJf-uSP9-0dNuOjfsNArydtK3P4",
  authDomain: "furdy-fire.firebaseapp.com",
  projectId: "furdy-fire",
  storageBucket: "furdy-fire.appspot.com",
  messagingSenderId: "330431681247",
  appId: "1:330431681247:web:1d15c84ed49f19bff08f6a"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
