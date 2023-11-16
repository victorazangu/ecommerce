import { expressjwt } from 'express-jwt'

const authJWT = () => {
    const secret = process.env.SECRET
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            '/api/v1/users/login',
            '/api/v1/users/register',
            // '/api/v1/orders',
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            {
                url: /\/api\/v1\/orders(.*)/,
                methods: ['GET', 'OPTIONS', 'POST', 'DELETE', 'PUT'],
            },
        ],
    })
}
const isRevoked = (req, payload, done) => {
    if (!payload.isAdmin) {
        done(null, true)
    }
    done()
}

export { authJWT }
