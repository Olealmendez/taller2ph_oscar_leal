import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfiguracionPage implements OnInit {
  permitirBorrar: boolean = false;

  constructor(private db: BaseDatosService) {
    addIcons({ arrowBack });
  }

  ngOnInit() {
    this.db.borrarEnInicio$.subscribe(v => this.permitirBorrar = v);
  }

  cambiar(event: any) {
  
    this.db.guardarConfiguracion(event.detail.checked);
  }
}