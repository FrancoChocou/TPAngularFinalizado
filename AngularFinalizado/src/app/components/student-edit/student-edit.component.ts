import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class StudentEditComponent {
  @Input() student!: Student;
  @Output() studentUpdated = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  editando: boolean = false;
  
 // POR ESTO:
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

  
  constructor(private apiService: ApiService) { }

  // Método para iniciar edición
  iniciarEdicion(): void {
    this.editando = true;
    // Copiar los datos actuales del estudiante
    this.studentEditado = { ...this.student };
  }

 
  guardarCambios(): void {
    if (this.student.id) {
      this.apiService.updateStudent(this.student.id, this.studentEditado).subscribe({
        next: () => {
          // Emitir el evento para actualizar la lista
          this.studentUpdated.emit();
          this.editando = false;
          alert('Estudiante actualizado correctamente');
        },
        error: (error) => {
          console.error('Error updating student:', error);
          alert('Error al actualizar estudiante');
        }
      });
    }
  }

  // Método para cancelar edición
  cancelarEdicion(): void {
    this.editando = false;
    this.cancelEdit.emit();
  }

  ngOnChanges(): void {
    if (this.student) {
      this.studentEditado = { ...this.student };
    }
  }
}