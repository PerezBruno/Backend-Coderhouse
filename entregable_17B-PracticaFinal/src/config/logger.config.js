import winston from "winston";
import {NODE_ENV} from "./config.js"

const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "yellow",
    warning: "cyan",
    info: "blue",
    debug: "gray",
  },
};

// const logger = winston.createLogger({
//   levels: customLevelOpt.levels,
//   transports: [
//     new winston.transports.File({
//         filename: "./errors.html",
//         level: "fatal",
//         format: winston.format.combine(
//             winston.format.simple()
//           ),
//     }),
//     new winston.transports.File({
//         filename: "./errors.html",
//         level: "error",
//         format: winston.format.combine(
//             winston.format.simple()
//           ),
//     }),
//     new winston.transports.File({
//         filename: "./loggers.html",
//         level: "warning",
//         format: winston.format.combine(
//             winston.format.simple()
//           ),
//     }),
//     new winston.transports.File({
//         filename: "./loggers.html",
//         level: "info",
//         format: winston.format.combine(
//             winston.format.simple()
//           ),
//     }),
//     new winston.transports.Console({
//         level: "debug",
//         format: winston.format.combine(
//           winston.format.colorize({ colors: customLevelOpt.colors }),
//           winston.format.simple()
//         ),
//       }),
//   ],
// });






  const listTransports= [
    new winston.transports.File({
        filename: "./errors.html",
        level: "fatal",
        format: winston.format.combine(
            winston.format.simple()
          ),
    }),
    new winston.transports.File({
        filename: "./errors.html",
        level: "error",
        format: winston.format.combine(
            winston.format.simple()
          ),
    }),
    new winston.transports.File({
        filename: "./loggers.html",
        level: "warning",
        format: winston.format.combine(
            winston.format.simple()
          ),
    }),
    new winston.transports.File({
        filename: "./loggers.html",
        level: "info",
        format: winston.format.combine(
            winston.format.simple()
          ),
    })
  ]


  if (NODE_ENV === 'development') {
    listTransports.push(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.simple()
        )
    }))
}


const logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: listTransports
})



//qué es lo que hace esta constante???
export const addLogger = (req, res, next) => {
    req.logger = logger
    if (NODE_ENV === 'development') {req.logger.debug(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`)}
    next()
}