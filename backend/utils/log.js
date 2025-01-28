import pino from 'pino';
import pinoPretty from 'pino-pretty';

const stream = pinoPretty({
  colorize: true, // Colorize the output
});

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
}, stream);

export default logger;
