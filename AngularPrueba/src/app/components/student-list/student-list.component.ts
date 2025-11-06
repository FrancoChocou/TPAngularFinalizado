import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ← AGREGAR
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentEditComponent } from '../student-edit/student-edit.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true, 
  imports: [CommonModule, StudentFormComponent, StudentEditComponent] // ← AGREGAR
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  selectedStudent?: Student;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.apiService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        alert('Error al cargar estudiantes');
      }
    });
  }

  selectStudent(student: Student): void {
    this.selectedStudent = student;
  }

  deleteStudent(id: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.apiService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
          this.selectedStudent = undefined;
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Error al eliminar estudiante');
        }
      });
    }
  }

  onStudentUpdated(): void {
    this.loadStudents();
    this.selectedStudent = undefined;
  }

  onStudentAdded(): void {
    this.loadStudents();
  }
}