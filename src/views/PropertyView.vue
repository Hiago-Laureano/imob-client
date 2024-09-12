<template>
    <div class="property my-4">
        <div class="container">
            <p class="title text-start fs-3 secondary-color fw-bold pt-2">Propriedades</p>
            <p class="fs-6 fw-bold">Deixe em branco os campos que não desejar filtrar</p>
            <div class="row">
                <div class="col-md-4">
                    <span class="badge rounded-pill bg-danger">Nome do imóvel</span><br>
                    <input class="input-app" v-model="nameFilter" type="text">
                </div>
                <div class="col-md-4">
                    <span class="badge rounded-pill bg-danger">Localização</span><br>
                    <input class="input-app" v-model="locationFilter" type="text">
                </div>
                <div class="col-md-4">
                    <span class="badge rounded-pill bg-danger">Nº mínimo de quartos</span><br>
                    <input class="input-app" v-model="bedroomsFilter" type="text">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <span class="badge rounded-pill bg-danger">Nº mínimo de banheiros</span><br>
                    <input class="input-app" v-model="bathroomsFilter" type="text">
                </div>
                <div class="col-md-4">
                    <span class="badge rounded-pill bg-danger">Preço máximo</span><br>
                    <input class="input-app" v-model="maxPriceFilter" type="text">
                </div>
                <div class="col-md-4">
                    <span class="badge rounded-pill bg-danger">Tipo de negócio</span><br>
                    <select v-model="selectedRent" class="select-app">
                        <option>Aluguel e venda</option>
                        <option>Apenas à venda</option>
                        <option>Apenas aluguel</option>
                    </select>
                </div>
            </div>
            <button @click="filter" class="btn-app-primary mt-4 mx-auto">Pesquisar</button>
            <hr>
        </div>
        <CardSlider v-if="searched" class="mt-5" :API_URL="API_URL" :verifyLogin="verifyLogin" :for_rent="selectedRent" :name="nameFilter" :location="locationFilter" :max_price="maxPriceFilter" :bedrooms="bedroomsFilter" :bathrooms="bathroomsFilter"/>
    </div>
</template>

<script>
import CardSlider from "../components/CardSlider.vue"
export default{
    name: "PropertyView",
    data(){
        return{
            selectedRent: null,
            nameFilter: null,
            locationFilter: null,
            bedroomsFilter: null,
            bathroomsFilter: null,
            maxPriceFilter: null,
            params_rent: null,
            searched: false
        }
    },
    methods: {
        filter(){
            if(this.searched){
                this.searched = false
                setTimeout(() => {this.searched = true}, 500)
            }else{
                this.searched = true
            }

        },
        updateType(){
            if(this.params_rent !== this.$route.params.rent){
                if(this.$route.params.rent === "1"){
                    this.selectedRent = "Apenas aluguel"
                }else if(this.$route.params.rent === "0"){
                    this.selectedRent = "Apenas à venda"
                }else{
                    this.selectedRent = "Aluguel e venda"
                }
                this.params_rent = this.$route.params.rent
            }

        }
    },
    created(){
        this.verifyLogin()
        this.updateType()
        if(this.$route.params.rent === "2" && this.$route.params.location !== "0"){
            this.locationFilter = this.$route.params.location
            this.searched = true
        }
        if(this.$route.params.location === "0"){
            window.scrollTo(0,0)
        }
    },
    updated(){
        this.updateType()
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
    },
    components: {
        CardSlider
    }
}
</script>

<style scoped>
.badge{
    position: relative;
    top: 10px;
}
#badge-checkbox{
    top: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
