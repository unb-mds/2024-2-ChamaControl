import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcryptjs';

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(userDto) {
        const { nome, email, senha } = userDto;

        if (nome == undefined || nome == '' || nome.trim() == '') {
            throw new Error('Nome inválido.');
        }

        if (!email || !email.includes('@')) {
            throw new Error('Email inválido.');
        }

        if (!senha || senha.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres.');
        }

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('O email já está cadastrado.');
        }

        userDto.senha = await this.hashPassword(senha);

        userDto.idUsuario = await this.userRepository.create(userDto);

        return userDto;
    }

    async findAll() {
        return await this.userRepository.findAll();
    }

    async findById(id) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        return user;
    }

    async findByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        
        if (!user) {
            return {};
        }
        return user;
    }

    async hashPassword(password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error ao hashear senha: ' + error.message);
        }
    }

    async checkPassword(password, hashPassword) {
        try {
            const isMatch = await bcrypt.compare(password, hashPassword);
            return isMatch;
        } catch (error) {
            throw new Error("Erro ao verificar a senha: " + error.message);
        }
    }
}