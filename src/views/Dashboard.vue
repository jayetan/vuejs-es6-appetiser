<template>
  <div>
    <v-app-bar
      color="blue accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Appetiser Apps</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="onLogout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <h1>Login successful</h1>
    </v-main>
  </div>
</template>

<script>
import Api from '../api'

export default {
  mounted () {
    this.verifyAuthentication()
  },
  methods: {
    onLogout () {
      Api.onLogout()
      this.$router.push({ path: '/' }).catch(() => {})
    },
    async verifyAuthentication () {
      const isAuth = await Api.verifyToken()
      if (!isAuth) {
        this.onLogout()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
