<template>
    <div class="login my-4">
        <div v-if="! logged" class="d-flex flex-column align-items-center justify-content-center">
            <p class="title text-center fs-3 bg-primary-color primary-color fw-bold pt-2 rounded p-2 mt-3">Acesso a sua conta</p>
            <Alert v-if="alert[0]" :type="alert[1]" :text="alert[2]" class="mx-3"/>
            <span class="badge rounded-pill bg-danger">E-mail</span><br>
            <input v-model="email" class="input-app" id="email" type="text">
            <span class="badge rounded-pill bg-danger">Senha</span><br>
            <input v-if="! visiblePassword" v-model="password" class="input-app pe-5" id="password" type="password">
            <input v-else v-model="password" class="input-app pe-5" id="password" type="text">
            <button @click="setVisiblePassword" v-if="! visiblePassword" id="look-password" class="btn-transparent secondary-color"><i class="bi bi-eye-fill"></i></button>
            <button @click="setVisiblePassword" v-else id="look-password" class="btn-transparent secondary-color"><i class="bi bi-eye-slash-fill"></i></button>
            <button v-if="! loading" @click="login" class="btn-app-primary mt-2 mb-4">Entrar</button>
            <div v-else class="spinner-border text-primary mt-2 mb-4" role="status"></div>
        </div>
        <div v-else class="d-flex flex-column align-items-center justify-content-center">
            <p class="title text-center fs-3 bg-primary-color primary-color fw-bold pt-2 rounded p-2 mt-3">Olá, {{userName}}</p>
            <Alert v-if="alert[0]" :type="alert[1]" :text="alert[2]" class="mx-3 mt-3"/>
            <button v-if="! loading" class="btn-app-primary mt-2 mb-4 bg-success">
                <router-link class="router-link primary-color text-decoration-none" to="/form-property"><i class="bi bi-house-add-fill fs-5 pe-2"></i>Adicionar imóvel</router-link>
            </button>    
            <button v-if="! loading" @click="logout" class="btn-app-primary mt-2 mb-4 bg-danger"><i class="bi bi-door-open-fill me-2"></i>Sair</button>
            <div v-else class="spinner-border text-primary mt-2 mb-4" role="status"></div>
        </div>
    </div>
</template>

<script>
import Alert from "../components/Alert.vue"
export default{
    name: "LoginView",
    components: {
        Alert
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
    mounted(){
        this.verifyLogin()
        if(localStorage.getItem("auth") === "true"){
            this.logged = true
            this.userName = localStorage.getItem("name")
            this.openAlert("success", localStorage.getItem("message"))
        }
    },
    data(){
        return{
            loading: false,
            logged: false,
            userName: "",
            alert: [false, "success", ""],
            visiblePassword: false,
            email: "",
            password: ""
        }
    },
    methods: {
        logout(){
            this.loading = true
            fetch(this.API_URL+"/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    "Authorization": "Bearer "+localStorage.getItem("auth-token")
                },
            }).then(res => {
                if(res.status === 200 || res.status === 401){
                    res.json().then(json => {
                        this.openAlert("success", "Você foi deslogado")
                        localStorage.removeItem("auth-token")
                        localStorage.removeItem("name")
                        localStorage.removeItem("message")
                        this.logged = false
                    })
                }else{
                    this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                }
                this.loading = false
            }).catch(e => {
                this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                this.loading = false
            })
        },
        login(){
            if(this.email.length > 0 && this.password.length > 0){
                this.loading = true
                fetch(this.API_URL+"/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest"
                    },
                    body: JSON.stringify({"email": this.email, "password": this.password})
                }).then(res => {
                    if(res.status === 200){
                        res.json().then(json => {
                            this.openAlert("success", json.message)
                            localStorage.setItem("name", json.name)
                            localStorage.setItem("message", json.message)
                            localStorage.setItem("auth-token", json["auth-token"])
                            this.userName = localStorage.getItem("name")
                            this.logged = true
                            this.email = ""
                            this.password = ""
                        })
                    }else if(res.status === 201){
                        res.json().then(json => {
                            this.openAlert("info", json.message)
                            localStorage.setItem("name", json.name)
                            localStorage.setItem("message", json.message)
                            localStorage.setItem("auth-token", json["auth-token"])
                            this.userName = localStorage.getItem("name")
                            this.logged = true
                            this.email = ""
                            this.password = ""
                        })
                    }else if(res.status === 422){
                        res.json().then(json => {
                            this.openAlert("danger", json.message)
                        })
                    }else if(res.status === 403){
                        this.openAlert("danger", "Login incorreto")
                    }else{
                        this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                    }
                    this.loading = false
                }).catch(e => {
                    this.openAlert("danger", "Erro ao tentar conectar ao servidor!")
                    this.loading = false
                })
            }else{
                this.openAlert("danger", "Informe o e-mail e senha")
            }

        },
        setVisiblePassword(){
            if(this.visiblePassword === false){
                this.visiblePassword = true
            }else{
                this.visiblePassword = false
            }
        },
        openAlert(type, text){
            this.alert[0] = false
            setTimeout(() => {
                this.alert[0] = true
                this.alert[1] = type
                this.alert[2] = text
            }, 500)
        }
    }
}
</script>

<style scoped>
.login{
    min-height: 400px;
    background: linear-gradient(120deg, rgb(2, 83, 104), whitesmoke);
    width: 90vw;
    max-width: 400px;
    margin: auto;
    border-radius: 20px;
    box-shadow: 2px 2px 5px #222;
}
#email, #password{
    width: 80vw;
    max-width: 300px
}
.badge{
    position: relative;
    top: 35px;
    left: -120px;
}
#look-password{
    font-size: 26px;
    position: relative;
    top: -43px;
    left: 130px;
}
@media screen and (max-width: 370px){
.badge{
    left: 0;
}
#look-password{
    top: 0;
    left: 0;
}
}
</style>