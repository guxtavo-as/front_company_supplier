<template lang="pug">
#singleSupplier
  v-container.margin-top-geral
    v-row
      div.header-inner
        span.title Fornecedores
        div
          router-link(to="/fornecedores")
            v-btn.btn-crudCS-back(small)
              v-icon(small) mdi-arrow-left
              span Voltar
      span.title-inner.margin-top-geral {{ supplier.nome }}
    v-row(no-gutter v-if="loading")
      v-form.crudCSForm(ref="form")
        v-container
          v-row
            v-col(cols="8")
              v-text-field(
                v-model="supplier.nome"
                label="Nome"
                ref="name"
                placeholder=" "
              )
            v-col(cols="4")
              v-text-field(
                v-model="supplier.email"
                label="Email"
                ref="email"
                placeholder=" "
              )
          v-row
            v-col(cols="4")
              v-text-field(
                v-model="supplier.cpfCnpj"
                label="CNPJ/CPF"
                ref="cnpj"
                placeholder=" "
              )
            v-col(cols="4")
              v-text-field(
                v-model="supplier.cep"
                label="CEP"
                ref="cep"
                placeholder="00000000"
                @change="getCEP(supplier.cep)"
              )
            v-col(cols="4" v-if="action === 'create'")
              v-select(
                type="text"
                v-model="supCompany"
                label="Empresa"
                ref="company"
                :items="companies"
                item-text="text"
                item-value="value"
                placeholder=" "
              )
          v-row
            v-col(cols="4")
              v-text-field(
                v-model="supplier.rg"
                label="RG"
                ref="rg"
                placeholder=" "
              )
            v-col(cols="4")
              v-text-field(
                v-model="supplier.dataNascimento"
                label="Data nascimento"
                ref="data_nasc"
                placeholder=" "
              )
          v-row(v-if="action !== 'create'")
            v-col(cols="12")
              v-textarea(
                v-model="supplier.empresas"
                label="Empresas"
                ref="companies"
                placeholder=" "
              )
      v-row
        div.btn-actions
          v-btn.btn-inner(v-if="action === 'create'" small @click="save()" :disabled="disableCreate && full_fields") Cadastrar
          v-btn.btn-inner(v-else small @click="update()") Alterar
</template>

<script>
import { Supplier } from './../../models/supplier.js'
import { Company } from './../../models/company.js'

export default {
  name: 'Supplier',
  data() {
    return {
      supplier: {},
      loading: false,
      companies: [],
      copyCompanies: [],
      id: null,
      action: '',
      regex: /^\d{8}$/,
      regexCNPJ: /^(?:\d{11}|\d{14})$/,
      disableCreate: true,
      supCompany: ''
    }
  },
  computed: {
    full_fields() {
      if (this.supplier.nome === '' || this.supplier.cpfCnpj === '' || this.supplier.cpfCnpj.length >= 11  || this.supplier.cep === '' || (this.supplier.cpfCnpj.length === 11 && this.supplier.reg === '' && this.supplier.dataNascimento === '' ) || this.supplier.email === '') return true
      return false
    }
  },
  created() {
    this.id = this.$router.currentRoute._value.params.id
    this.getSupplier(this.id)
    this.loadCompanies(this.id)
  },
  methods: {
    getSupplier(id) {
      if (id === '0') {
        this.action = 'create'
        this.supplier = new Supplier()
        return this.loading = true
      }

      Supplier.fetch({id: id})
        .then((response) => {
          this.loading = true
          this.supplier = response['supplier']
        })
        .catch((error) => {
          console.log(error)
        })
    },
    loadCompanies(id){
      if (id !== '0') {
        this.action = 'update'
        return this.loading = true
      }

      Company.index({})
        .then((response) => {
          response['companies'].map((company) => {
            this.copyCompanies.push({ "value": company.id, "text": company.nomeFantasia })
            this.companies.push(company.nomeFantasia)
          })
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
        Supplier.searchCEP({cep: cep})
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
      const company = this.copyCompanies.find((item) => item.text === this.supCompany)
      this.supplier.companies = [company.value]
      const validCPF = this.supplier.cpfCnpj.length === 11
      const valid = this.regexCNPJ.test(this.supplier.cpfCnpj)

      if (!valid) {
        alert('CPF/CNPJ precisa conter somente número!')
      } else if (validCPF && this.supplier.rg === '' && this.supplier.dataNascimento === '') {
        alert('Para CPF você precisa acrescentar RG e Data de Nascimento!')
      } else {
        Supplier.create(this.supplier)
          .then((response) => {
            this.loading = true
            this.supplier = response['supplier']
            this.$router.push({ path: '/fornecedores'})
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    update() {
      const validCPF = this.supplier.cpfCnpj.length === 11
      const valid = this.regexCNPJ.test(this.supplier.cpfCnpj)

      if (!valid) {
        alert('CPF/CNPJ precisa conter somente número!')
      } else if (validCPF && this.supplier.rg === '' && this.supplier.dataNascimento === '') {
        alert('Para CPF você precisa acrescentar RG e Data de Nascimento!')
      } else {
        Supplier.update(this.supplier)
          .then((response) => {
            this.loading = true
            this.supplier = response['supplier']
            this.$router.push({ path: '/fornecedores'})
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>