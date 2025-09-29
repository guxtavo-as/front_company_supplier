<template lang="pug">
  v-app-bar(dense, fixed)#header
    v-container
      v-row
        nav
          template(v-for='item in menu')
            router-link(:to="item.route").link {{ item.name }}
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menu: [
        { name: 'Home', route: '/' },
        { name: 'Empresas', route: '/empresas' },
        { name: 'Fornecedores', route: '/fornecedores' }
      ]
    }
  }
}
</script>
