import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const isSSE = req.path.includes('alerts');

    if (isSSE) {
      this.logger.log(`[SSE] ${method} ${originalUrl} - Connecting...`);
    } else {
      this.logger.log(`${method} ${originalUrl} - ${userAgent}`);
    }

    // Log when response ends (for SSE connections)
    res.on('finish', () => {
      if (isSSE) {
        this.logger.log(`[SSE] ${method} ${originalUrl} - Connection closed (status: ${res.statusCode})`);
      }
    });

    res.on('close', () => {
      if (isSSE) {
        this.logger.warn(`[SSE] ${method} ${originalUrl} - Connection abruptly closed by client`);
      }
    });

    next();
  }
}