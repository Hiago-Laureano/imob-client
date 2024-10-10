<template>
    <div class="card-slider d-flex flex-row align-items-center justify-content-start mx-3">
        <i @click="passLeft" id="arrow-left" class="bi bi-arrow-left-square-fill fs-1"></i>
        <div class="card-box d-flex flex-row align-items-center justify-content-start">
            <div v-if="loading" class="d-flex flex-column align-items-center w-100">
                <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div class="px-2" v-else v-for="item in data" :key="item.id">
                <PropertyCard v-if="item.images_links[0]" :id="item.id" :imageLink="item.images_links[0].link" :isSetImage=true :API_URL="API_URL"/>
                <PropertyCard v-else :id="item.id" :isSetImage=false :API_URL="API_URL"/>
            </div>
            <div v-if="noResults === 'undefined'" class="d-flex flex-column align-items-center w-100">
                <p class="title text-start fs-3 secondary-color fw-bold pt-2">Sem resultados!</p>
            </div>
        </div>
    <i v-if="! loadingMore" @click="passRight" id="arrow-right" class="bi bi-arrow-right-square-fill fs-1 me-2"></i>
    <div v-else class="spinner-border text-primary" role="status"></div>
    </div>
</template>

<script>
import PropertyCard from './PropertyCard.vue'
export default{
    name: "CardSlider",
    data(){
        return{
            loading: false,
            data: [],
            params: "",
            noResults: null,
            page: 1,
            scroll: 0,
            next: true,
            loadingMore: false
        }
    },
    components: {
        PropertyCard
    },
    props: {
        API_URL: {
            type: String,
            required: true
        },
        for_rent: {
            type: String,
            required: false,
            default: null
        },
        name: {
            type: String,
            required: false,
            default: null
        },
        bedrooms: {
            type: String,
            required: false,
            default: null
        },
        bathrooms: {
            type: String,
            required: false,
            default: null
        },
        location: {
            type: String,
            required: false,
            default: null
        },
        max_price: {
            type: String,
            required: false,
            default: null
        }
    },
    methods: {
        getPropertyes(){
            this.loading = true
            this.params = ""
            this.noResults = null
            if(this.name !== null){this.params+="&name="+this.name}
            if(this.location !== null){this.params+="&location="+this.location}
            if(this.bedrooms !== null){this.params+="&bedrooms="+this.bedrooms}
            if(this.bathrooms !== null){this.params+="&bathrooms="+this.bathrooms}
            if(this.max_price !== null){this.params+="&max_price="+this.max_price}
            if(this.for_rent === "Apenas à venda"){
                this.params+="&for_rent=0"
            }else if(this.for_rent === "Apenas aluguel"){
                this.params+="&for_rent=1"
            }
            fetch(this.API_URL+"/properties?page="+this.page+this.params, {
                method: "GET",
                headers: {
                }
            }).then(res => {
                if(res.status === 200){
                    res.json().then(json => {
                        for(let i of json.data){
                            this.data.push(i)
                        }
                        this.noResults = typeof(this.data[0])
                        this.next = json.links.next
                    })
                }else{
                    this.noResults = "undefined"
                }
                this.loadingMore = false
                this.loading = false
            }).catch(e => {
                this.loadingMore = false
                this.noResults = "undefined"
                this.loading = false
            })
        },
        passLeft(){
            let card_box = document.querySelector(".card-box")
            card_box.scrollLeft -= 266
            this.scroll = card_box.scrollLeft
        },
        passRight(){
            let card_box = document.querySelector(".card-box")
            card_box.scrollLeft += 266
            if(card_box.scrollLeft === this.scroll && this.next){
                this.page += 1
                this.loadingMore = true
                this.getPropertyes()
            }
            this.scroll = card_box.scrollLeft
        }
    },
    created(){
        this.getPropertyes()
    }
}
</script>


<style scoped>
.card-box{
    width: 80%;
    overflow: hidden;
}
#arrow-left, #arrow-right{
    width: 10%;
}
#arrow-left:hover, #arrow-right:hover{
    cursor: pointer;
}
#arrow-right{
    text-align: end;
}
</style>