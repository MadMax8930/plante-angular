import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  baseUrl: string;

  mycategorys: Observable<any>;

  subjectListProduct$ = new Subject<any[]>();
  subjectCategorysProduct$ = new Subject<any[]>();

  // Observable: flux de donnee entre nos composants ou 
  // flux de donnee async qui provient d'un serveur API.

  // Promise: utilisable qu'une seule fois, alors que les Observables
  // consomment un flux de donnee qu'un on peut utiliser plusieurs fois.

  // Test des Observables froids (unicaste)
  obs$ = new Observable(fluxData => fluxData.next(Math.random()));

  // Test des Observables chauds (multicaste)
  sub$ = new Subject<string>();

  behav$ = new BehaviorSubject<string>('Video janvier 2022');

  private myCategorysSubject = new Subject<any>();

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrlApi;
    this.mycategorys = this.myCategorysSubject.asObservable();

    // Abonnement observable froid (flux de donnee)
    this.obs$.subscribe(data => {
      console.log("Observer 1: ", data)
    })

    this.obs$.subscribe(data => {
      console.log("Observer 2: ", data)
    })

    // Emission via observable chauds
    this.sub$.next('NewLetter Janvier 2022'); // envoyer une newsletter Janvier 2022
    console.log('...Envoie newsletter Janv 2022')

    // Abonnement observable chauds
    this.sub$.subscribe(data => {
      console.log("Observer Subject 1: ", data);
    })

    this.sub$.subscribe(data => {
      console.log("Observer Subject 2: ", data);
    })

    this.sub$.subscribe(data => {
      console.log("Observer Subject 3: ", data);
    })

    this.sub$.next('NewsLetter Mars 2022'); // envoyer une autre newsletter Mars 2022
    console.log("...Envoie newsletter Mars 2022")

    this.sub$.subscribe(data => {
      console.log("Observer Subject 4: ", data);
    })

    this.sub$.next('NewLetter Avril 2022'); // envoyer une autre newsletter Avril 2022
    console.log('...Envoie newletter Avril 2022')

    this.behav$.subscribe(data => {
      console.log("Observer Behavior 1:", data);
    })

    this.behav$.next('Video Mars 2022');

    this.behav$.subscribe(data => {
      console.log("Observer Behavior 2:", data);
    })

    this.behav$.next('Video Avril 2022');
  }

  getListProducts(): Observable<any[]> {
    // req HTTP sur l'url http://localhost:3000/list_products
    return this.http.get<any[]>(`${this.baseUrl}/list_products`);
  }

  getListProductsChaud(): void {
    this.getListProducts().subscribe(data => {
      this.subjectListProduct$.next(data);
    })
  }

  getById(id: any): Observable<any[]> {
    // requete http sur l'url http://localhost:3000/list_products
    return this.http.get<any[]>(`${this.baseUrl}/list_products/${parseInt(id)}`);
  }

}
