<template>
  <section class="container d-flex justify-center">
    <div class="content" v-if="loaded && mode && !loading">
      <v-row>
        <v-col>
          <v-card >
            <v-card-text>
              <v-form class="d-flex justify-center">
                <div>
                  <v-row>
                    <v-col class="d-flex align-center" v-if="mode === 'view' || mode === 'register'">
                      <div @click="changeImage" class="image-upload">
                        <img v-if="photo" :src="photo"/>
                        <input ref="fileUpload" type="file" accept="image/jpeg" @change="uploadImage($event.target.files[0])">
                      </div>
                    </v-col>
                    <v-col class="d-flex align-end flex-column">
                      <v-text-field
                        label="Email"
                        name="login"
                        type="text"
                        v-model="login"
                        :readonly="loading"
                        :error-messages="errors.indexOf('login') > - 1 ?
                          ['Insira um login'] : errors.indexOf('exists') > - 1 ? ['Usuário existente'] : []"
                        :error="errors === 'invalidCredentials'"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        label="Senha"
                        name="password"
                        type="password"
                        v-model="password"
                        :readonly="loading"
                        :error-messages="errors.indexOf('password') > - 1 ?
                          ['Insira uma senha'] : []"
                        :error="errors === 'invalidCredentials'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-input
                    :error-messages="errors === 'invalidCredentials' ? 
                      ['Login ou senha não conhecidem'] : errors === 'Internal error' ? 'Ocorreu um erro interno' : ''"
                  ></v-input>
                  <v-row v-if="mode === 'view' || mode === 'register'">
                    <v-col>
                      <v-text-field
                        label="Nome"
                        name="name"
                        type="text"
                        v-model="name"
                        :readonly="loading"
                        :error-messages="errors.indexOf('name') > - 1 ? 
                          ['Insira um nome'] : []"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Sobrenome"
                        name="fullname"
                        type="text"
                        v-model="fullName"
                        :readonly="loading"
                        :error-messages="errors.indexOf('fullName') > - 1 ? 
                          ['Insira um sobrenome'] : []"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="mode === 'view' || mode === 'register'">
                    <v-col>
                      <v-text-field
                        label="CPF"
                        name="login"
                        type="text"
                        v-mask="'###.###.###-##'"
                        v-model="registerNumber"
                        :readonly="loading"
                        :error-messages="errors.indexOf('registerNumber') > - 1 ? 
                          ['CPF inválido'] : []"
                      ></v-text-field>
                      <v-input
                        :error-messages="errors === 'Internal error' ? 
                          'Ocorreu um erro interno' : '' "
                      ></v-input>
                    </v-col>
                  </v-row>                    
                </div>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" outlined color="secondary" @click="cancel">
                {{
                  mode === 'view' ? 
                    'Cancelar' : mode === 'login' ?
                    'Cadastrar-se' : 'voltar'
                }}
              </v-btn>
              <v-btn :loading="loading" @click="save" color="rgb(57,192,184)">
                {{ 
                  mode === 'view' ?
                    'Alterar' : mode === 'register' ?
                    'Confirmar' : 'Entrar'
                }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="!loading">
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-form class="d-flex justify-center">
                <div>
                  <v-row>
                    <v-col class="d-flex align-center">
                      <div @click="changeImage" class="image-upload">
                        <img v-if="photo" :src="photo"/>
                        <input ref="fileUpload" type="file" accept="image/jpeg" @change="uploadImage($event.target.files[0])">
                      </div>
                    </v-col>
                    <v-col class="d-flex align-end flex-column">
                      <v-text-field
                        label="Email"
                        name="login"
                        type="text"
                        v-model="login"
                        :readonly="loading"
                        :error-messages="errors.indexOf('login') > - 1 ?
                          ['Insira um login'] : errors.indexOf('exists') > - 1 ? ['Usuário existente'] : []"
                        :error="errors === 'invalidCredentials'"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        label="Senha"
                        name="password"
                        type="password"
                        v-model="password"
                        :readonly="loading"
                        :error-messages="errors.indexOf('password') > - 1 ?
                          ['Insira uma senha'] : []"
                        :error="errors === 'invalidCredentials'"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Nome"
                        name="name"
                        type="text"
                        v-model="name"
                        :readonly="loading"
                        :error-messages="errors.indexOf('name') > - 1 ? 
                          ['Insira um nome'] : []"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Sobrenome"
                        name="fullname"
                        type="text"
                        v-model="fullName"
                        :readonly="loading"
                        :error-messages="errors.indexOf('fullName') > - 1 ? 
                          ['Insira um sobrenome'] : []"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="CPF"
                        name="login"
                        type="text"
                        v-mask="'###.###.###-##'"
                        v-model="registerNumber"
                        :readonly="loading"
                        :error-messages="errors.indexOf('registerNumber') > - 1 ? 
                          ['CPF inválido'] : []"
                      ></v-text-field>
                      <v-input
                        :error-messages="errors === 'Internal error' ? 
                          'Ocorreu um erro interno' : '' "
                      ></v-input>
                    </v-col>
                  </v-row>                    
                </div>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn :disabled="loading" outlined color="secondary" @click="remove">
                Remover
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" outlined color="secondary" @click="cancel">
                Cancelar
              </v-btn>
              <v-btn :loading="loading" @click="save" color="rgb(57,192,184)">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-skeleton-loader
      v-if="loading"
      class="mx-auto"
      width="400"
      height="768"
      loading
      type="list-item-avatar-three-line, article, actions"
    >
    </v-skeleton-loader>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { uploadImage } from '../tools'
import { get, create, update, remove } from '../api/user'
import { signIn } from '../api/auth'
  export default {
    props: ['id', 'mode'],
    data () {
      return {
        login: null,
        password: null,
        name: null,
        fullName: null,
        registerNumber: null,
        loading: true,
        photo: null,
        imageFile: null,
        errors: []
      }
    },
    computed: {
      ...mapState(['user', 'loaded'])
    },
    async mounted () {
      await this.getData()
    },
    methods: {
      async getData () {
        this.loading = true
        if (this.mode === 'view') {
          const data = await get(this.user.user)
          this.login = data.userLogin
          this.name = data.name
          this.fullName = data.fullName
          this.photo = data.photo
          this.registerNumber = data.registerNumber
        }
        if (this.id !== undefined) {
          const data = await get(this.id)
          this.login = data.userLogin
          this.name = data.name
          this.fullName = data.fullName
          this.photo = data.photo
          this.registerNumber = data.registerNumber
        }
        this.loading = false
      },
      async save () {
        try {
          this.errors = []
          this.loading = true
          if (this.mode === 'view' || this.id !== undefined) {
            await update(
              this.mode ? this.user.id : this.id,
              this.name,
              this.fullName,
              this.registerNumber,
              'user',
              this.imageFile,
              true,
              this.login,
              this.password
            )
            this.$store.dispatch('update')
          }
  
          if (this.mode === 'register') {
            await create(
              this.name,
              this.fullName,
              this.registerNumber,
              'user',
              this.imageFile,
              true,
              this.login,
              this.password
            )
            const data = await signIn(this.login, this.password)
            this.$store.dispatch('signIn', data)
          } 
  
          if (this.mode === 'login') {
            const data = await signIn(this.login, this.password)
            this.$store.dispatch('signIn', data)
          }
  
          this.loading = false
          if (this.id !== undefined) this.$router.push('/user')
          else this.$router.push('/')
          this.$forceUpdate()
        } catch (error) {
          const data = error.response ? error.response.data : {}
          if (data.error === 'Validation error') this.errors = data.fields
          else if (data.error === 'User already exists') this.errors = ['exists']
          else this.errors = 'Internal error'
        }
        this.loading = false
      },
      async cancel () {
        if (this.mode === 'login') this.$router.push('/me/register')
        else if (this.id !== undefined) this.$router.push('/user')
        else this.$router.push('/')
      },
      async remove () {
        await remove(this.id)
        this.$router.push('/user/')
      },
      changeImage () {
        this.$refs.fileUpload.click()
      },
      uploadImage (file) {
        uploadImage(
          file,
          (image) => { this.photo = image },
          (imageFile) => { this.imageFile = imageFile },
          500,
          500
        )
      }
    }
  }
</script>
<style lang="scss" scoped>
  .image-upload {
    background: linear-gradient(90deg, rgba(57,192,184,1) 0%, rgba(123,209,108,1) 100%);
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
    cursor: pointer;

    &.edit {
      .image-edit {
        display: flex;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 100%;
      }
    }

    .image-edit {
      display: none;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
      svg {
        color: rgba(255, 255, 255, 0.8);
        width: 80px;
        height: 80px;
      }
    }
    img {
      background-color: #fff;
      border-radius: 50%;
      object-fit: cover;
      width: 90px;
      height: 90px;
      margin: 5px;
    }

    path {
      transform: scale(0.5);
      transform-origin: center center;
    }
    input {
      display: none;
    }
  }
</style>