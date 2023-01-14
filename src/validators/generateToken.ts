import jwt from 'jsonwebtoken'
import config from '../config/config'

export default{
    generateJwt(params = {}) {
        return jwt.sign(params, config.jwtSecret, {
            expiresIn: 86400
        })
    }
}