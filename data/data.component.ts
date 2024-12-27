import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './data.component.html',
  imports: [CommonModule,FormsModule],
  standalone:true,
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
readRegistration(arg0: any) {
throw new Error('Method not implemented.');
}
  registrations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the registrations array or other necessary data
  }

  getRegistrations() {
    this.http.get<any[]>('http://localhost:8080/user/registration').subscribe(
      data => {
        this.registrations = data;
      },
      error => {
        console.error('Error fetching registration:', error);
      }
    );
  }

  updateRegistration(registration: any) {
    this.http.patch(`http://localhost:8080/user/registration/${registration.username}`, registration).subscribe(
      response => {
        console.log('Registration updated:', response);
        // Optionally, you can fetch the updated list of registrations here
        this.getRegistrations();
      },
      error => {
        console.error('Error updating registration:', error);
      }
    );
  }

  

  deleteRegistration(username: string) {
    this.http.delete(`http://localhost:8080/user/registration/${username}`).subscribe(
      response => {
        console.log('Registration deleted:', response);
        // Remove the deleted registration from the array
        this.registrations = this.registrations.filter(r => r.username !== username);
      },
      error => {
        console.error('Error deleting registration:', error);
      }
    );
  }
}
