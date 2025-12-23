import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface HumidityAlert {
  message: string;
  humidity: number;
  sensorName: string;
  timestamp: Date;
  severity: 'critical' | 'warning';
}

@Injectable()
export class HumidityAlertsService {
  private readonly logger = new Logger('HumidityAlertsService');
  private alertSubject = new Subject<HumidityAlert>();
  private activeSubscriptions = 0;

  getAlertStream() {
    this.logger.debug('New SSE connection established for humidity alerts');
    this.activeSubscriptions++;
    this.logger.debug(`Active SSE subscriptions: ${this.activeSubscriptions}`);
    
    return this.alertSubject.asObservable().pipe(
      tap((alert) => {
        this.logger.log(`Emitting humidity alert to ${this.activeSubscriptions} subscriber(s): ${JSON.stringify(alert)}`);
      }),
    );
  }

  emitAlert(alert: HumidityAlert) {
    this.logger.log(`Humidity alert emitted: ${alert.message} (severity: ${alert.severity}, humidity: ${alert.humidity})`);
    this.alertSubject.next(alert);
  }
}
