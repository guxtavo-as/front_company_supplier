import { Model } from '@vuex-orm/core'
import { Service } from './service.js'

class Supplier extends Model {
  static entity = 'suppliers'
  static entity_singular = 'supplier'

  static fields() {
    return {
      id: this.attr(null),
      nome: this.attr(''),
      cpfCnpj: this.attr(''),
      email: this.attr(''),
      rg: this.attr(''),
      dataNascimento: this.attr(''),
      cep: this.attr(''),
      companies: this.attr([])
    }
  }

  static index(params) {
    return new Promise((resolve, reject) => {
      Service.get({ url: '/fornecedores', params, model: Supplier })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static fetch(params) {
    return new Promise((resolve, reject) => {
      Service.get({ url: `/fornecedores/${params.id}`, model: Supplier })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static fetchNome(params) {
    return new Promise((resolve, reject) => {
      Service.get({ url: `/fornecedores/nome/${params.nome}`, model: Supplier })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static fetchCpfCnpj(params) {
    return new Promise((resolve, reject) => {
      Service.get({ url: `/fornecedores/cpf_cnpj/${params.cpf_cnpj}`, model: Supplier })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static update(params) {
    return new Promise((resolve, reject) => {
      Service.update({ url: `/fornecedores/${params.id}`, data: params, model: Supplier })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static create(params) {
    return new Promise((resolve, reject) => {
      Service.post({ url: `/fornecedores`, data: params, model: Supplier })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static delete(params) {
    return new Promise((resolve, reject) => {
      Service.destroy({ url: `/fornecedores/${params.id}`, params, model: Supplier })
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

export { Supplier }
