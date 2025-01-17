export default class UserCreateDto {
    constructor({ nome, email, senha }) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}