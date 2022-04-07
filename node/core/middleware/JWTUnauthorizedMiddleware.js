module.exports = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).end();
    }
};