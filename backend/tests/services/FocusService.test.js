const FocusService = require('../../api/services/FocusService')
const FocusRepository = require('../../api/repositories/FocusRepository')

// Mock do FocusRepository
jest.mock('../../api/repositories/FocusRepository', () => {
  return jest.fn().mockImplementation(() => ({
    getMonthlyFocusByEstate: jest.fn(),
    getMonthlyFocusByRegion: jest.fn(),
    getFocusByRegion: jest.fn(),
    getYearFocusFromRegion: jest.fn(),
    getYearFocusFromEstate: jest.fn(),
    getAllYearsFocusFromEstate: jest.fn(),
    getFocusFromBiomes: jest.fn(),
    getDailyFocusByEstateMonth: jest.fn(),
    getDailyFocusFromEstatesByMonth: jest.fn()
  }))
})

describe('FocusService', () => {
  let focusService
  let mockFocusRepository

  beforeEach(() => {
    jest.clearAllMocks()
    mockFocusRepository = new FocusRepository()
    FocusRepository.mockClear()
    focusService = new FocusService()
  })

  describe('getMonthlyFocusByEstate', () => {
    it('deve retornar dados mensais por estado quando os parâmetros são válidos', async () => {
      const mockData = [{ estado: 'ACRE', quantidade_focos: 0, mes: 1, ano: 2018 }]
      const service = new FocusService()
      service.focusRepository.getMonthlyFocusByEstate = jest.fn().mockResolvedValue(mockData)

      const result = await service.getMonthlyFocusByEstate(1, 2018)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getMonthlyFocusByEstate).toHaveBeenCalledWith(1, 2018)
    })

    it('deve lançar erro quando o mês é inválido', async () => {
      await expect(focusService.getMonthlyFocusByEstate(13, 2023))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })

    it('deve lançar erro quando o mês não é um número inteiro', async () => {
      await expect(focusService.getMonthlyFocusByEstate(1.5, 2023))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })

    it('deve lançar erro quando o ano não tem 4 dígitos', async () => {
      await expect(focusService.getMonthlyFocusByEstate(1, 23))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })
  })

  describe('getMonthlyFocusByRegion', () => {
    it('deve retornar dados mensais por região quando os parâmetros são válidos', async () => {
      const mockData = [{ regiao: 'Sudeste', quantidade_focos: 200, mes: 1, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getMonthlyFocusByRegion = jest.fn().mockResolvedValue(mockData)

      const result = await service.getMonthlyFocusByRegion(1, 2023)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getMonthlyFocusByRegion).toHaveBeenCalledWith(1, 2023)
    })

    it('deve lançar erro quando o mês é inválido', async () => {
      await expect(focusService.getMonthlyFocusByRegion(13, 2023))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })

    it('deve lançar erro quando o ano não tem 4 dígitos', async () => {
      await expect(focusService.getMonthlyFocusByRegion(1, 23))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })
  })

  describe('getFocusByRegion', () => {
    it('deve retornar dados por região quando o ano é válido', async () => {
      const mockData = [{ regiao: 'Sudeste', quantidade_focos: 500, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getFocusByRegion = jest.fn().mockResolvedValue(mockData)

      const result = await service.getFocusByRegion(2023)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getFocusByRegion).toHaveBeenCalledWith(2023)
    })

    it('deve lançar erro quando o ano não tem 4 dígitos', async () => {
      await expect(focusService.getFocusByRegion(23))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })
  })

  describe('getYearFocusFromRegion', () => {
    it('deve retornar dados anuais de uma região quando os parâmetros são válidos', async () => {
      const mockData = [{ mes: 1, regiao: 'Sudeste', quantidade_focos: 100, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getYearFocusFromRegion = jest.fn().mockResolvedValue(mockData)

      const result = await service.getYearFocusFromRegion('Sudeste', 2023)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getYearFocusFromRegion).toHaveBeenCalledWith('Sudeste', 2023)
    })

    it('deve lançar erro quando o ano não tem 4 dígitos', async () => {
      await expect(focusService.getYearFocusFromRegion('Sudeste', 23))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })
  })

  describe('getYearFocusFromEstate', () => {
    it('deve retornar dados anuais de um estado quando os parâmetros são válidos', async () => {
      const mockData = [{ mes: 1, estado: 'SP', quantidade_focos: 50, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getYearFocusFromEstate = jest.fn().mockResolvedValue(mockData)

      const result = await service.getYearFocusFromEstate('SP', 2023)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getYearFocusFromEstate).toHaveBeenCalledWith('SP', 2023)
    })

    it('deve lançar erro quando o ano não tem 4 dígitos', async () => {
      await expect(focusService.getYearFocusFromEstate('SP', 23))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })
  })

  describe('getAllYearsFocusFromEstate', () => {
    it('deve retornar todos os dados de um estado', async () => {
      const mockData = [{ mes: 1, estado: 'SP', quantidade_focos: 50, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getAllYearsFocusFromEstate = jest.fn().mockResolvedValue(mockData)

      const result = await service.getAllYearsFocusFromEstate('SP')

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getAllYearsFocusFromEstate).toHaveBeenCalledWith('SP')
    })
  })

  describe('getFocusFromBiomes', () => {
    it('deve retornar dados por bioma quando o ano é válido', async () => {
      const mockData = [{ bioma: 'Amazônia', quantidade_focos: 150, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getFocusFromBiomes = jest.fn().mockResolvedValue(mockData)

      const result = await service.getFocusFromBiomes(2023)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getFocusFromBiomes).toHaveBeenCalledWith(2023)
    })

    it('deve lançar erro quando o ano não tem 4 dígitos', async () => {
      await expect(focusService.getFocusFromBiomes(23))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })

    it('deve lançar erro quando o ano não é um número inteiro', async () => {
      await expect(focusService.getFocusFromBiomes(2023.5))
        .rejects.toThrow('O ano deve ser um número inteiro com 4 dígitos.')
    })
  })

  describe('getDailyFocusByEstateMonth', () => {
    it('deve retornar dados diários por estado e mês quando os parâmetros são válidos', async () => {
      const mockData = [{ dia: 1, estado: 'SP', quantidade_focos: 5, mes: 1, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getDailyFocusByEstateMonth = jest.fn().mockResolvedValue(mockData)

      const result = await service.getDailyFocusByEstateMonth('SP', 1)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getDailyFocusByEstateMonth).toHaveBeenCalledWith('SP', 1)
    })

    it('deve lançar erro quando o mês é inválido', async () => {
      await expect(focusService.getDailyFocusByEstateMonth('SP', 13))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })

    it('deve lançar erro quando o mês não é um número inteiro', async () => {
      await expect(focusService.getDailyFocusByEstateMonth('SP', 1.5))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })
  })

  describe('getDailyFocusFromEstatesByMonth', () => {
    it('deve retornar dados diários de todos os estados por mês quando o parâmetro é válido', async () => {
      const mockData = [{ dia: 1, estado: 'SP', quantidade_focos: 5, mes: 1, ano: 2023 }]
      const service = new FocusService()
      service.focusRepository.getDailyFocusFromEstatesByMonth = jest.fn().mockResolvedValue(mockData)

      const result = await service.getDailyFocusFromEstatesByMonth(1)

      expect(result).toEqual(mockData)
      expect(service.focusRepository.getDailyFocusFromEstatesByMonth).toHaveBeenCalledWith(1)
    })

    it('deve lançar erro quando o mês é inválido', async () => {
      await expect(focusService.getDailyFocusFromEstatesByMonth(13))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })

    it('deve lançar erro quando o mês não é um número inteiro', async () => {
      await expect(focusService.getDailyFocusFromEstatesByMonth(1.5))
        .rejects.toThrow('O mês deve ser um número inteiro entre 1 e 12.')
    })
  })
})
