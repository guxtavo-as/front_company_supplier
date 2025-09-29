<template lang="pug">
#singleCompany
  v-container.margin-top-geral
    v-row
      div.header-inner
        span.title Empresa
        div
          router-link(to="/empresas")
            v-btn.btn-crudCS-back(small)
              v-icon(small) mdi-arrow-left
              span Voltar
      span.title-inner.margin-top-geral {{ company.nomeFantasia }}
    v-row(no-gutter v-if="loading")
      v-form.crudCSForm(ref="form")
        v-container
          v-row
            v-col(cols="12")
              v-text-field(
                v-model="company.nomeFantasia"
                label="Nome Fantasia"
                ref="name"
                placeholder=" "
              )
          v-row
            v-col(cols="6")
              v-text-field(
                v-model="company.cep"
                label="CEP"
                ref="cep"
                placeholder="00000000"
                @change="getCEP(company.cep)"
              )
            v-col(cols="6")
              v-text-field(
                v-model="company.cnpj"
                label="CNPJ"
                ref="cnpj"
                placeholder=" "
              )
          v-row(v-if="action !== 'create'")
            v-col(cols="12")
              v-textarea(
                v-model="company.fornecedores"
                label="Fornecedores"
                ref="suppliers"
                placeholder=" "
              )
      v-row
        div.btn-actions
          v-btn.btn-inner(v-if="action === 'create'" small @click="save()" :disabled="disableCreate && full_fields") Cadastrar
          v-btn.btn-inner(v-else small @click="update()") Alterar
</template>

<script>
import { Company } from './../../models/company.js'

export default {
  name: 'Company',
  data() {
    return {
      company: {},
      loading: false,
      id: null,
      action: '',
      regex: /^\d{8}$/,
      regexCNPJ: /^(?:\d{11}|\d{14})$/,
      disableCreate: true
    }
  },
  computed: {
    full_fields() {
      if (this.company.nomeFantasia === '' || this.company.cnpj === '' || this.company.cep === null ) return true
      return false
    }
  },
  created() {
    this.id = this.$router.currentRoute._value.params.id
    this.getCompany(this.id)
  },
  methods: {
    getCompany(id) {
      if (id === '0') {
        this.action = 'create'
        this.company = new Company()
        return this.loading = true
      }

      Company.fetch({id: id})
        .then((response) => {
          this.loading = true
          this.company = response['company']
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCEP(cep){
      const valid = this.regex.test(cep)
      if (!valid) {
        alert('CEP precisa conter somente número!')
      } else {
        Company.searchCEP({cep: cep})
        .then((response) => {
          this.disableCreate = false
          console.log('CEP válido!')
        })
        .catch((error) => {
          this.disableCreate = true
          alert('O CEP digitado não foi detectado')
          console.log(error)
        })
      }
    },
    save() {
      const valid = this.regexCNPJ.test(this.company.cnpj)
      if (!valid) {
        alert('CPF/CNPJ precisa conter somente número!')
      } else {
        Company.create(this.company)
          .then((response) => {
            this.loading = true
            this.company = response['company']
            this.$router.push({ path: '/empresas'})
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    update() {
      const valid = this.regexCNPJ.test(this.company.cnpj)
      if (!valid) {
        alert('CPF/CNPJ precisa conter somente número!')
      } else {
        Company.update(this.company)
          .then((response) => {
            this.loading = true
            this.company = response['company']
            this.$router.push({ path: '/empresas'})
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>