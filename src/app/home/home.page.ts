import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // Array donde se guardan los datos de la API
  ejercicios: any[] = [];

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
    await this.cargarEjercicios();
  }

  async cargarEjercicios() {
    const datosGuardados = await this.storage.get('ejercicios');

    if (datosGuardados) {
      this.ejercicios = datosGuardados;
      console.log('Desde storage local:', this.ejercicios);
    } else {
      const url = 'https://wger.de/api/v2/exercise/?format=json&language=2&limit=10';
      this.http.get<any>(url).subscribe(async (data) => {
        this.ejercicios = data.results;
        await this.storage.set('ejercicios', this.ejercicios);
        console.log('Desde API:', this.ejercicios);
      });
    }
  }
}
