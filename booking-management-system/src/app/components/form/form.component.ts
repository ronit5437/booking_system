import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  bookingForm!: FormGroup;
  id: any;

  constructor(
    private fb: FormBuilder,
    private service: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.getBookingById(this.id).subscribe((res: any) => {
        if (res && res.data) {
          this.bookingForm.patchValue(res.data);
        }
      });
    }
  }

  formGroup() {
    this.bookingForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      totalprice: [0],
      depositpaid: [true],
      bookingdates: this.fb.group({
        checkin: [''],
        checkout: [''],
      }),
      additionalneeds: [''],
    });
  }

  submit() {
    const bookingData = this.bookingForm.value;
    if (this.id) {
      this.service
        .updateBooking(this.id, bookingData)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.service
        .createBooking(bookingData)
        .subscribe(() => this.router.navigate(['/']));
    }
  }

  backPage() {
    this.router.navigate(['/']);
  }
}
