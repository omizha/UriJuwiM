<template>
    <div>
        <uppernav></uppernav>
        <div v-if="anone === true">
            <div id="firebaseui-auth-container"></div>
        </div>
        <div v-else style="margin-bottom: 60px">
            <div class="btnLine">
                <el-button id="logoutID" v-on:click='Logout'>로그아웃</el-button>
                <el-button id="writing" round style="background: #def5b8; color: #FFFFFF" v-on:click="rotate" v-show="!showit">글쓰기</el-button>
            </div>
                <div class="cameraInfoView" v-show="!showit">
                    <div v-for="item in this.datas" :key="item.url">
                        <el-card class="box-card">
                            <div id="headline" slot="header" class="clearfix">
                                <p class="cameraLocation">{{ item.Location }} {{ item.PhotoLocation }}</p><br>
                                <p class="cameraData">{{ item.CameraModel + ' | ' + item.CaptureDate }}</p>
                            </div>
                            <el-image :src="item.url" class="CameraPicture" :preview-src-list="[item.url]"></el-image>
                            <p style="text-align: left">태그 : {{ item.Keyword }}</p>
                            <p style="text-align: left">{{ item.Content }}</p>
                        </el-card>
                    </div>
                </div>
        </div>
        <div v-show="showit" style="overflow-y: auto">
            <p style="text-align: left">내용</p>
            <el-input type="textarea" class="former" v-model="text"></el-input>
            <el-divider></el-divider>
            <p style="text-align: left">위치</p>
            <el-input v-model="location"></el-input>
            <p style="text-align: left">장소</p>
            <el-input v-model="area"></el-input>
            <p style="text-align: left">사진 업로드</p>
            <input type="file" @change="previewImage" accept="image/*">
            <div class="image-preview" v-if="this.imgbase.length > 0">
                <img class="preview" :src="this.imgbase">
            </div>
            <div style="margin-bottom: 75px">
                <el-button @click="writeSomething">저장</el-button>
                <el-button @click="rotate">취소</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebaseui from 'firebaseui'
import * as firebase from 'firebase/app'
import 'firebase/storage'
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
            showit: false,
            text: '',
            location: '',
            area: '',
            imgbase: ''
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
                    return snapshot.get(this.uid)
                })
                .catch((err) => {
                    console.log('Error getting documents', err)
                })
            if (vaildUser) {
                db.doc('data/' + this.uid).collection('timeline').get()
                    .then((snap) => {
                        if (snap.empty) {
                            console.log('no doc')
                        }
                        snap.forEach((doc) => {
                            this.datas.push(doc.data())
                        })
                    })
                    .catch((err) => {
                        console.error(err)
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
            if (!this.text) {
                alert('내용을 작성하십시오.')
                return
            }

            var storageRef = firebase.storage().ref()
            let imagename = (this.imgbase.substring(40, 80).split('/')[0]).substr(0, 10) + '.jpg'
            let addchild = storageRef.child(imagename)

            if (this.imgbase) {
                addchild.putString(this.imgbase, 'data_url').then((snap) => {
                    addchild.getDownloadURL().then((urli) => {
                        let adder = {
                            Address: '경기도 봉황시 천리마마트',
                            CameraModel: 'Phone',
                            CaptureDate: new Date().toLocaleTimeString(),
                            Content: this.text,
                            Keyword: '야옹, 왈왈, 그르렁',
                            Location: this.location,
                            PhotoLocation: this.area,
                            url: urli
                        }
                        db.collection('data').doc(this.uid).collection('timeline').add(adder).then(() => {
                            this.datas.push(adder)
                            this.rotate()
                        })
                    })
                })
            } else {

            }
        },
        rotate: function () {
            this.showit = !this.showit
        },
        previewImage: function (event) {
            // Reference to the DOM input element
            var input = event.target
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader()
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imgbase = e.target.result
                    // console.log(this.imgbase)
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0])
            }
        }
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
        width: 88%;
    }
    .preview {
        max-width: 300px;
    }

    .btnLine {
        display : inline-block
    }

    #logoutID {
        margin-top:30px;
        margin-right:60px;
        margin-bottom:20px;
    }

    #headline > p {
        display: inline;
    }

    #headline > p:nth-child(1) {
        font-size : 32px;
        font-weight: bold;
    }

    #headline > p:nth-child(3) {
        font-size : 14px;
    }

</style>
