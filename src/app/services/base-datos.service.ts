import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Cita } from '../interfaces/cita.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDatosService {
  
  private _borrarEnInicio = new BehaviorSubject<boolean>(false);
  borrarEnInicio$ = this._borrarEnInicio.asObservable();

  private citas: Cita[] = [
    { id: 1, texto: 'El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene.', autor: 'Ralph Waldo Emerson' },
    { id: 2, texto: 'Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito.', autor: 'Thomas Edison' },
    { id: 3, texto: 'Ningún viento es bueno para el barco que no sabe adónde va.', autor: 'Séneca' }
  ];

  constructor() {
    this.iniciarPlugin();
  }

  async iniciarPlugin() {
    const { value } = await Preferences.get({ key: 'borrar_inicio' });
    this._borrarEnInicio.next(value === 'true');
    console.log('Base de datos inicializada (Modo Web/Híbrido)');
  }

  getCitas(): Cita[] {
    return this.citas;
  }

  async agregarCita(texto: string, autor: string) {
    const nuevaCita: Cita = {
      id: Date.now(),
      texto: texto,
      autor: autor
    };
    this.citas.push(nuevaCita);
    // await this.db.execute('INSERT INTO citas (texto, autor) VALUES (?, ?)', [texto, autor]);
  }

  async eliminarCita(id: number) {
    this.citas = this.citas.filter(c => c.id !== id);
    // await this.db.execute('DELETE FROM citas WHERE id = ?', [id]);
  }

  getCitaAleatoria(): Cita | null {
    if (this.citas.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.citas.length);
    return this.citas[randomIndex];
  }

  async guardarConfiguracion(permitir: boolean) {
    await Preferences.set({ key: 'borrar_inicio', value: String(permitir) });
    this._borrarEnInicio.next(permitir);
  }
}