import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from './app.service';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { Event, EventData, EventType } from './models/event.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  responseMessage: string = '';
  isLoading: boolean = false;
  displayedColumns: string[] = ['deviceId', 'eventDate', 'type', 'details'];
  dataSource = new MatTableDataSource<Event>();

  constructor(public appService: AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appService.getEvents().subscribe((events: Event[]) => {
      this.dataSource.data = events;
    });
  }

  showDetails(element: Event): void {
    this.dialog.open(EventDetailsComponent, {
      data: element
    });
  }

  sendRandomRequest(): void {
    this.isLoading = true;
    const deviceIds = ['A23', 'F12HJ', 'D12-1-12'];
    const eventTypes: EventType[] = ['deviceMalfunction', 'temperatureExceeded', 'doorUnlocked'];

    const randomDeviceId = deviceIds[Math.floor(Math.random() * deviceIds.length)];
    const randomEventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomEventDate = Math.floor(Date.now() / 1000);

    let eventData: EventData;

    if (randomEventType === 'deviceMalfunction') {
      const reasonCodes = [11, 12, 13, 14, 15];
      const randomReasonCode = reasonCodes[Math.floor(Math.random() * reasonCodes.length)];
      const reasonTexts = [
        'Overheating',
        'Power failure',
        'Sensor error',
        'Network issue',
        'Unknown error'
      ];
      const randomReasonText = reasonTexts[Math.floor(Math.random() * reasonTexts.length)];

      eventData = {
        deviceId: randomDeviceId,
        eventDate: randomEventDate,
        eventType: 'deviceMalfunction',
        reasonCode: randomReasonCode,
        reasonText: randomReasonText
      };
    } else if (randomEventType === 'temperatureExceeded') {
      const minTemp = 8.0;
      const maxTemp = 10.0;
      const randomTemp = +(Math.random() * (maxTemp - minTemp) + minTemp).toFixed(1);

      eventData = {
        deviceId: randomDeviceId,
        eventDate: randomEventDate,
        eventType: 'temperatureExceeded',
        temp: randomTemp,
        threshold: 8
      };
    } else if (randomEventType === 'doorUnlocked') {
      const randomUnlockDate = randomEventDate - Math.floor(Math.random() * 10000);

      eventData = {
        deviceId: randomDeviceId,
        eventDate: randomEventDate,
        eventType: 'doorUnlocked',
        unlockDate: randomUnlockDate
      };
    } else {
      throw new Error('Nieznany typ zdarzenia');
    }

    this.appService.sendRandomEvent(eventData).subscribe({
      next: response => {
        this.responseMessage = response.message;
        this.isLoading = false;
      },
      error: error => {
        console.error('Błąd:', error);
        this.isLoading = false;
      }
    });
  }

}
