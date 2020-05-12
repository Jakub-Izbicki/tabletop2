<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <Table></Table>
  </div>
</template>

<script>
  import Table from "./components/gametable/Table";

  export default {
    name: 'App',
    components: {
      Table
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }
</style>
