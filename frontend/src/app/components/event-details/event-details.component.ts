import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  public unlockDate: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Event) {
    if (data.type === 'doorUnlocked') {
      this.unlockDate = data.evtData.unlockDate * 1000;
    }
  }
}
