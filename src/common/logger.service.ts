import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';
import { format, transports } from 'winston';

export const loggerConfig: WinstonModuleOptions = {
    transports: [
        // let's log errors into its own file
           new transports.File({
             filename: `logs/error.log`,
             level: 'error',
             format: format.combine(format.timestamp(), format.json()),
           }),
           // logging all level
           new transports.File({
             filename: `logs/combined.log`,
             format: format.combine(format.timestamp(), format.json()),
           }),
           // we also want to see logs in our console
           new transports.Console({
            format: format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.printf(({ timestamp, level, message, context }) => {
                    return `${timestamp} [${level}]${context ? ` [${context}]` : ''}: ${message}`;
                })
             ),
           }),
         ],
};