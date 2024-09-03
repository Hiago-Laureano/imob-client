<template>
    <div class="nav px-3 bg-primary-color d-flex flex-row align-items-center justify-content-between">
        <div class="nav-branch d-flex flex-row align-items-center justify-content-end primary-color fs-4">
            <i class="bi bi-buildings-fill"></i>Imob
        </div>
        <div class="nav-menu d-flex flex-row align-items-center justify-content-end">
            <i v-if="! menuActive" @click="openMenu" class="bi bi-list" id="button-menu"></i>
            <i v-else @click="openMenu" class="bi bi-x" id="button-menu"></i>
        </div>
        <div class="off-canvas d-flex flex-column bg-secondary-color">
            <div class="off-canvas-head bg-primary-color p-2 primary-color">
                Olá, seja bem vindo(a), o que você procura?
            </div>
            <div class="off-canvas-body d-flex flex-column p-2">
                <router-link @click="closeMenu" class="router-link secondary-color" to="/"><i class="bi bi-1-square-fill"></i> - Comprar imóvel</router-link>
                <router-link @click="closeMenu" class="router-link secondary-color" to="/"><i class="bi bi-2-square-fill"></i> - Alugar imóvel</router-link>
                <router-link @click="closeMenu" class="router-link secondary-color" to="/"><i class="bi bi-3-square-fill"></i> - Anunciar meu imóvel</router-link>
            </div>
        </div>
    </div>
</template>


<script>
export default{
    name: "NavBar",
    data(){
        return{
            menuActive: false
        }
    },
    methods: {
        closeMenu(){
            let menu = document.querySelector(".off-canvas")
            menu.style.left = "-310px"
            this.menuActive = false
        },
        openMenu(){
            let menu = document.querySelector(".off-canvas")
            if(menu.style.left === "0px"){
                menu.style.left = "-310px"
                this.menuActive = false
            }else{
                menu.style.left = "0px"
                this.menuActive = true
            }
        }
    }
}

</script>

<style scoped>
.router-link{
    text-decoration: none;
    padding-bottom: 20px;
}
.nav{
   height: 60px;
   box-shadow: 0px 2px 5px #222;
}
#button-menu{
    font-size: 36px;
}
#button-menu:hover{
    cursor: pointer;
}
.off-canvas{
    position: fixed;
    top: 0;
    width: 300px;
    left: -310px;
    z-index: 2;
    transition: 1s;
    height: 100%;
    box-shadow: 0 2px 5px #222;;
}
.off-canvas-head{
    height: 60px;
}
</style>
