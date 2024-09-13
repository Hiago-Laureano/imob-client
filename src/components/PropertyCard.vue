<template>
    <div class="property-card mt-3 mb-5">
        <div @click="openAllInfos" class="property-card-infos bg-secondary-color d-flex flex-column align-items-center">
            <span v-if="for_rentData" class="badge rounded-pill bg-info">Aluguel mensal de: R$ {{priceData.toString().replace(".", ",")}}</span>
            <span v-else class="badge rounded-pill bg-danger">À venda por: R$ {{priceData.toString().replace(".", ",")}}</span>
            <div class="card-header d-flex flex-column align-items-center">
                <img v-if="isSetImage" id="image" :src="API_URL+'/'+imageLink" alt="Imagem não encontrada" width="100%">
                <img v-else id="image" src=@/assets/noImageProperty.webp alt="Imagem não encontrada" width="100%">
            </div>
            <hr>
            <div class="card-body p-2 mb-2">
                <p id="title-card" class="rounded bg-primary-color primary-color fw-semibold px-1 py-1">{{nameData}}</p>
                <p id="info-card" class="fw-semibold secondary-color"><i class="bi bi-geo-alt-fill text-danger fs-4 pe-1"></i>{{locationData}}</p>
            </div>
        </div>
        <div v-if="moreInfos" class="more-info-property bg-secondary-color d-flex flex-column align-items-center pt-5 px-3">
            <i @click="closeMoreInfos" class="bi bi-arrow-left-circle-fill secondary-color fs-1 ms-1 position-absolute top-0 start-0"></i>
            <div class="container-md text-center mb-2">
                <ImageSlider :id="id" :API_URL="API_URL" :disabledFunctions="disabledInputs"/>
                <div id="little-infos" class="row justify-content-between">
                    <div class="col-md-3 pb-1">
                        <div class="bg-primary-color primary-color p-1">Tipo de negócio</div>
                        <button v-if="for_rentData" @click="setFor_rent" id="btn-boolean" :disabled="disabledInputs">Aluguel <i v-if="! disabledInputs" class="bi bi-chevron-down"></i></button>
                        <button v-else @click="setFor_rent" id="btn-boolean" :disabled="disabledInputs">Venda <i v-if="! disabledInputs" class="bi bi-chevron-down"></i></button>
                    </div>
                    <div class="col-md-3 pb-1">
                        <div v-if="for_rentData" class="bg-primary-color primary-color p-1">Aluguel mensal em R$</div>
                        <div v-else class="bg-primary-color primary-color p-1">Valor de venda em R$</div>
                        <input v-model="priceData" type="number" class="textarea-app w-100" :disabled="disabledInputs">
                    </div>
                    <div class="col-md-3 pb-1">
                        <div class="bg-primary-color primary-color p-1">Quartos</div>
                        <input v-model="bedroomsData" type="number" class="textarea-app w-100" :disabled="disabledInputs">
                    </div>
                    <div class="col-md-3 pb-1">
                        <div class="bg-primary-color primary-color p-1">Banheiros</div>
                        <input v-model="bathroomsData" type="number" class="textarea-app w-100" :disabled="disabledInputs">
                    </div>
                    <div v-if="for_rentData" class="col-md-3 pb-1">
                        <div class="bg-primary-color primary-color p-1">Tempo mínimo de contrato</div>
                        <input v-model="min_contract_timeData" type="number" class="textarea-app w-100" :disabled="disabledInputs">
                    </div>
                    <div v-if="for_rentData" class="col-md-3 pb-1">
                        <div class="bg-primary-color primary-color p-1">Nº máximo de inquilinos</div>
                        <input v-model="max_tenantsData" type="number" class="textarea-app w-100" :disabled="disabledInputs">
                    </div>
                    <div v-if="for_rentData" class="col-md-3 pb-1">
                        <div class="bg-primary-color primary-color p-1">Aceita pets</div>
                        <button v-if="accept_animalsData" @click="setAccept_animals" id="btn-boolean" :disabled="disabledInputs">Sim <i v-if="! disabledInputs" class="bi bi-chevron-down"></i></button>
                        <button v-else @click="setAccept_animals" id="btn-boolean" :disabled="disabledInputs">Não <i v-if="! disabledInputs" class="bi bi-chevron-down"></i></button>
                    </div>
                </div>
            </div>
            <div class="container-md mb-2">
                <div class="bg-primary-color primary-color p-1">Nome da Propriedade</div>
                <textarea v-model="nameData" class="textarea-app w-100" :disabled="disabledInputs"></textarea>
            </div>
            <div class="container-md mb-2">
                <div class="bg-primary-color primary-color p-1">Localização</div>
                <textarea v-model="locationData" class="textarea-app w-100" :disabled="disabledInputs"></textarea>
            </div>
            <div class="container-md mb-2">
                <div class="bg-primary-color primary-color p-1">Descrição</div>
                <textarea v-model="descriptionData" rows="4" class="textarea-app w-100" :disabled="disabledInputs"></textarea>
            </div>
            <div v-if="disabledInputs" class="container-md mb-2 d-flex flex-column justify-content-center align-items-center">
                <p class="title fs-6 secondary-color fw-bold mb-2">Ficou interessado nesta propriedade? Clique no botão abaixo para conversar conosco pelo WhatsApp</p>
                <button @click="openWhatsApp" class="btn-app-primary"><i class="bi bi-whatsapp"></i> Iniciar conversa</button>
            </div>
            <div v-else class="container-md mb-2 d-flex flex-column justify-content-center align-items-center">
                <Alert v-if="alert[0]" :type="alert[1]" :text="alert[2]" class="mx-3 mt-3"/>
                <button @click="() => {this.modal = ['Atualizar dados', 'Deseja continuar?', updateInfos]}" data-bs-toggle="modal" :data-bs-target="'#modal-'+id" class="btn-app-primary mb-5">Atualizar dados</button>
                <button @click="() => {this.modal = ['Deletar dados', 'Deseja continuar?', deleteInfos]}" data-bs-toggle="modal" :data-bs-target="'#modal-'+id" class="btn-app-primary bg-danger mb-2">Deletar dados</button>
            </div>
        </div>
        <Message v-if="message[0]" :title="message[1]" :text="message[2]" :func="messageOff"/>
        <Modal :id="id" :title="modal[0]" :text="modal[1]" :func="modal[2]"/>    
    </div>
