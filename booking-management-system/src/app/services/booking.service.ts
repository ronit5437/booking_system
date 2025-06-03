// booking.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  baseAPI = 'http://localhost:3000/api/booking';

  token = 'YWRtaW46cGFzc3dvcmQxMjM=';

  constructor(private http: HttpClient) {}

  getBookings() {
    return this.http.get(`${this.baseAPI}`);
  }

  getBookingById(id: any) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.token}`
    });
    return this.http.get(`${this.baseAPI}/${id}`, {headers});
  }

  createBooking(data: any) {
    return this.http.post(`${this.baseAPI}`, data);
  }

  updateBooking(id: any, data: any) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.token}`
    });
    return this.http.put(`${this.baseAPI}/${id}`, data, { headers });
  }

  deleteBooking(id: any) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.token}`
    });
    return this.http.delete(`${this.baseAPI}/${id}`, { headers });
  }
}
