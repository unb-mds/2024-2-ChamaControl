const FocusController = require('../../api/controllers/FocusController')
const FocusService = require('../../api/services/FocusService')

jest.mock('../../api/services/FocusService', () => {
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

describe('FocusController', () => {
  let focusController
  let mockReq
  let mockRes

  beforeEach(() => {
    jest.clearAllMocks()
    focusController = new FocusController()
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  describe('getMonthlyFocusByEstate', () => {
    beforeEach(() => {
      mockReq = {
        params: { month: '1', year: '2023' }
      }
    })

    it('deve retornar dados mensais por estado com sucesso', async () => {
      const mockData = [{ estado: 'SP', quantidade_focos: 100, mes: 1, ano: 2023 }]
      focusController.focusService.getMonthlyFocusByEstate.mockResolvedValue(mockData)

      await focusController.getMonthlyFocusByEstate(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getMonthlyFocusByEstate).toHaveBeenCalledWith(1, 2023)
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getMonthlyFocusByEstate.mockRejectedValue(error)

      await focusController.getMonthlyFocusByEstate(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })

  describe('getFocusByRegion', () => {
    beforeEach(() => {
      mockReq = {
        params: { year: '2023' }
      }
    })

    it('deve retornar dados por região com sucesso', async () => {
      const mockData = [{ regiao: 'Sudeste', quantidade_focos: 500, ano: 2023 }]
      focusController.focusService.getFocusByRegion.mockResolvedValue(mockData)

      await focusController.getFocusByRegion(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getFocusByRegion).toHaveBeenCalledWith(2023)
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getFocusByRegion.mockRejectedValue(error)

      await focusController.getFocusByRegion(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })

  describe('getYearFocusFromEstate', () => {
    beforeEach(() => {
      mockReq = {
        params: { estate: 'SP', year: '2023' }
      }
    })

    it('deve retornar dados anuais por estado com sucesso', async () => {
      const mockData = [{ mes: 1, estado: 'SP', quantidade_focos: 50, ano: 2023 }]
      focusController.focusService.getYearFocusFromEstate.mockResolvedValue(mockData)

      await focusController.getYearFocusFromEstate(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getYearFocusFromEstate).toHaveBeenCalledWith('SP', 2023)
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getYearFocusFromEstate.mockRejectedValue(error)

      await focusController.getYearFocusFromEstate(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })

  describe('getAllYearsFocusFromEstate', () => {
    beforeEach(() => {
      mockReq = {
        params: { estate: 'SP' }
      }
    })

    it('deve retornar todos os dados de um estado com sucesso', async () => {
      const mockData = [{ mes: 1, estado: 'SP', quantidade_focos: 50, ano: 2023 }]
      focusController.focusService.getAllYearsFocusFromEstate.mockResolvedValue(mockData)

      await focusController.getAllYearsFocusFromEstate(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getAllYearsFocusFromEstate).toHaveBeenCalledWith('SP')
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getAllYearsFocusFromEstate.mockRejectedValue(error)

      await focusController.getAllYearsFocusFromEstate(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })

  describe('getFocusFromBiomes', () => {
    beforeEach(() => {
      mockReq = {
        params: { year: '2023' }
      }
    })

    it('deve retornar dados de focos por bioma com sucesso', async () => {
      const mockData = [{ bioma: 'Amazônia', quantidade_focos: 150, ano: 2023 }]
      focusController.focusService.getFocusFromBiomes.mockResolvedValue(mockData)

      await focusController.getFocusFromBiomes(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getFocusFromBiomes).toHaveBeenCalledWith(2023)
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getFocusFromBiomes.mockRejectedValue(error)

      await focusController.getFocusFromBiomes(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })

  describe('getDailyFocusByEstateMonth', () => {
    beforeEach(() => {
      mockReq = {
        params: { estate: 'SP', month: '1' }
      }
    })

    it('deve retornar dados diários por estado e mês com sucesso', async () => {
      const mockData = [{ dia: 1, estado: 'SP', quantidade_focos: 10, mes: 1 }]
      focusController.focusService.getDailyFocusByEstateMonth.mockResolvedValue(mockData)

      await focusController.getDailyFocusByEstateMonth(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getDailyFocusByEstateMonth).toHaveBeenCalledWith('SP', 1)
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getDailyFocusByEstateMonth.mockRejectedValue(error)

      await focusController.getDailyFocusByEstateMonth(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })

  describe('getDailyFocusFromEstatesByMonth', () => {
    beforeEach(() => {
      mockReq = {
        params: { month: '1' }
      }
    })

    it('deve retornar dados diários de todos os estados por mês com sucesso', async () => {
      const mockData = [{ dia: 1, estado: 'SP', quantidade_focos: 10, mes: 1 }]
      focusController.focusService.getDailyFocusFromEstatesByMonth.mockResolvedValue(mockData)

      await focusController.getDailyFocusFromEstatesByMonth(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockData)
      expect(focusController.focusService.getDailyFocusFromEstatesByMonth).toHaveBeenCalledWith(1)
    })

    it('deve retornar erro 500 quando o serviço falha', async () => {
      const error = new Error('Erro no serviço')
      focusController.focusService.getDailyFocusFromEstatesByMonth.mockRejectedValue(error)

      await focusController.getDailyFocusFromEstatesByMonth(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: error.message })
    })
  })
})
