import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class StudentFormComponent {
  @Output() studentAdded = new EventEmitter<void>();
  
  newStudent: Student = {
    dni: '',
    lastName: '',
    firstName: '',
    email: '',
    cohort: '0',
    status: 'activo',
    gender: 'masculino',
    address: 'abc123',
    phone: '000'
  };

  constructor(private apiService: ApiService) { }

  addStudent(): void {
    if (this.isFormValid()) {
      this.apiService.addStudent(this.newStudent).subscribe({
        next: () => {
          this.studentAdded.emit();
          this.resetForm();
          alert('Estudiante agregado correctamente');
        },
        error: (error) => {
          console.error('Error adding student:', error);
          alert('Error al agregar estudiante');
        }
      });
    } else {
      alert('Por favor complete todos los campos requeridos');
    }
  }

  private isFormValid(): boolean {
    return this.newStudent.dni.trim() !== '' &&
           this.newStudent.lastName.trim() !== '' &&
           this.newStudent.firstName.trim() !== '' &&
           this.newStudent.email.trim() !== '';
  }

  private resetForm(): void {
    this.newStudent = {
      dni: '',
      lastName: '',
      firstName: '',
      email: '',
      cohort: '0',
      status: 'activo',
      gender: 'masculino',
      address: 'abc123',
      phone: '000'
    };
  }
}