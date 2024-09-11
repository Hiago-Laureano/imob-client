<template>
    <div class="alert-main">
        <div v-if="type === 'info'" class="alert alert-info d-flex align-items-center" role="alert"><i class="bi bi-info-square-fill me-2"></i> {{text}}</div>
        <div v-else-if="type === 'danger'" class="alert alert-danger d-flex align-items-center" role="alert"><i class="bi bi-exclamation-triangle-fill me-2"></i> {{text}}</div>
        <div v-else-if="type === 'warning'" class="alert alert-warning d-flex align-items-center" role="alert"><i class="bi bi-exclamation-triangle-fill me-2"></i> {{text}}</div>
        <div v-else class="alert alert-success d-flex align-items-center" role="alert"><i class="bi bi-check-circle-fill me-2"></i> {{text}}</div>
    </div>
</template>

<script>
export default{
    name: "Alert",
    props: {
        type: {
            type: String,
            required: false,
            default: "success"
        },
        text: {
            type: String,
            required: false,
            default: ""
        },
    }
}
</script>
