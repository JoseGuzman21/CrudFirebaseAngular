import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://angula-crud-firebase-fd8cc.firebaseio.com';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  crearHeroe( heroe: HeroeModel) {
    return this.http.post(`${this.url}/Heroes.json`, heroe)
            .pipe(map( (resp: any) => {
              heroe.id = resp.name;
              return heroe;
          }));
  }

  // tslint:disable-next-line: typedef
  actualizarHeroe(heroe: HeroeModel) {
    /* const heroeId = heroe.id;
    delete heroe.id; */
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/Heroes/${heroe.id}.json`, heroeTemp);
  }
}
