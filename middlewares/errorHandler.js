// errorHandler.js
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    // Handle specific error types
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Handle other types of errors
    res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
