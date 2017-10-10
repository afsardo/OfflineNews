<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Offline News</h1>

                <p v-if="articles.length==0">There are no news...</p>
            </div>
        </div>

        <div class="row" v-for="article in articles">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading"><h4>{{ article.title }}</h4></div>

                    <div class="panel-body">
                        {{ article.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                articles: []
            };
        },
        mounted() {
            setTimeout(() => {
                axios.get('/api/articles').then(response => {
                    console.log(response);
                    this.articles = response.data;
                }, error => {
                    console.log(error);
                });

                axios.get('/api/articles/2').then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                });

                axios.post('/api/articles', {title: "TITLE", content: "CONTENT"}).then(response => {
                    console.log(response);
                }, error => {
                    console.log(error);
                });
            }, 300);
        }
    }
</script>
