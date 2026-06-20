import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CompanyContextGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Extract companyID from header when JWT is not present
    const companyId = request.headers['x-company-id'] || 'stub-company-123';
    request.companyId = companyId;
    return true;
  }
}