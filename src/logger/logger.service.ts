import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export default class AppLog extends ConsoleLogger {
  error(message: any, trace?: string, context?: string) {
    super.error(message, trace, context);
  }
}
