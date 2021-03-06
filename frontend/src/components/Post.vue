<template>
  <section class="container d-flex align-center flex-column">
    <div 
      class="card"
      v-if="!loading"
    >
      <div class="image-upload" :class="{'disactivated' : !edit}" @click="changeImage">
        <v-img eager v-if="photo" :src="photo" class="image" aspect-ratio="1.7"></v-img>
        <div v-else class="image d-flex justify-center align-center" style="background: darkgray;">
          <span v-if="edit"> Clique para adicionar uma imagem </span>
        </div>
        <input v-show="false" ref="fileUpload" type="file" accept="image/jpeg" @change="uploadImage($event.target.files[0])">
      </div>
      <div class="content">
        <div class="content-wrapper">
          <div class="user d-flex">
            <v-avatar color="orange" class="avatar" size="50">
              <v-img :src="postUser.photo"></v-img>
            </v-avatar>
            <div class="user-info d-flex flex-column">
              <span>{{ postUser.name }}</span>
            </div>
          </div>
          <div class="text-wrapper">
            <div class="title">
              <v-textarea
                filled
                label="Título"
                v-model="title"
                v-if="(owner || id === 'new') && edit"
                counter="73"
                :error-messages="errors.indexOf('title') > - 1 ? 
                  ['Insira um título'] : []"
              ></v-textarea>
              <div v-else>
                {{ title }}
              </div>
            </div>
            <div class="text">
              <v-textarea
                filled
                label="Subtítulo"
                v-model="subTitle"
                v-if="(owner || id === 'new') && edit"
                :error-messages="errors.indexOf('subtitle') > - 1 ? 
                  ['Insira um subtítulo'] : []"                
              ></v-textarea>
              <div v-else>
                {{ subTitle }}
              </div>
            </div>
            <div class="text">
              <v-textarea
                filled
                label="Texto"
                v-model="text"
                v-if="(owner || id === 'new') && edit"
                :error-messages="errors.indexOf('text') > - 1 ? 
                  ['Insira um texto'] : []"                 
              ></v-textarea>
              <div v-else>
                {{ text }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-input
        :error-messages="errors === 'Internal error' ? 
          'Ocorreu um erro interno' : '' "
      ></v-input>
      <v-divider></v-divider>
      <div class="footer d-flex align-center">
        <div style="font-family: Anaheim;font-size:9px;margin: 15px">{{ publishDate }}</div>
      </div>
    </div>
    <div 
      v-if="!loading"
      class="d-flex justify-end"
      style="width: 100%"
    >
      <div v-if="edit" class="d-flex justify-space-between">
        <div>
          <v-btn
            color="secondary"
            text
            v-if="edit"
            @click="cancel"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="btn-primary"
            @click="save"
            v-if="edit"
          >
            Confirmar
          </v-btn>
        </div>
      </div>
      <v-btn
        color="secondary"
        v-if="(this.user && this.user.user === 1 && !edit && !owner) || owner && !edit"
        text @click="remove">
        Remover
      </v-btn>
      <v-btn
          v-if="owner && !edit"
          class="btn-primary"
          @click="edit = true"
        >
          Alterar
        </v-btn>
    </div>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      width="700"
      height="768"
      loading
      type="card-avatar, article, actions"
    >
    </v-skeleton-loader>
  </section>
</template>

<script>
import { uploadImage } from '../tools'
import { mapState } from 'vuex'
import { get, create, update, remove } from '../api/post'
export default {
  props: ['id'],
  data () {
    return {
      img: null,
      errors: [],
      postUser: '',
      publishDate: '',
      title: '',
      text: '',
      subTitle: '',
      loading: true,
      imageFile: '',
      owner: false,
      edit: false,
      photo: null,
      months: ['Janeiro', 'Fevereiro', 'Abril', 'Março', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }
  },
  computed: {
    ...mapState(['user'])
  },
  async mounted () {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        if (this.id !== 'new') {
          const post = await get(this.id)
          this.publishDate = post.publishDate,
          this.title = post.title,
          this.subTitle = post.subtitle
          this.text = post.text
          this.postUser = { name: post.user, photo: post.userPhoto }
          this.owner = this.user ? this.user.user === post.userId : false
          this.photo = post.photo
        } else {
          this.edit = true
          this.postUser = this.user
          this.publishDate = `${this.months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`
        }
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') this.errors = data.fields
        else this.errors = 'Internal error'
      }
      this.loading = false
    },
    async save () {
      this.loading = true
      try {
        if (this.id === 'new') {
          await create (
            this.publishDate,
            this.title,
            this.subTitle,
            this.text,
            this.imageFile,
          )
        } else {
          await update (
            this.id,          
            this.title,
            this.subTitle,
            this.text,
            this.imageFile
          )
        }
        this.$router.push('/')
      } catch (error) {
        const data = error.response ? error.response.data : {}
        if (data.error === 'Validation error') this.errors = data.fields
        else this.errors = 'Internal error'
      }
      this.loading = false
    },
    async cancel () {
      this.edit = false
      await this.getData()
    },
    async remove () {
      this.loading = true
      await remove(this.id)
      this.$router.push('/post')
      this.loading = false
    },
    changeImage () {
      if (this.edit) this.$refs.fileUpload.click()
    },
    uploadImage (file) {
      uploadImage(
        file,
        (image) => { this.photo = image },
        (imageFile) => { this.imageFile = imageFile },
        1280,
        720
      )
    }
  }
}
</script>
<style lang="scss" scoped>
  .image-upload {
    cursor: pointer;
  }
  .content {
    width: 100%;
  }
  .search-input {
    margin: 12px 0px !important;
    margin-bottom: 12px;
  }
  .card {
    width: 90%;
    max-width: initial !important;
    margin-bottom: 20px;

  }
  .disactivated { cursor: default; }
  .content {
    height: initial;
  }
</style>