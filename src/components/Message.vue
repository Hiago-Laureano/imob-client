<template>
    <div class="message">
        <div class="d-flex flex-column align-items-start justify-content-center">
            <div class="message-head fw-bold p-2">
                <i class="bi bi-info-circle-fill secondary-color fs-6 pe-2"></i>{{title}}
            </div>
            <hr>
            <div class="message-body p-2">
                {{text}}
            </div>
            <button @click="func" class="btn-close position-absolute top-0 end-0 p-2"></button>
        </div>
    </div>
</template>

<script>
export default{
    name: "Messenger",
    props: {
        title: {
            type: String,
            required: false,
            default: "Mensagem"
        },
        text: {
            type: String,
            required: false,
            default: "Concluído"
        },
        func: {
            type: Function,
            required: false,
            default: () => {}
        }
    }
}
</script>

<style scoped>
.message{
    position: fixed;
    bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 0.85em;
    box-shadow: 2px 2px 10px #222;
    background: white;
    height: 100px;
    width: 90vw;
    max-width: 250px;
    left: 0;
    right: 0;
    margin: auto;
    overflow: hidden;
    z-index: 2;
}
hr{
    margin-top: -3px;
    width: 100vw;
}
</style>
