import { Logger } from '@nestjs/common';

const logger: Logger = new Logger('ConfigModule');

const ENV_PREFIX = 'STARDEOS';

function wrap(...values: string[]): string {
  return values.join('_').toUpperCase();
}

export default function env(...values: string[]): string | undefined {
  const key = wrap(...values);
  const variable = process.env[key];

  if (!variable) {
    logger.warn(`Undefined environment variable: ${key}`);
  }

  return variable;
}

export function envWithPrefix(...prefixes: string[]) {
  return (...values: string[]) => env(ENV_PREFIX, ...prefixes, ...values);
}
