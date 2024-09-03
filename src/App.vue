<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import NavBar from "./components/NavBar.vue"
export default{
  components: {
    NavBar
  }
}
</script>

<style>
*{
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.bg-primary-color{
  background: rgb(2, 83, 104);
}

.bg-secondary-color{
  background: whitesmoke;
}

.primary-color{
  color:whitesmoke
}
.secondary-color{
  color: rgb(2, 83, 104);
}

.btn-app-primary{
  background: rgb(2, 83, 104);
  border-radius: 10px;
  padding: 8px;
  color: whitesmoke;
  font-weight: bold;
  border: none;
  box-shadow: 2px 2px 3px #222;
}
.btn-app-secondary{
  background: whitesmoke;
  border-radius: 10px;
  padding: 8px;
  color: rgb(2, 83, 104);
  font-weight: bold;
  border: none;
  box-shadow: 2px 2px 3px #222;

}

.input-app{
  border-radius: 10px;
  padding: 10px;
  border: none;
  background: whitesmoke;
}
.input-app:focus{
  outline: none;
}

</style>
