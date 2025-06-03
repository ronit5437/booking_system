import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  bookingList: any[] = [];
  isLoading = false;

  constructor(private service: BookingService, private router: Router) { }

  ngOnInit() {
    this.service.getBookings().subscribe((res: any) => {
      this.isLoading = true;
      if (res && res.data) {
        setTimeout(() => {
          this.bookingList = res.data;
          this.isLoading = false;
        }, 100);
      }
    });
  }

  create() {
    this.router.navigate(['/create']);
  }

  editBooking(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteBooking(id: number) {
    this.service.deleteBooking(id).subscribe(() => {
      this.bookingList = this.bookingList.filter((b: any) => b.bookingid !== id);
    });
  }
}
