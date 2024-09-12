<template>
  <div class="home d-flex flex-column align-items-center">
    <div class="banner-box d-flex flex-column align-items-center justify-content-center">
      <img id="banner" src="@/assets/banner.webp" alt="">
      <p class="banner-title primary-color fw-bold fs-1">Encontre Imóveis para<br>Comprar e Alugar</p>
    </div>
    <div class="about box-info">
      <p class="title text-start fs-3 secondary-color fw-bold pt-2">Nosso Objetivo</p>
      <p class="fs-6 fw-bold">Entregamos mais do que imóveis. Nosso objetivo é entregar para você e sua família a realização de um sonho.</p>
      <img class="w-100 rounded" src="@/assets/família.webp" alt="">
    </div>
    <hr>
    <div class="box-info">
      <p class="title text-start fs-3 secondary-color fw-bold pt-2">Já pensou em morar em outra cidade?</p>
      <div class="d-flex flex-row justify-content-center">
        <input class="input-app pe-3" v-model="locationFilter" type="text" placeholder="Qual cidade?">
        <button id="btn-search" class="btn-app-primary px-3">
          <router-link v-if="locationFilter !== ''" class="router-link primary-color" :to="'/property/2/'+locationFilter"><i class="bi bi-search"></i></router-link>
          <i v-else class="bi bi-search"></i>
          </button>
      </div>
    </div>
    <hr>
    <div class="box-info">
      <p class="title text-start fs-3 secondary-color fw-bold pt-2">Nossos imóveis</p>
    </div>
    <div class="w-100">
      <CardSlider :API_URL="API_URL"/>
    </div>
    <hr>
    <div class="box-info">
      <p class="title text-start fs-3 secondary-color fw-bold pt-2">Procurando algo específico?</p>
      <p class="fs-6 fw-bold">Clique no botão abaixo para filtrar imóveis com as características que desejar</p>
      <button class="btn-app-primary mt-3">
        <router-link class="router-link primary-color text-decoration-none" to="/property/2/0"><i class="bi bi-search-heart-fill fs-5 pe-2"></i>Filtrar imóveis</router-link>
      </button>
    </div>
    <hr>
  </div>
</template>

<script>
import CardSlider from "../components/CardSlider.vue"
export default {
  name: 'HomeView',
  components: {
    CardSlider
  },
  data(){
    return{
      locationFilter: ""
    }
  },
  mounted(){
    this.verifyLogin()
  },
  props: {
    API_URL: {
      type: String,
      required: true
      },
    verifyLogin: {
        type: Function,
        required: true
    }
  }
}
</script>

<style scoped>
#banner{
    width: 100%;
    height: auto;
}
.banner-box{
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.banner-title{
  text-align: center;
  background-color: rgba(2, 83, 104, 0.6);
  position: absolute;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 5px #222;
}
.about{
  position: relative;
  background: white;
  border-radius: 60px 60px 0 0;
  text-align: justify;
  margin-top: -30px;
}
.box-info{
  max-width: 800px;
  width: 100%;
  padding: 20px;
}
#btn-search{
  position: relative;
  left: -13px;
}
</style>