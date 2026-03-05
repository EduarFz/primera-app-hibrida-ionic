import { Component, OnInit, OnDestroy } from '@angular/core';
import { Motion, AccelListenerEvent } from '@capacitor/motion'; // ← importación moderna

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.page.html',
  styleUrls: ['./sensor.page.scss'],
  standalone: false,
})
export class SensorPage implements OnInit, OnDestroy {

  // Variables para los 3 ejes del acelerómetro
  x: number = 0;
  y: number = 0;
  z: number = 0;

  // Guardamos la referencia para poder detener el listener
  private listenerHandle: any;

  constructor() {}

  async ngOnInit() {
    try {
      // Iniciar escucha del acelerómetro
      this.listenerHandle = await Motion.addListener('accel', (event: AccelListenerEvent) => {
        this.x = event.acceleration.x ?? 0;
        this.y = event.acceleration.y ?? 0;
        this.z = event.acceleration.z ?? 0;
        console.log('Datos acelerómetro:', event.acceleration);
      });
    } catch (error) {
      // En browser puede lanzar error de permisos, es normal
      console.warn('Sensor no disponible en browser:', error);
    }
  }

  ngOnDestroy() {
    // Buena práctica: detener el listener cuando se sale de la página
    if (this.listenerHandle) {
      this.listenerHandle.remove();
    }
  }
}
