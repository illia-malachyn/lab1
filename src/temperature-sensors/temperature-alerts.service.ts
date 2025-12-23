import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export interface TemperatureAlert {
  message: string;
  temperature: number;
  sensorName: string;
  timestamp: Date;
  severity: 'critical' | 'warning';
}

@Injectable()
export class TemperatureAlertsService {
  private alertSubject = new Subject<TemperatureAlert>();

  getAlertStream() {
    return this.alertSubject.asObservable();
  }

  emitAlert(alert: TemperatureAlert) {
    this.alertSubject.next(alert);
  }
}
