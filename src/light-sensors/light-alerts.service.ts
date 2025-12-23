import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LightAlert {
  message: string;
  luminosity: number;
  sensorName: string;
  timestamp: Date;
  severity: 'critical' | 'warning';
}

@Injectable()
export class LightAlertsService {
  private readonly logger = new Logger('LightAlertsService');
  private alertSubject = new Subject<LightAlert>();
  private activeSubscriptions = 0;

  getAlertStream() {
    this.logger.debug('New SSE connection established for light alerts');
    this.activeSubscriptions++;
    this.logger.debug(`Active SSE subscriptions: ${this.activeSubscriptions}`);
    
    return this.alertSubject.asObservable().pipe(
      tap((alert) => {
        this.logger.log(`Emitting light alert to ${this.activeSubscriptions} subscriber(s): ${JSON.stringify(alert)}`);
      }),
    );
  }

  emitAlert(alert: LightAlert) {
    this.logger.log(`Light alert emitted: ${alert.message} (severity: ${alert.severity}, luminosity: ${alert.luminosity})`);
    this.alertSubject.next(alert);
  }
}
