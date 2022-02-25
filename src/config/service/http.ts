import { registerAs } from '@nestjs/config';
import { envWithPrefix } from 'config/env';

const FALLBACK_HOST = '127.0.0.1';
const FALLBACK_PORT = '5001';

const _env = envWithPrefix('http');

export default registerAs('http', () => ({
  host: _env('host') ?? FALLBACK_HOST,
  port: parseInt(_env('port') ?? FALLBACK_PORT),
}));
