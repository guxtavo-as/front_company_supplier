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
                v-btn.btn-crudCS(small @click="deleteCompany()")
                  v-icon(small) mdi-delete-outline

</template>

<script>
import { Company } from './../../models/company.js'
import DeleteModal from './../../components/deleteModal.vue'

export default {
  name: 'ListCompanies',
  components: {
    DeleteModal
  },
  data() {
    return {
      showModal: false,
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
  mounted() {
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
      this.showModal = true
    },
    closeModal(company) {
      console.log(company)
    }
  }
}
</script>
