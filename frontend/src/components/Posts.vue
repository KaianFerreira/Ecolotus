<template>
  <section class="container d-flex justify-center">
    <div class="content">
      <div class="search d-flex align-center">
        <div class="d-flex flex-grow-1">
          <input type="text" placeholder="Pesquisar" v-model="search" class="">
          <div class="search-button d-flex align-center justify-center">
            <v-icon color="white">mdi-magnify</v-icon>
          </div>
        </div>
      </div>
      <div class="cards d-flex justify-center flex-wrap">
        <div class="card" @click="$router.push(`/post/${post.id}`)" v-for="(post, i) in filteredPosts" :key="i">
          <v-img eager :src="post.photo" class="image" aspect-ratio="1.7"></v-img>
          <div class="content d-flex flex-column justify-space-between">
            <div class="content-wrapper">
              <div class="user d-flex">
                <v-avatar color="orange" class="avatar" size="50">
                  <v-img :src="post.userPhoto"></v-img>
                </v-avatar>
                <div class="user-info d-flex flex-column">
                  <span>{{ post.user }}</span>
                </div>
              </div>
              <div class="text-wrapper">
                <div class="title">
                  {{ post.title }}
                </div>
                <div class="text">
                  {{ post.subtitle }}
                </div>
              </div>
            </div>
            <div style="font-weight: bold; margin-bottom: 26px">Saiba mais</div>
          </div>
          <v-divider></v-divider>
          <div class="footer d-flex align-center">
            <div style="font-family: Anaheim;font-size:9px;margin: 15px">{{ post.publishDate }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAll } from '../api/post'
  export default {
    data () {
      return {
        posts: [],
        search: ''
      }
    },
    async mounted () {
      this.posts = await getAll()
    },
    computed: {
      filteredPosts () {
        return this.posts.filter(x => Object.keys(x).some(key => String(x[key]).toUpperCase().includes(this.search.toUpperCase())))
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content {
    width: 100%;
  }
  .search {
    margin: 12px 0px !important;
    margin-bottom: 12px;
    input {
      border: 1px solid #E7E7E7;
      border-radius: 6px;
      padding: 8px;
      width: 100%;
      outline: none;
      border-bottom-right-radius: 0px;
      border-top-right-radius: 0px;
      border-right: none;
    }
    .search-button {
      background-color: #39C0B8;
      border-bottom-right-radius: 6px;
      border-top-right-radius: 6px;
      width: 40px;
    }
  }
  .card {
    cursor: pointer;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    width: 90%;
    margin-bottom: 20px;
    .image {
      border-top-right-radius: 6px !important;
      border-top-left-radius: 6px !important;
      height: 152px;
    }
    .text {
      max-height: 98px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .user {
      .avatar {
        transform: translateY(-50%);
      }

      .user-info {
        margin: 10px;
        :first-child { margin-bottom: 4px; }
        :last-child { font-size: 0.7em; }
      }
    }
    .content {
      max-width: 100%;
      height: 300px;
      padding: 0 26px;
      .text-wrapper {
        overflow-wrap: break-word;
        .title {
          font-family: Amiko;
          font-style: normal;
          font-weight: normal;
          font-size: 18px;
          line-height: 24px;
          margin-bottom: 20px;
        }
        .text {
          font-size: 11px;
          margin-bottom: 26px;
        }
      }
    }
  }
  @media screen and (min-width: 768px) {
    .content {
      width: 80vw !important;
    }
    .card {
      margin: 10px;
      max-width: 320px !important;
      .text {
        max-height: 98px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>