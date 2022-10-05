const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'ozkour' },
  transports: [
    new transports.File({ filename: 'ozkour-back-error.log', level: 'error' }),
    new transports.File({ filename: 'ozkour-back-info.log', level: 'info' }),
    new transports.File({ filename: 'ozkour-back-warn.log', level: 'warn' }),
    new transports.File({ filename: 'ozkour-back-verbose.log', level: 'verbose' }),
    new transports.File({ filename: 'ozkour-back-debug.log', level: 'debug' }),
    new transports.File({ filename: 'ozkour-back-combined-log.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }))
}

module.exports = { logger }
