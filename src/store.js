import Vue from 'vue'
import Vuex from 'vuex'
import router from './routes'
Vue.use(Vuex);
const fbAuth = "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
const fbApiKey = 'AIzaSyDBP09uvdhYa_BAs2XhP_G93rwB2sKh3HY'

export default new Vuex.Store({
    state: {
        email:'',
        token:'',
        refresh:'',
        user:null,
        loginError: null,
        signUpError: null
    },
    getters: {
        isAuth(state){
            return state.token ? true : false
        }
    },
    mutations: {
        auth(state, authdata){
            state.email = authdata.email
            state.token = authdata.idToken
            state.refresh = authdata.refreshToken
            state.loginError = null
            router.push('/')
        },
        signOut(state){
            state.email =''
            state.token = ''
            state.refresh = ''

            localStorage.removeItem('token')
            localStorage.removeItem('refresh')
            router.push('/')
        },
        addUserInfo(state, userData){
            state.user = userData
        },
        loginError(state){
            state.loginError = 'Email and/or Password dose not match'
        },
        signUpError(state){
            state.signUpError = 'Email already exists'
        }
    },
    actions: {
        signUp({commit}, payload){
              Vue.http.post(`${fbAuth}/signupNewUser?key=${fbApiKey}`,{
                  ...payload,
                  returnSecureToken: true
              })
              .then(res=> res.json())
              .then(authData=>{
                  commit('auth', authData)
                  localStorage.setItem('token', authData.idToken)
                  localStorage.setItem('refresh', authData.refreshToken)
              })
              .catch(err=>{
                 commit('signUpError')
              })
        },
        signIn({commit}, payload){
            Vue.http.post(`${fbAuth}/verifyPassword?key=${fbApiKey}`,{
                ...payload,
                returnSecureToken: true
            })
            .then(res=>res.json())
            .then(authData=>{
                commit('auth', authData)
                localStorage.setItem('token', authData.idToken)
                localStorage.setItem('refresh', authData.refreshToken)

            })
            .catch(err=>{
                commit('loginError')
            })
        },
        signOut({commit}){
            commit('signOut')
        },
        refreshToken({commit}){
            const refreshtoken = localStorage.getItem('refresh')
            if(refreshtoken){
                Vue.http.post(`https://securetoken.googleapis.com/v1/token?key=${fbApiKey}`,{
                    grant_type: 'refresh_token',
                    refresh_token: refreshtoken
                })
                .then(res=>res.json())
                .then(authData=>{
                    commit('auth',{
                        idToken: authData.id_token,
                        refreshToken: authData.refresh_token
                    })

                    localStorage.setItem('token', authData.id_token)
                    localStorage.setItem('refresh', authData.refresh_token)
                })
                .catch(err=>{
                    console.log(err)
                })
            }

        },

        getUserInfo({commit}, payload){
            Vue.http.post(`${fbAuth}/getAccountInfo?key=${fbApiKey}`,{
                idToken:payload
            })
            .then(res=>res.json())
            .then(userData=>{
                // console.log(userData)
                commit('addUserInfo',userData.users[0])
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
  })