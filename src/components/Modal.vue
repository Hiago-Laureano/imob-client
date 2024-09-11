<template>
    <div class="modal fade" :id="'modal-'+id" tabindex="-1" aria-labelledby="modal-id" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{title}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{{text}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-app-primary bg-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button @click="func" type="button" class="btn-app-primary" data-bs-dismiss="modal">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name: "Modal",
    props: {
        title: {
            type: String,
            required: false,
            default: "Mensagem"
        },
        text: {
            type: String,
            required: false,
            default: "tem certeza que deseja continuar?"
        },
        func: {
            type: Function,
            required: false,
            default: () => {}
        },
        id: {
            type: Number,
            required: true,
        }
    }
}
</script>
