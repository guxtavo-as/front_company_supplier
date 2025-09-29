import { Model } from '@vuex-orm/core'
import { Service } from './service.js'

class Company extends Model {
  static entity = 'companies'
  static entity_singular = 'company'

  static fields() {
    return {
      id: this.attr(null),
      nomeFantasia: this.attr(''),
      cnpj: this.attr(''),
      cep: this.attr(''),
      suppliers: this.attr([])
    }
  }

  static index(params) {
    return new Promise((resolve, reject) => {
      Service.get({ url: '/empresas', params, model: Company })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static fetch(params) {
    return new Promise((resolve, reject) => {
      Service.get({ url: `/empresas/${params.id}`, params, model: Company })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static update(params) {
    return new Promise((resolve, reject) => {
      Service.update({ url: `/empresas/${params.id}`, data: params, model: Company })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static create(params) {
    return new Promise((resolve, reject) => {
      Service.post({ url: `/empresas`, data: params, model: Company })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static delete(params) {
    return new Promise((resolve, reject) => {
      Service.destroy({ url: `/empresas/${params.id}`, params, model: Company })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static searchCEP(params) {
    return new Promise((resolve, reject) => {
      Service.getCEP({ url: `https://viacep.com.br/ws/${params.cep}/json/` })
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}

export { Company }