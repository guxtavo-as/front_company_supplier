import axios from 'axios'
import qs from 'qs'

class Service {
  static get({ url, model, params }) {
    return new Promise((resolve, reject) => {
      if (params && params !== {}) {
        url += '?' + qs.stringify(params, { arrayFormat: 'brackets' })
      }
      if (url.indexOf('http') === -1) {
        url = import.meta.env.VITE_API_URL + url
      }

      axios
        .get(url)
        .then((response) => {
          if (model) {
            const entitys = model.entity
            const entity = model.entity_singular
            if (response.data[entitys]) {
              response.data[entitys] = Service.build(
                response.data[entitys],
                model
              )
            } else if (response.data[entity]) {
              response.data[entity] = Service.build(
                response.data[entity],
                model
              )
            }
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async post({ url, model, params, data }) {
    return new Promise((resolve, reject) => {
      if (params) {
        url += '?' + qs.stringify(params, { arrayFormat: 'brackets' })
      }
      if (url.indexOf('http') === -1) {
        url = import.meta.env.VITE_API_URL + url
      }

      axios
        .post(url, data)
        .then((response) => {
          if (model) {
            const entitys = model.entity
            const entity = model.entity_singular
            if (response.data[entitys]) {
              response.data[entitys] = Service.build(
                response.data[entitys],
                model
              )
            } else if (response.data[entity]) {
              response.data[entity] = Service.build(
                response.data[entity],
                model
              )
            }
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async update({ url, model, params, data }) {
    return new Promise((resolve, reject) => {
      if (params) {
        url += '?' + qs.stringify(params, { arrayFormat: 'brackets' })
      }
      if (url.indexOf('http') === -1) {
        url = import.meta.env.VITE_API_URL + url
      }

      axios
        .put(url, data)
        .then((response) => {
          if (model) {
            const entitys = model.entity
            const entity = model.entity_singular
            if (response.data[entitys]) {
              response.data[entitys] = Service.build(
                response.data[entitys],
                model
              )
            } else if (response.data[entity]) {
              response.data[entity] = Service.build(
                response.data[entity],
                model
              )
            }
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static async destroy({ url, model, params, data }) {
    return new Promise((resolve, reject) => {
      if (params) {
        url += '?' + qs.stringify(params, { arrayFormat: 'brackets' })
      }
      if (url.indexOf('http') === -1) {
        url = import.meta.env.VITE_API_URL + url
      }

      axios
        .delete(url)
        .then((response) => {
          if (model) {
            if (response.data[model.entity]) {
              response.data[model.entity] = Service.build(
                response.data[model.entity],
                model
              )
            }
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static getCEP({ url }) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  static buildModel(object, Model) {
    return new Model(object)
  }

  static buildList(array, Model) {
    return array.map((el) => {
      return new Model(el)
    })
  }

  static build(response, model) {
    if (Array.isArray(response)) {
      return Service.buildList(response, model)
    }
    return Service.buildModel(response, model)
  }
}

export { Service }