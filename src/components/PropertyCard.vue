<template>
    <div class="property-card bg-secondary-color d-flex flex-column align-items-center mt-3 mb-5">
        <span v-if="forRent" class="badge rounded-pill bg-info">Aluguel mensal de: R$ {{price.replace(".", ",")}}</span>
        <span v-else class="badge rounded-pill bg-danger">À venda por: R$ {{price.replace(".", ",")}}</span>
        <div class="card-header d-flex flex-column align-items-center">
            <img v-if="isSetImage" id="image" :src="API_URL+'/'+imageLink" alt="Imagem não encontrada">
            <img v-else id="image" src=@/assets/noImageProperty.webp alt="Imagem não encontrada">
        </div>
        <hr>
        <div class="card-body p-2 mb-2">
            <p id="title-card" class="rounded bg-primary-color primary-color fw-semibold px-1 py-1">{{title}}</p>
            <p id="info-card" class="fw-semibold secondary-color"><i class="bi bi-geo-alt-fill text-danger fs-4 pe-1"></i>{{location}}</p>
        </div>
    </div>
</template>

<script>
    export default{
        name: "PropertyCard",
        props: {
            id: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            imageLink: {
                type: String,
                required: false
            },
            isSetImage: {
                type: Boolean,
                required: true
            },
            forRent: {
                type: Number,
                required: true
            },
            API_URL: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
.property-card{
    width: 250px;
    height: 330px;
    border-radius: 15px;
    box-shadow: 2px 2px 5px #222;
}
.property-card:hover{
    cursor: pointer;
}
.card-header{
    height: 60%;
    overflow: hidden;
}
.card-body{
    height: 40%;
    width: 100%;
    overflow: hidden;
}
#image{
    height: 100%;
}
.badge{
    position: relative;
    top: -10px;
}
#title-card, #info-card{
    font-size: 0.7em;
    text-align: start;
}
</style>
