import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export interface LightAlert {
  message: string;
  luminosity: number;
  sensorName: string;
  timestamp: Date;
  severity: 'critical' | 'warning';
}

@Injectable()
export class LightAlertsService {
  private alertSubject = new Subject<LightAlert>();

  getAlertStream() {
    return this.alertSubject.asObservable();
  }

  emitAlert(alert: LightAlert) {
    this.alertSubject.next(alert);
  }
}
