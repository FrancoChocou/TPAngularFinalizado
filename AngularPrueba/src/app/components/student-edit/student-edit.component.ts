import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';

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

  editando = false;
  studentEditado: Student = {} as Student;

  constructor(private apiService: ApiService) { }

  iniciarEdicion(): void {
    this.editando = true;
    this.studentEditado = { ...this.student };
  }

  guardarCambios(): void {
    if (this.isFormValid()) {
      this.apiService.updateStudent(this.student.id!, this.studentEditado).subscribe({
        next: () => {
          this.editando = false;
          this.studentUpdated.emit();
          alert('Estudiante actualizado correctamente');
        },
        error: (error) => {
          console.error('Error updating student:', error);
          alert('Error al actualizar estudiante');
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.cancelEdit.emit();
  }

  private isFormValid(): boolean {
    return this.studentEditado.dni.trim() !== '' &&
           this.studentEditado.lastName.trim() !== '' &&
           this.studentEditado.firstName.trim() !== '' &&
           this.studentEditado.email.trim() !== '';
  }
}