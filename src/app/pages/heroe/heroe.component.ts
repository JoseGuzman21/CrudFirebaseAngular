import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  // tslint:disable-next-line: new-parens
  heroe = new HeroeModel;

  constructor(private heroesSerive: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.heroesSerive.getHeroe(id)
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  // tslint:disable-next-line: typedef
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('formulario no válido');
      return;
    }
    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando informacion',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
/* .subscribe( resp => {
        console.log('resp', resp);
      }); */
    if (this.heroe.id) {
      peticion = this.heroesSerive.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesSerive.crearHeroe(this.heroe);
      /* .subscribe( resp => {
        console.log('resp', resp);
      }); */
    }
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
    });
  }
}
