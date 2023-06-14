
//creating a class errorhander which inherits error(inbuilt js class) 
//errorhander takes message and status code 
class ErrorHander extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.contructor);

    }
}


module.exports = ErrorHander;