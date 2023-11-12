import { expressjwt } from 'express-jwt'

const authJWT = () => {
    const secret = process.env.SECRET
    return expressjwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            '/api/v1/users/login',
            '/api/v1/users/register',
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
        ],
    })
}

export { authJWT }
