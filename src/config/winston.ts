import { createLogger, format, transports } from 'winston';

const { combine, colorize, align, timestamp, printf } = format;

const myFormat = combine(
  colorize(),
  timestamp(),
  align(),
  printf(log => `[${log.level}]: ${log.message} ${log.timestamp}`),
);

const logger = createLogger({
  transports: [new transports.Console({ format: myFormat })],
});

export default logger;
