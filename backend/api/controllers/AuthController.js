const UserLoginDto = require('../dto/UserLoginDto.js');
const AuthService = require('../services/AuthService.js');

class AuthController {
    constructor() {
        this.authService = new AuthService();

        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(req, res) {
        try {
            const loginDTO = new UserLoginDto(req.body);

            const token = await this.authService.login(loginDTO);

            res.status(200).json({
                message: "Login realizado com sucesso!",
                token
            });

        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;