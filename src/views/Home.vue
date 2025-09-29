<template lang="pug">
#home
  v-container.margin-top-geral
    v-row
      div.header-inner
        span.title Home
        div
    v-row
      div.description
        p Olá, seja bem vindo!
        p Esse sistema foi desenvolvido para realizar cadastro de Empresas e Fornecedores
        p O mesmo possui algumas regras, para atender aos requisitos solicitados.

        v-spacer

        p.strong REGRAS:
        ul
          li - Uma empresa pode ter mais e de um fornecedor
          li - O fornecedor pode trabalhar para mais de uma empresa
          li - CNPJ e CPF deve ser valores únicos
          li - Se fornecedor for pessoa Física, deve-se cadastrar o RG e data de nascimento
          li - Empresas do Paraná não pode conter pessoas físicas menores de 18 anos como fornecedores
          li - Listagem de fornecedor deve ter fitro por nome e CNPJ/CPF
          li - Deve conter validação de CEP

</template>

<script>
export default {
  name: 'Home',
  data() {
    return { }
  }
}
</script>