import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Cita } from 'src/app/interfaces/cita.interface';

@Component({
  selector: 'app-cita-card',
  templateUrl: './cita-card.component.html',
  styleUrls: ['./cita-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CitaCardComponent {
  @Input() cita!: Cita;
  @Input() mostrarBotonEliminar: boolean = false;
  @Output() eliminar = new EventEmitter<number>();

  onEliminar() {
    this.eliminar.emit(this.cita.id);
  }
}