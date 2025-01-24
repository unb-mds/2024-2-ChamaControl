module.exports = class User {
    constructor({ idUsuario, nome, email, senha, eAdmin, recebeAlertas }) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.eAdmin = eAdmin;
        this.recebeAlertas = recebeAlertas;
    }
}