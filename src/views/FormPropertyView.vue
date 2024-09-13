<template>
    <div class="form-property">
        <div class="d-flex flex-column align-items-center">
            <p class="title text-start fs-3 primary-color bg-primary-color fw-bold mt-4 p-2 rounded"><i class="bi bi-house-add-fill me-3"></i>Adicionar Imóvel</p>
            <Alert v-if="alert[0]" :type="alert[1]" :text="alert[2]" class="mt-3"/>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Nome do Imóvel</span>
                <input v-model="name" type="text" class="input-app">
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Localização</span>
                <input v-model="location" type="text" class="input-app">
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Descrição</span>
                <textarea v-model="description" rows="4" class="textarea-app"></textarea>
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Preço</span>
                <input v-model="price" type="number" class="input-app">
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Números de Banheiros</span>
                <input v-model="bathrooms" type="number" class="input-app">
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Números de Quartos</span>
                <input v-model="bedrooms" type="number" class="input-app">
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Tipo de Negócio</span>
                <select v-model="for_rent" class="select-app">
                    <option disabled :value="-1">Selecione</option>
                    <option :value="0">Venda</option>
                    <option :value="1">Aluguel</option>
                </select>
            </div>
            <div v-if="for_rent === 1" class="d-flex flex-column align-items-center">
                <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                    <span class="badge bg-info mx-auto">Máximo de Inquilinos</span>
                    <input v-model="max_tenants" type="number" class="input-app">
                </div>
                <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                    <span class="badge bg-info mx-auto">Tempo Mínimo de Contrato</span>
                    <input v-model="min_contract_time" type="number" class="input-app">
                </div>
                <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                    <span class="badge bg-info mx-auto">Animais no Imóvel</span>
                    <select v-model="accept_animals" class="select-app">
                        <option disabled :value="-1">Selecione</option>
                        <option :value="1">Permitido</option>
                        <option :value="0">Proibido</option>
                    </select>
                </div>
            </div>
            <div class="box-input d-flex flex-column align-itens-center justify-content-center mt-3">
                <span class="badge bg-info mx-auto">Adicionar Fotos</span>
                <input id="input-files" name="files[]" multiple type="file" class="input-app">
            </div>
            <button v-if="! loading" @click="post" class="btn-app-primary mt-3 mb-5">Registrar</button>
            <div v-else class="spinner-border text-primary mt-3 mb-5" role="status"></div>
        </div>
    </div>
</template>

<script>
import Alert from "../components/Alert.vue"
export default{
    name: "FormPropertyView",
    components: {
        Alert
    },
    data(){
        return{
            loading: false,
            alert: [false, "success", ""],

            name: "",
            price: 0.00,
            location: "",
            description: "",
            bedrooms: 1,
            bathrooms: 1,
            for_rent: -1,
            min_contract_time: 1,
            max_tenants: 1,
            accept_animals: -1,
        }
    },
    methods: {
        openAlert(color, text){
            this.alert[2] = text
            this.alert[1] = color
            this.alert[0] = true
            window.scrollTo(0,0)
        },
        wipeData(){
            this.name = ""
            this.price = 0.00
            this.location = ""
            this.description = ""
            this.bedrooms = 1
            this.bathrooms = 1
            this.for_rent = -1
            this.min_contract_time = 1
            this.max_tenants = 1
            this.accept_animals = -1
            let target = document.querySelector("#input-files")
            target.value = ""
        },
        post(){
            if(this.for_rent === -1){
                this.openAlert("danger", "Informe o tipo de negócio")
            }else if(this.for_rent === 1 && this.accept_animals === -1){
                this.openAlert("danger", "Informe se são permitidos animais no imóvel")
            }else{
                this.loading = true
                let form = new FormData()
                let target = document.querySelector("#input-files")
                for(let i of target.files){
                    form.append(target.name, i)
                }
                form.append("name", this.name)
                form.append("price", this.price)
                form.append("location", this.location)
                form.append("description", this.description)
                form.append("bedrooms", this.bedrooms)
                form.append("bathrooms", this.bathrooms)
                form.append("for_rent", this.for_rent)
                if(this.for_rent === 1){
                    form.append("min_contract_time", this.min_contract_time)
                    form.append("max_tenants", this.max_tenants)
                    form.append("accept_animals", this.accept_animals)
                }

                fetch(this.API_URL+"/post", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer "+localStorage.getItem("auth-token"),
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: form
                }).then(res => {
                    if(res.status === 201){
                        this.openAlert("success", "Propriedade registrada!")
                        this.wipeData()
                    }else{
                        res.json().then(json => {
                            this.openAlert("danger", json.message)
                        }).catch(e => {
                            this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                        })
                    }
                    this.loading = false
                }).catch(e => {
                    this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                    this.loading = false
                })
            }

        }
    },
    props: {
        API_URL: {
            type: String,
            required: true
        },
    }
}
</script>

<style scoped>
.textarea-app{
    background: whitesmoke;
    box-shadow: 2px 2px 3px #222;
    border-radius: 10px;
    padding: 10px;
}
.box-input{
    padding-left: 15px;
    padding-right: 15px;
    width: 100vw;
    max-width: 400px;
}
.badge{
    position: relative;
    top: 10px;
}
</style>
