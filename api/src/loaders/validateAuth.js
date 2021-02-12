
const jwt = require('jsonwebtoken');
var environment = require('../config/environment');
const issurUrl = environment.getClientAppUrl();
const secret = environment.getjwtSecret();

module.exports = validateAuth;

async function validateAuth(req, res, next) {

    if(req.originalUrl === '/' || req.originalUrl === '/ping' || req.originalUrl === '/login' || req.originalUrl === '/auth' || req.originalUrl === '/logout' || req.originalUrl === '/ping/' || req.originalUrl === '/login/' || req.originalUrl === '/auth/' || req.originalUrl === '/logout/' 
        || req.originalUrl === '/noAuth/getAuthenticationCodeDetails' || req.originalUrl === '/noAuth/addProviderFromProviderSignup' || req.originalUrl === '/noAuth/deactivateAuthenticationCode')
    {
        return  next();
    }
        // intercept OPTIONS method
        if (req.method === 'OPTIONS') {
            return res.send(200);
        }
    // check for auth header
    else if (!req.headers.authorization || req.headers.authorization.split(' ')[0] != 'Bearer') {
        return res.status(403).json({ message: 'Missing Authorization Header' });
    }
    else {
    // verify auth token
    const authorizationHeaader = req.headers.authorization;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: '7d',
            issuer: issurUrl
        }; if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, secret, options, function (err, decoded) {
                if (err) {
                    return  res.status(401).send('Unauthorized: Invalid token');
                } else {
                    req.email = decoded.email;
                    return next();
                }
            });
        }
    }


      }
}
