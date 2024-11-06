function errorHandler(err, req, res, next) {
    let status = 500;
    let message = 'Internal Server Error';

    console.log(err);

    if (err.name === 'SequelizeForeignKeyConstraintError') { 
        status = 400;
        message = "Data not found";
    } else if (err.name === 'SequelizeValidationError') {
        status = 400;
        message = err.errors.map(el => el.message); 
    } else if (err.name === 'DataNotFound') {
        status = 400;
        message = "Data not found";
    } else if (err.name === 'SequelizeDatabaseError') {
        status = 400;
        message = "Invalid Input";
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        status = 400;
        message = "Username / Email already exists";
    } else if (err.name === 'BadRequest') { 
        status = 400;
        message = "Please input your E-mail and Password";
    } else if (err.name === 'Unauthorized' || err.name === 'JsonWebTokenError') {
        status = 401;
        message = "Please Login First";
    } else if (err.name === 'Forbidden') {
        status = 403;
        message = "You are not authorized";
    }

    res.status(status).json({ message });
}

module.exports = errorHandler;
