<template>
  <NavBar/>
  <router-view :API_URL="API_URL" :verifyLogin="verifyLogin"/>
  <Footer/>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer.vue"
export default{
  components: {
    NavBar,
    Footer
  },
  data(){
    return{
      API_URL: "http://127.0.0.1:8000"
    }
  },
  methods: {
    verifyLogin(){
      fetch(this.API_URL+"/user/"+1, {
        method: "GET",
        headers: {
          "Authorization": "Bearer "+localStorage.getItem("auth-token"),
          "X-Requested-With": "XMLHttpRequest"
        }
      }).then(res => {
        if(res.status === 200 || res.status === 404){
          localStorage.setItem("auth", "true")
        }else{
          localStorage.setItem("auth", "false")
        }
      }).catch(e => {
        localStorage.setItem("auth", "false")
      })
    }
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
  padding: 10px;
  color: whitesmoke;
  font-weight: bold;
  border: none;
  box-shadow: 2px 2px 3px #222;
}
.btn-app-secondary{
  background: whitesmoke;
  border-radius: 10px;
  padding: 10px;
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
  border: 1px solid rgb(2, 83, 104);
  box-shadow: 2px 2px 3px #222;
}
.input-app:focus{
  outline: none;
}
.textarea-app{
  border: 1px solid rgb(2, 83, 104);
  resize: vertical;
}
.textarea-app:focus{
  outline: none;
}
hr{
  width: 90%;
  height: 1px;
  border-bottom: 1px solid #ccc;
}
.select-app{
  border-radius: 10px 10px 0 0;
  padding: 10px;
  background: whitesmoke;
  border: 2px solid rgb(2, 83, 104);
  box-shadow: 2px 2px 3px #222;
}
.select-app:focus{
  outline: none;
}
.btn-transparent{
  border: none;
  background: transparent;
}
</style>
