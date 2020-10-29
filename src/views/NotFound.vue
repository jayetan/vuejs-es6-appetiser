<template>
  <div>
    <h1>404 Page not found.</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
div {
  background-image: url(../assets/404-background.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;

  h1 {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }
}
</style>
