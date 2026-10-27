const { createLogger, format, transports } = require("winston");

const logFormat = format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
});

const infoWarnFilter = format((info) => {
    if (info.level === "error") return false;
    return info;
});

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.errors({ stack: true }),
        logFormat
    ),

    transports: [

        new transports.File({
            filename: "logs/error.log",
            level: "error"
        }),

        new transports.File({
            filename: "logs/app.log",
            format: format.combine(
                infoWarnFilter(),
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                logFormat
            )
        })

    ]
});

module.exports = logger;
