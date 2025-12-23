import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export interface HumidityAlert {
  message: string;
  humidity: number;
  sensorName: string;
  timestamp: Date;
  severity: 'critical' | 'warning';
}

@Injectable()
export class HumidityAlertsService {
  private alertSubject = new Subject<HumidityAlert>();

  getAlertStream() {
    return this.alertSubject.asObservable();
  }

  emitAlert(alert: HumidityAlert) {
    this.alertSubject.next(alert);
  }
}
