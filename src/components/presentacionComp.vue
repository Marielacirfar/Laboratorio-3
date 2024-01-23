import presentacionComp from '@/components/presentacionComp.vue';
<template>
    <div>

        <div>
            <img :src="url" alt="nombre">
            <h2>{{ nombre }}</h2>


        </div>

    </div>
</template>
<script>
export default {
    name: "presentacionComp",
    props: {
        url: {
            String,
        },
        nombre: {
            String
        }

    }
}
</script>
<style scoped>
img {
    width: 30px;
}

div {
    display: inline-block;
    text-align: center;
    border: 1px solid #f2f2f2;
    padding: 1%;
    border-radius: 5px;
    margin: 4px;
}

img {
    width: 8rem;
    height: 8rem;
    background: gray;
    padding: 0.5rem;
}
</style>