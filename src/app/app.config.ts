import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'littel-linguist-2',
        appId: '1:987101787839:web:19d6befa001dea31baf80a',
        storageBucket: 'littel-linguist-2.appspot.com',
        apiKey: 'AIzaSyBvg4VOu2RkrJ8lbRt75eI_vqyHeqKS1d0',
        authDomain: 'littel-linguist-2.firebaseapp.com',
        messagingSenderId: '987101787839',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
