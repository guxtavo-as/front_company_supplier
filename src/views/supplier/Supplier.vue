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
            v-col(cols="6")
              v-text-field(
                v-model="supplier.cpfCnpj"
                label="CNPJ"
                ref="cnpj"
                placeholder=" "
              )
            v-col(cols="6")
              span {{companies}}
              v-select(
                type="text"
                v-model="supplier.empresa_id"
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
                v-model="supplier.cep"
                label="CEP"
                ref="cep"
                placeholder=" "
              )
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
                v-model="supplier.fornecedores"
                label="Fornecedores"
                ref="suppliers"
                placeholder=" "
              )
      v-row
        div.btn-actions
          v-btn.btn-inner(v-if="action === 'create'" small @click="save()") Cadastrar
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
      id: null,
      action: ''
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
            this.companies.push({ "value": company.cnpj, "text": company.nomeFantasia })
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    save() {
      if(this.id === 0) return

      Supplier.create(this.supplier)
        .then((response) => {
          this.loading = true
          this.supplier = response['supplier']
          this.$router.push({ path: '/fornecedores'})
        })
        .catch((error) => {
          console.log(error)
        })
    },
    update() {
      if(this.id !== 0) return

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
</script>