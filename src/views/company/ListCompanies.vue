<template lang="pug">
#compsList
  v-container.margin-top-geral
    v-row
      div.header-inner
        span.title Empresas
        div
          router-link(:to="{ name: 'Company', params: { id: 0 }}")
            v-btn.btn-crudCS-add(small)
              v-icon(small) mdi-plus
    v-row
      div(id="table-companies")
        v-table
          thead
            tr
              th(
                v-for="item in headers"
                :key="item.key"
              ) {{ item.value }}
          tbody
            tr(v-for="item in companies" :key="item.id")
              td
                span {{ item.id }}
              td
                span {{ item.nomeFantasia }}
              td
                span {{ item.cnpj }}
              td
                span {{ item.cep }}
              td
                router-link(:to="{ name: 'Company', params: { id: item.id }}")
                  v-btn.btn-crudCS(small)
                    v-icon(small) mdi-file-edit-outline
                v-btn.btn-crudCS(small @click="deleteCompany(item.id)")
                  v-icon(small) mdi-delete-outline

</template>

<script>
import { Company } from './../../models/company.js'

export default {
  name: 'ListCompanies',
  data() {
    return {
      companies: {},
      company: {},
      headers: [
        { key: 'Id', value: 'Id' },
        { key: 'nomeFantasia', value: 'NomeFantasia' },
        { key: 'cnpj', value: 'CNPJ' },
        { key: 'cep', value: 'CEP' },
        { key: '*', value: '' }
      ]
    }
  },
  created(){
    this.loadCompanies()
  },
  methods: {
    loadCompanies(){
      Company.index({})
        .then((response) => {
          this.companies = response['companies']
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTitleCompany(company) {
      return (!company || (company.id === null)) ? "Cadastrar nova empresa" : "Editar empresa" + this.company.nomeFantasia
    },
    deleteCompany(id) {
      Company.delete({id: id})
        .then((response) => {
          alert('Empresa excluída com sucesso')
          window.location.reload()
        })
        .catch((error) => {
          alert('Falha ao escluir empresa')
          console.log(error)
        })
    }
  }
}
</script>
