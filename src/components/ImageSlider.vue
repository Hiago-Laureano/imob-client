<template>
    <div class="image-slider mx-auto">
        <div id="carouselId" class="carousel slide">
            <div class="carousel-inner">
                <div v-for="(image, count) in images" :key="count" class="carousel-item active">
                    <button v-if="! disabledFunctions" class="btn-transparent fs-4 rounded-circle position-absolute top-0 end-0"><i class="bi bi-trash3-fill text-danger"></i></button>
                    <img id="img" :src="API_URL+'/'+image.link" class="d-block primary-color" alt="Não foi possível carregar a imagem">
                </div>
                <p v-if="images.length === 0" class="bg-danger primary-color fw-bold">Nenhuma imagem disponível!</p>
                <button v-if="! disabledFunctions" class="btn-transparent fs-3 rounded-circle position-absolute start-0 bottom-0 ms-2"><i class="bi bi-plus-circle-fill text-success"></i></button>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bg-primary-color" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                <span class="carousel-control-next-icon bg-primary-color" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>

<script>
export default{
    name: "ImageSlider",
    props: {
        images: {
            type: Array,
            required: true
        },
        API_URL: {
            type: String,
            required: true
        },
        disabledFunctions: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.image-slider{
    background: whitesmoke;
    margin-bottom: 20px;
    box-shadow: 2px 2px 5px #222;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    height: 60vw;
    overflow: hidden;
}
#carouselId{
    width: 100%;
    max-width: 600px;
    height: 60vw;
    padding: 10px;
}
#img{
    width: 100%;
    max-width: 600px;
    height: auto;
}

@media screen and (min-width: 600px){
.image-slider{
    height: 400px;
}
#carouselId{
    height: 400px;
}
}
</style>