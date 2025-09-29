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
      v-col(cols="4")
        div.search-supplier
          v-text-field(
            v-model="search"
            label="Pesquisar por nome ou CPF/CNPJ"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
            @change="searchSupplier($event)"
          )
    v-row
      div(id="table-suppliers")
        v-table(dense)
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
                v-btn.btn-crudCS(small @click="deleteSupplier(item.id)")
                  v-icon(small) mdi-delete-outline

</template>

<script>
import { Supplier } from './../../models/supplier.js'

export default {
  name: 'ListCompanies',
  data() {
    return {
      search: '',
      suppliers: [],
      supplier: {},
      regexCNPJ: /^(?:\d{11}|\d{14})$/,
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
  mounted() {
    this.loadCompanies()
  },
  methods: {
    loadCompanies(){
      Supplier.index({})
        .then((response) => {
          this.suppliers = response['suppliers'] || []
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTitleSupplier(supplier) {
      return (!supplier || (supplier.id === null)) ? "Cadastrar novo fornecedor" : "Editar fornecedor" + this.supplier.nomeFantasia
    },
    deleteSupplier(id) {
      Supplier.delete({id: id})
        .then((response) => {
          alert('Fornecedor excluído com sucesso')
          window.location.reload()
        })
        .catch((error) => {
          alert('Falha ao escluir fornecedor')
          console.log(error)
        })
    },
    searchSupplier(event) {
      const value = event.srcElement.value

      if (!value) {
        this.loadCompanies()
        return
      }

      const valid = this.regexCNPJ.test(value)

      const request = valid
        ? Supplier.fetchCpfCnpj({ cpf_cnpj: value })
        : Supplier.fetchNome({ nome: value })

      request
        .then((response) => {
          const data = response['suppliers'] || response['supplier'] || []
          this.suppliers = Array.isArray(data) ? data : [data]
        })
        .catch((error) => {
          alert('Não foi encontrado nenhum fornecedor')
          console.error(error)
        })
    },
    closeModal(supplier) {
      console.log(company)
    }
  }
}
</script>
