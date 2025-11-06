import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // ← Asegúrate de tener FormsModule
})
export class StudentEditComponent {
  @Input() student!: Student;
  @Output() studentUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  // Agrega esta propiedad
  editando: boolean = false;
  
  // Objeto para almacenar los datos editados
  studentEditado: Student = {
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    cohort: '',
    status: '',
    gender: '',
    address: '',
    phone: ''
  };

  // Método para iniciar edición
  iniciarEdicion(): void {
    this.editando = true;
    // Copiar los datos actuales del estudiante
    this.studentEditado = { ...this.student };
  }

  // Método para guardar cambios
  guardarCambios(): void {
    // Aquí deberías llamar al servicio para actualizar
    this.studentUpdated.emit();
    this.editando = false;
  }

  // Método para cancelar edición
  cancelarEdicion(): void {
    this.editando = false;
    this.cancelEdit.emit();
  }

  // Si necesitas el método ngOnChanges para cuando cambie el student
  ngOnChanges(): void {
    if (this.student) {
      this.studentEditado = { ...this.student };
    }
  }
}