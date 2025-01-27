const mysql = require('mysql2')
const dotenv = require('dotenv')

jest.mock('mysql2')

jest.mock('dotenv', () => ({
  config: jest.fn()
}))

describe('Database Configuration', () => {
  let connection
  const mockEnv = {
    DB_HOST: 'localhost',
    DB_USER: 'test_user',
    DB_PASSWORD: 'test_password',
    DB_NAME: 'test_db'
  }

  beforeEach(() => {
    jest.clearAllMocks()

    process.env = { ...mockEnv }

    mysql.createConnection.mockReturnValue({
      connect: jest.fn((callback) => callback())
    })

    jest.isolateModules(() => {
      connection = require('../../config/db')
    })
  })

  afterEach(() => {
    process.env = {}
  })

  it('deve carregar as configurações do dotenv', () => {
    expect(dotenv.config).toHaveBeenCalled()
  })

  it('deve criar uma conexão com as configurações corretas', () => {
    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: mockEnv.DB_HOST,
      user: mockEnv.DB_USER,
      password: mockEnv.DB_PASSWORD,
      database: mockEnv.DB_NAME
    })
  })

  it('deve tentar estabelecer a conexão ao inicializar', () => {
    const mockConnect = jest.fn()
    mysql.createConnection.mockReturnValue({
      connect: mockConnect
    })

    jest.isolateModules(() => {
      connection = require('../../config/db')
    })

    expect(mockConnect).toHaveBeenCalled()
  })

  it('deve lidar com erro na conexão', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    const mockError = new Error('Erro de conexão')

    mysql.createConnection.mockReturnValue({
      connect: jest.fn((callback) => callback(mockError))
    })

    jest.isolateModules(() => {
      connection = require('../../config/db')
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao conectar ao banco de dados:', mockError)
    consoleErrorSpy.mockRestore()
  })

  it('deve logar sucesso na conexão', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

    mysql.createConnection.mockReturnValue({
      connect: jest.fn((callback) => callback())
    })

    jest.isolateModules(() => {
      connection = require('../../config/db')
    })

    expect(consoleLogSpy).toHaveBeenCalledWith('Conexão ao banco de dados estabelecida.')
    consoleLogSpy.mockRestore()
  })
})
