import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { Cita } from 'src/app/interfaces/cita.interface';
import { CitaCardComponent } from 'src/app/components/cita-card/cita-card.component';
import { add, settingsOutline } from 'ionicons/icons'; // Iconos
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, CitaCardComponent]
})
export class InicioPage {
  citaActual: Cita | null = null;
  permitirBorrar: boolean = false;

  constructor(private dbService: BaseDatosService) {
    addIcons({ add, settingsOutline }); 
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    
    this.dbService.borrarEnInicio$.subscribe(p => this.permitirBorrar = p);
    this.citaActual = this.dbService.getCitaAleatoria();
  }

  eliminar(id: number) {
    this.dbService.eliminarCita(id);
    this.cargarDatos();
  }
}