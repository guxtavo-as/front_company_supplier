<template lang="pug">
#suppList
  v-container.margin-top-geral
    v-row
      div.header-inner
        span.title Fornecedores
        div
          router-link(:to="{ name: 'Supplier', params: { id: 0 }}")
            v-btn.btn-crudCS-add(small)
              v-icon(small) mdi-plus
    v-row
      div(id="table-suppliers")
        v-table
          thead
            tr
              th(
                v-for="item in headers"
                :key="item.key"
              ) {{ item.value }}
          tbody
            tr(v-for="item in suppliers" :key="item.id")
              td
                span {{ item.id }}
              td
                span {{ item.nome }}
              td
                span {{ item.email }}
              td
                span {{ item.cpfCnpj }}
              td
                span {{ item.cep }}
              td
                span {{ item.rg }}
              td
                span {{ item.dataNascimento }}
              td
                router-link(:to="{ name: 'Supplier', params: { id: item.id }}")
                  v-btn.btn-crudCS(small)
                    v-icon(small) mdi-file-edit-outline
                v-btn.btn-crudCS(small @click="deleteSupplier()")
                  v-icon(small) mdi-delete-outline

</template>

<script>
import { Supplier } from './../../models/supplier.js'
import DeleteModal from './../../components/deleteModal.vue'

export default {
  name: 'ListCompanies',
  components: {
    DeleteModal
  },
  data() {
    return {
      showModal: false,
      suppliers: {},
      supplier: {},
      headers: [
        { key: 'Id', value: 'Id' },
        { key: 'nome', value: 'Nome' },
        { key: 'email', value: 'Email' },
        { key: 'cpfCnpj', value: 'CPF/CNPJ' },
        { key: 'cep', value: 'CEP' },
        { key: 'rg', value: 'RG' },
        { key: 'dataNasc', value: 'Data Nasc.' },
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
      Supplier.index({})
        .then((response) => {
          this.suppliers = response['suppliers']
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTitleSupplier(supplier) {
      return (!supplier || (supplier.id === null)) ? "Cadastrar novo fornecedor" : "Editar fornecedor" + this.supplier.nomeFantasia
    },
    deleteSupplier(id) {
      this.showModal = true
    },
    closeModal(supplier) {
      console.log(company)
    }
  }
}
</script>
