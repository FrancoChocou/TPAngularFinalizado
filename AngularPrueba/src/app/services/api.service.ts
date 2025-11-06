import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://5620-181-230-219-190.ngrok.io/student';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/students/${id}`);
  }
}