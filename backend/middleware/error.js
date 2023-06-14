const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb Id error eg. we send a req to the db server with an id not long as expected then there comes a CastError 

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //MOngose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);

    }

    //Wrong JWT Error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`
        err = new ErrorHandler(message, 400);

    }

    //JWT Expire Error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, try again`
        err = new ErrorHandler(message, 400);

    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}