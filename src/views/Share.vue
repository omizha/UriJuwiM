<template>
    <div>
        <uppernav></uppernav>
        <div v-if="anone === true">
            <div id="firebaseui-auth-container"></div>
        </div>
        <div v-else>
            <h1>{{ this.displayName }} 님! 반갑습니다!</h1>
                <div class="cameraInfoView" v-show="showit">
                    <div v-for="item in this.datas" :key="item.url">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <h2 class="cameraLocation">{{ item.Location }} {{ item.PhotoLocation }}</h2><br>
                                <p class="cameraData">{{ item.CameraModel + ' | ' + item.CaptureDate }}</p>
                            </div>
                            <el-image :src="item.url" class="CameraPicture" :preview-src-list="[item.url]"></el-image>
                            <p style="text-align: left">태그 : {{ item.Keyword }}</p>
                            <p style="text-align: left">{{ item.Content }}</p>
                        </el-card>
                    </div>
                    <el-button round style="background: #def5b8; color: #FFFFFF" v-on:click="writeSomething">글쓰기</el-button>
                </div>
            <el-button v-on:click='Logout'>로그아웃</el-button>
        </div>
        <div v-show="!showit">
            <el-form class="former"></el-form>
        </div>
    </div>
</template>

<script>
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import config from '@/assets/fireconfig.js'
import uppernav from '../components/UpperNav.vue'

firebase.initializeApp(config)
const auth = firebase.auth()
const db = firebase.firestore()
const ui = new firebaseui.auth.AuthUI(auth)

export default {
    data: function () {
        return {
            anone: true,
            uid: '',
            displayName: '',
            email: '',
            datas: [],
            showit: false
        }
    },
    components: {
        uppernav
    },
    methods: {
        initUI: function () {
            ui.start('#firebaseui-auth-container', {
                signInOptions: [{
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    authMethod: 'https://accounts.google.com',
                    clinetId: '891543392620-2dtara9nu8rubp9ggeoqp7jhq59a89tu.apps.googleusercontent.com'
                }],
                callbacks: {
                    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                        alert(`${authResult.user.displayName} login 성공!`)
                        return false
                    }
                }
            })
        },
        Loging: function () {
            let userRef = db.collection('data').doc('ManagePermission') // .where(this.anone, '==', true)
            let vaildUser = userRef.get()
                .then((snapshot) => {
                    return (snapshot.get(this.uid))
                })
                .catch((err) => {
                    console.log('Error getting documents', err)
                })
            if (vaildUser) {
                db.collection('data').get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            db.doc('data/' + doc.id).collection('timeline').get()
                                .then((snap) => {
                                    snap.forEach((docu) => {
                                        this.datas.push(docu.data())
                                    })
                                })
                        })
                        this.showit = true
                    })
                this.anone = false
            } else {
                alert('미인증된 유저입니다. 접근하실 수 없습니다.')
            }
        },
        Logout: function () {
            auth.signOut().then(() => {
                this.uid = ''
                this.displayName = ''
                this.email = ''
                this.anone = true
            }).catch(err => {
                alert(err)
                console.log(err)
            }).then(() => {
                window.location.reload()
            })
        },
        writeSomething: function () {
            this.showit = true
        }
    },
    computed: {
    },
    created () {
        require('../../node_modules/firebaseui/dist/firebaseui.js')
        require('../../node_modules/firebaseui/dist/firebaseui.css')
        auth.useDeviceLanguage()
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    },
    mounted () {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid
                this.displayName = user.displayName
                this.email = user.email
                this.Loging()
            } else {
                this.initUI()
            }
        })
    }
}
</script>

<style>
    .cameraInfoView {
        padding : 16px;
    }

    .former {
        min-height: 100px;
        width: 88%;
    }
</style>
