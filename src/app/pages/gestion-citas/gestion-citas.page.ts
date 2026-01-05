import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BaseDatosService } from 'src/app/services/base-datos.service';
import { Cita } from 'src/app/interfaces/cita.interface';
import { trashOutline, arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class GestionCitasPage {
  formulario: FormGroup;
  citas: Cita[] = [];

  constructor(private fb: FormBuilder, private db: BaseDatosService) {
    addIcons({ trashOutline, arrowBack });
    
    this.formulario = this.fb.group({
      texto: ['', [Validators.required, Validators.minLength(5)]],
      autor: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ionViewWillEnter() {
    this.citas = this.db.getCitas();
  }

  async agregar() {
    if (this.formulario.valid) {
      await this.db.agregarCita(
        this.formulario.value.texto, 
        this.formulario.value.autor
      );
      this.formulario.reset();
      this.citas = this.db.getCitas(); 
    }
  }

  async eliminar(id: number) {
    await this.db.eliminarCita(id);
    this.citas = this.db.getCitas();
  }
}