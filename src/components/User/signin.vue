<template>
    <div class="container">
       <div class="content sign">
          
          <form @submit.prevent="onSubmit">
            <h1>Sign in</h1>
           

              <div class="input_field">
                  <label>Email</label>
                  <input type="text" v-model="formdata.email"/>
              </div>

              <div class="error" v-if="email_error">
                  {{ email_error }}
              </div>

              <div class="input_field">
                  <label>Password</label>
                  <input type="password" v-model="formdata.password" />
              </div>
              <div class="error" v-if="password_error">
                  {{ password_error }}
              </div>
              <div class="error" v-if="loginError">
                  {{ loginError }}
              </div>
              <button>
                  Sign in
              </button>

          </form>

        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                formdata:{
                    email: '',
                    password: ''
                },
                email_error: '',
                password_error:''
            }
        },
        computed:{
          loginError(){
              return this.$store.state.loginError
          }
        },
        methods: {
            onSubmit () {
                if(this.validForm()){
                    this.$store.dispatch('signIn', this.formdata)

                    this.email = ''
                    this.password = ''
                }
            },
            validForm(){
                let error = true

                this.email_error = ''
                this.password_error = ''
                if(this.formdata.email == ''){
                    this.email_error = 'Email cannot be empty'
                    error = false
                }
                if(!/\S+@\S+\.\S+/.test(this.formdata.email)){
                    this.email_error = 'Please enter a valid email address'
                    error = false
                }
                if(this.formdata.password == ''){
                    this.password_error = 'Password cannot by empty'
                    error=  false
                }
                return error
            }
        }
    }
</script>
