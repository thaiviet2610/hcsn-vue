<template>
    <!-- tooltip container -->
    <div class="tooltip-container">
        {{ text }}
    </div>

</template>

<script>
export default {
    props: {
        text:{
            type: String,
            default: ""
        },
        classTooltip: {
            type: String,
            default: ""
        },
    }
}
</script>

<style scoped>
@import url(./tooltip.css);
</style>