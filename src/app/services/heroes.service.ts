import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

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

  // tslint:disable-next-line: typedef
  getHeroes() {
    return this.http.get(`${this.url}/Heroes.json`)
      .pipe(map( this.crearArreglo), delay(1500));
  }

  // tslint:disable-next-line: typedef
  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];
    console.log('heroes', heroesObj);
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    if (heroesObj === null ) {
      return [];
    }
    return heroes;
  }

  // tslint:disable-next-line: typedef
  getHeroe(id: string) {
    return this.http.get(`${this.url}/Heroes/${id}.json`);
  }

  // tslint:disable-next-line: typedef
  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/Heroes/${id}.json`);
  }
}
