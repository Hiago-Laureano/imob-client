<template>
    <div class="image-slider mx-auto">
        <div v-if="! open" id="carouselId" class="carousel slide">
            <div class="carousel-inner">
                <div v-for="(image, count) in images" :key="count">
                    <div v-if="count > 0" :id="'div-'+image.id" class="carousel-item">
                        <button v-if="! disabledFunctions" @click="openForm(image.id)" class="btn-transparent fs-4 rounded-circle position-absolute top-0 end-0"><i class="bi bi-trash3-fill text-danger"></i></button>
                        <img :id="'img-'+image.id" :src="API_URL+'/'+image.link" class="img d-block primary-color" alt="Não foi possível carregar a imagem">
                    </div>
                    <div v-else :id="'div-'+image.id" class="carousel-item active">
                        <button v-if="! disabledFunctions" @click="openForm(image.id)" class="btn-transparent fs-4 rounded-circle position-absolute top-0 end-0"><i class="bi bi-trash3-fill text-danger"></i></button>
                        <img :id="'img-'+image.id" :src="API_URL+'/'+image.link" class="img d-block primary-color" alt="Não foi possível carregar a imagem">
                    </div>
                </div>
                <p v-if="images.length === 0" class="bg-danger primary-color fw-bold">Nenhuma imagem disponível!</p>
            </div>
            <button v-if="! disabledFunctions" @click="openForm(0)" class="btn-transparent fs-3 rounded-circle position-absolute start-0 bottom-0 ms-2"><i class="bi bi-plus-circle-fill text-success"></i></button>
            <button class="carousel-control-prev h-50 my-auto" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                <span class="carousel-control-prev-icon bg-primary-color" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next h-50 my-auto" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                <span class="carousel-control-next-icon bg-primary-color" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div v-else class="d-flex flex-column align-items-center justify-content-center m-2">
            <button @click="openForm" class="btn-close fs-4 position-absolute top-0 end-0 p-2"></button>
            <input v-if="! addImageStatus" id="input-files" name="files[]" multiple class="input-app mb-2" type="file">
            <button v-if="! addImageStatus" @click="addImage" class="btn-app-primary">Adicionar</button>
            <button v-if="! removeImageStatus" @click="deleteImage(id_delete)" class="btn-app-primary bg-danger mt-3">Deletar</button>
            <Alert v-if="alert[0]" :type="alert[1]" :text="alert[2]" class="mx-3 mt-2" id="alert"/>
        </div>
    </div>
</template>

<script>
import Alert from "./Alert.vue"
export default{
    name: "ImageSlider",
    components: {
        Alert
    },
    data(){
        return{
            addImageStatus: false,
            removeImageStatus: false,
            open: false,
            id_delete: 0,
            alert: [false, "success", ""],
            images: []
        }
    },
    mounted(){
        this.getImages()
    },
    methods: {
        getImages(){
            this.images = []
            fetch(this.API_URL+"/properties/"+this.id, {
                method: "GET",
                headers: {   
                }
            }).then(res => {
                if(res.status === 200){
                    res.json().then(json => {
                        this.images = json.data.images_links
                    })
                }
            }).catch(e => {
                this.images = []
            })
        },
        openForm(id){
            this.removeImageStatus = true
            this.addImageStatus = false
            this.alert[0] = false
            if(this.open === false){
                this.open = true
            }else{
                this.open = false
            }
            if(id !== 0){
                this.addImageStatus = true
                this.removeImageStatus = false
                this.id_delete = id
            }
        },
        addImage(){
            let target = document.querySelector("#input-files")
            if(target){
                let form = new FormData()
                form.append("property_id", this.id)
                for(let i of target.files){
                    form.append(target.name, i)
                }
                fetch(this.API_URL+"/image-add", {
                    method: "POST",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Authorization": "Bearer "+localStorage.getItem("auth-token")
                    },
                    body: form
                }).then(res => {
                    if(res.status === 201){
                        this.addImageStatus = true
                        this.alert[1] = "success"
                        this.alert[2] = "Foto(s) incrementada(s)!"
                        this.alert[0] = true
                        this.getImages()
                    }else if(res.status === 401){
                        this.alert[1] = "danger"
                        this.alert[2] = "Você não está autenticado!"
                        this.alert[0] = true
                    }else if(res.status === 422){
                        res.json().then(json => {
                            this.alert[1] = "danger"
                            this.alert[2] = json.message
                            this.alert[0] = true
                        })
                    }else{
                        this.alert[1] = "danger"
                        this.alert[2] = "Erro ao tentar conectar ao servidor!"
                        this.alert[0] = true
                    }
                }).catch(e => {
                    this.alert[1] = "danger"
                    this.alert[2] = "Erro ao tentar conectar ao servidor!"
                    this.alert[0] = true
                })
            }else{
                this.alert[1] = "danger"
                this.alert[2] = "Erro inesperado!"
                this.alert[0] = true
            }
        },
        deleteImage(id){
            fetch(this.API_URL+"/image-delete/"+id, {
                method: "DELETE",
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": "Bearer "+localStorage.getItem("auth-token")
                },
            }).then(res => {
                if(res.status === 204){
                    this.alert[1] = "success"
                    this.alert[2] = "Foto deletada!"
                    this.alert[0] = true
                    this.removeImageStatus = true
                    this.getImages()
                }else if(res.status === 401){
                    this.alert[1] = "danger"
                    this.alert[2] = "Você não está autenticado!"
                    this.alert[0] = true
                }else{
                    this.alert[1] = "danger"
                    this.alert[2] = "Erro ao tentar conectar ao servidor!"
                    this.alert[0] = true
                }
            }).catch(e => {
                this.alert[1] = "danger"
                this.alert[2] = "Erro ao tentar conectar ao servidor!"
                this.alert[0] = true
            })
        }
    },
    props: {
        id: {
            type: Number,
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
#input-files, #alert{
    font-size: 0.7em;
}
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
.img{
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