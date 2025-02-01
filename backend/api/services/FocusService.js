const FocusRepository = require('../repositories/FocusRepository.js')

class FocusService {
  constructor () {
    this.focusRepository = new FocusRepository()
  }

  async getMonthlyFocusByEstate (month, year) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new Error('O mês deve ser um número inteiro entre 1 e 12.')
    }

    if (!Number.isInteger(year) || year.toString().length !== 4) {
      throw new Error('O ano deve ser um número inteiro com 4 dígitos.')
    }

    const data = await this.focusRepository.getMonthlyFocusByEstate(month, year)
    return data
  }

  async getMonthlyFocusByRegion (month, year) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new Error('O mês deve ser um número inteiro entre 1 e 12.')
    }

    if (!Number.isInteger(year) || year.toString().length !== 4) {
      throw new Error('O ano deve ser um número inteiro com 4 dígitos.')
    }

    const data = await this.focusRepository.getMonthlyFocusByRegion(month, year)
    return data
  }

  async getFocusByRegion (year) {
    if (!Number.isInteger(year) || year.toString().length !== 4) {
      throw new Error('O ano deve ser um número inteiro com 4 dígitos.')
    }

    const data = await this.focusRepository.getFocusByRegion(year)
    return data
  }

  async getFocusFromBiomes (year) {
    if (!Number.isInteger(year) || year.toString().length !== 4) {
      throw new Error('O ano deve ser um número inteiro com 4 dígitos.')
    }

    const data = await this.focusRepository.getFocusFromBiomes(year)
    return data
  }

  async getYearFocusFromRegion (region, year) {
    if (!Number.isInteger(year) || year.toString().length !== 4) {
      throw new Error('O ano deve ser um número inteiro com 4 dígitos.')
    }

    const data = await this.focusRepository.getYearFocusFromRegion(region, year)
    return data
  }

  async getYearFocusFromEstate (estate, year) {
    if (!Number.isInteger(year) || year.toString().length !== 4) {
      throw new Error('O ano deve ser um número inteiro com 4 dígitos.')
    }

    const data = await this.focusRepository.getYearFocusFromEstate(estate, year)
    return data
  }

  async getAllYearsFocusFromEstate (estate) {
    const data = await this.focusRepository.getAllYearsFocusFromEstate(estate)
    return data
  }

  async getDailyFocusByEstateMonth (estate, month) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new Error('O mês deve ser um número inteiro entre 1 e 12.')
    }

    const data = await this.focusRepository.getDailyFocusByEstateMonth(estate, month)
    return data
  }

  async getDailyFocusBiomeByMonth (month) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new Error('O mês deve ser um número inteiro entre 1 e 12.')
    }

    const data = await this.focusRepository.getDailyFocusBiomeByMonth(month)
    return data
  }

  async getDailyFocusFromEstatesByMonth (month) {
    if (!Number.isInteger(month) || month < 1 || month > 12) {
      throw new Error('O mês deve ser um número inteiro entre 1 e 12.')
    }

    const data = await this.focusRepository.getDailyFocusFromEstatesByMonth(month)
    return data
  }
}

module.exports = FocusService
