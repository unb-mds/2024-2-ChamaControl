export default class UserResponseDto {
    constructor({ idUsuario, nome, email }) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
    }
}