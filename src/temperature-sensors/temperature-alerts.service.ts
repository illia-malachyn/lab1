import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface TemperatureAlert {
  message: string;
  temperature: number;
  sensorName: string;
  timestamp: Date;
  severity: 'critical' | 'warning';
}

@Injectable()
export class TemperatureAlertsService {
  private readonly logger = new Logger('TemperatureAlertsService');
  private alertSubject = new Subject<TemperatureAlert>();
  private activeSubscriptions = 0;

  getAlertStream() {
    this.logger.debug('New SSE connection established for temperature alerts');
    this.activeSubscriptions++;
    this.logger.debug(`Active SSE subscriptions: ${this.activeSubscriptions}`);
    
    return this.alertSubject.asObservable().pipe(
      tap((alert) => {
        this.logger.log(`Emitting temperature alert to ${this.activeSubscriptions} subscriber(s): ${JSON.stringify(alert)}`);
      }),
    );
  }

  emitAlert(alert: TemperatureAlert) {
    this.logger.log(`Temperature alert emitted: ${alert.message} (severity: ${alert.severity}, temperature: ${alert.temperature})`);
    this.alertSubject.next(alert);
  }
}
