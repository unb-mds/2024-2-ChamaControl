import UserLoginDto from '../dto/UserLoginDto.js'
import AuthService from '../services/AuthService.js'

export default class AuthController {
    constructor() {
        this.authService = new AuthService()

        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(req, res) {
        try {
            const loginDTO = new UserLoginDto(req.body)

            const token = await this.authService.login(loginDTO);

            res.status(200).json({
                message: "Login realizado com sucesso!",
                token
            })

        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}