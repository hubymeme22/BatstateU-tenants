import 'dotenv/config';

const logger = process.env.LOGGER;

// logs the requests to the console
export function serverConsoleLogger(req, res, next) {
    if (!logger) return next();
    console.log(`[REQUEST] ${req.method} ${req.path}`);
    next();
}

// todo: logger by file
// todo: logger by database