</template>

<script>
import ImageSlider from "./ImageSlider.vue"
import Modal from "./Modal.vue"
import Message from "./Message.vue"
import Alert from "./Alert.vue"
export default{
    name: "PropertyCard",
    data(){
        return{
            phoneNumber: "55XXXXXXXXXXX",
            disabledInputs: true,
            moreInfos: false,
            modal: ["", "", () => {}],
            message: [false, "Informação", ""],
            alert: [false, "success", ""],
            data: {},

            nameData: "",
            priceData: 0,
            locationData: "",
            descriptionData: "",
            bedroomsData: 1,
            bathroomsData: 1,
            for_rentData: 1,
            max_tenantsData: 1,
            min_contract_timeData: 1,
            accept_animalsData: 1,
        }
    },
    components: {
        ImageSlider,
        Modal,
        Message,
        Alert
    },
    mounted(){
        this.getProperty()
        if(localStorage.getItem("auth") === "true"){
            this.disabledInputs = false
        }
    },
    methods: {
        messageOff(){
            this.message[0] = false
        },
        openAllInfos(){
            if(this.nameData !== 'Erro ao carregar dados!' && this.nameData !== 'Propriedade deletada!'){
                this.moreInfos = true
            }
        },
        updateInfos(){
            if(this.for_rentData === 0){
                this.data = {"name": this.nameData, "price": this.priceData, "location": this.locationData,
                "description": this.descriptdata, "bedrooms": this.bedroomsData, "bathrooms": this.bathroomsData,
                "for_rent": this.for_rentData}
            }else{
                this.data = {"name": this.nameData, "price": this.priceData, "location": this.locationData,
                "description": this.descriptdata, "bedrooms": this.bedroomsData, "bathrooms": this.bathroomsData,
                "for_rent": this.for_rentData, "max_tenants": this.max_tenantsData, "min_contract_time": this.min_contract_timeData,
                "accept_animals": this.accept_animalsData}
            }
            fetch(this.API_URL+"/update/"+this.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": "Bearer "+localStorage.getItem("auth-token")
                },
                body: JSON.stringify(this.data)
            }).then(res => {
                if(res.status === 204){
                    this.message[1] = "Informação"
                    this.message[2] = "Dados atualizados!"
                    this.message[0] = true
                }else if(res.status === 401){
                    this.openAlert("danger", "Você não está autenticado!")
                    window.scrollTo(0,0)
                }else if(res.status === 422){
                    res.json().then(json => {
                        this.openAlert("danger", json.message)
                    })
                }else{
                    this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                }
            }).catch(e => {
                this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
            })
        },
        deleteInfos(){
            fetch(this.API_URL+"/delete/"+this.id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": "Bearer "+localStorage.getItem("auth-token")
                },
            }).then(res => {
                if(res.status === 204){
                    this.locationData = ""
                    this.nameData = "Propriedade deletada!"
                    this.priceData = 0.00
                    this.moreInfos = false
                    this.message[1] = "Informação"
                    this.message[2] = "Dados deletados!"
                    this.message[0] = true
                }else if(res.status === 401){
                    this.openAlert("danger", "Você não está autenticado!")
                    window.scrollTo(0,0)
                }else{
                    this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                }
            }).catch(e => {
                this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
            })
        },
        openWhatsApp(){
            window.open("https://wa.me/"+this.phoneNumber+"?text=Estou%20interessado%20na%20propriedades%20Nº"+this.id)
        },
        setFor_rent(){
            if(this.for_rentData === 0){
                this.for_rentData = 1
            }else{
                this.for_rentData = 0
            }
        },
        setAccept_animals(){
            if(this.accept_animalsData === 0){
                this.accept_animalsData = 1
            }else{
                this.accept_animalsData = 0
            }
        },
        closeMoreInfos(){
            this.moreInfos = false
        },
        getProperty(){
            this.nameData = "",
            this.priceData = 0,
            this.locationData = "",
            this.descriptionData = "",
            this.bedroomsData = 1,
            this.bathroomsData = 1,
            this.for_rentData = 1,
            this.max_tenantsData = 1,
            this.min_contract_timeData = 1,
            this.accept_animalsData = 1,
            fetch(this.API_URL+"/get/"+this.id, {
                method: "GET",
                headers: {   
                }
            }).then(res => {
                if(res.status === 200){
                    res.json().then(json => {
                        this.nameData = json.data.name
                        this.priceData = json.data.price
                        this.locationData = json.data.location
                        this.descriptionData = json.data.description
                        this.bedroomsData = json.data.bedrooms
                        this.bathroomsData = json.data.bathrooms
                        this.for_rentData = json.data.for_rent
                        this.max_tenantsData = json.data.max_tenants
                        this.min_contract_timeData = json.data.min_contract_time
                        if(this.for_rentData === 1){
                            this.accept_animalsData = json.data.accept_animals
                        }
                    })
                }else{
                    this.nameData = "Erro ao carregar dados!"
                }
            }).catch(e => {
                this.nameData = "Erro ao carregar dados!"
            })
        },
        openAlert(type, text){
            this.alert[0] = false
            setTimeout(() => {
                this.alert[0] = true
                this.alert[1] = type
                this.alert[2] = text
            }, 500)
        }
    },
    props: {
        id: {
            type: Number,
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
        API_URL: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.bi-arrow-left-circle-fill:hover{
    cursor: pointer
}
.title{
    text-align: justify;
}
#btn-boolean{
    width: 100%;
    border: 1px solid rgb(2, 83, 104);
    background: white;
    text-align: start;
}
#btn-boolean:disabled{
    cursor: default;
    background-color: rgba(239, 239, 239, 0.3);
    color: rgb(84, 84, 84);
}
#little-infos{
    font-size: 0.7em;;
}
.property-card-infos{
    width: 250px;
    height: 330px;
    border-radius: 15px;
}
.property-card{
    width: 250px;
    height: 330px;
    border-radius: 15px;
    box-shadow: 2px 2px 5px #222;
}
.property-card-infos:hover{
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
.more-info-property{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    z-index: 2;
}
</style>
