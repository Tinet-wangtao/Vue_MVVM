<template>
    <div id="secondcomponent">
        <h1>This is the second page</h1>
        <a>second page written by {{ author }} </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                author: "hohoTT",
                articles: [],
            }
        }
    }
</script>

<style>
</style>