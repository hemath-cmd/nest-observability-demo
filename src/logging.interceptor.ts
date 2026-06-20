import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import pino from 'pino';

const logger = pino({ level: 'info' });

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const requestId = (request as any).id;
    const { method, url } = request;
    const startTime = Date.now();

    logger.info({ requestId, method, path: url }, 'request started');

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const responseTimeMs = Date.now() - startTime;
        logger.info({ 
          requestId, 
          method, 
          path: url, 
          statusCode: response.statusCode,
          responseTimeMs 
        }, 'request completed');
      })
    );
  }
}