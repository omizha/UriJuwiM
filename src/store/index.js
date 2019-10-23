import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        addressString: '',
        w3w: '',
        geo: { lat: 37.449891, lng: 126.786562 },
        mapobj: undefined
    },
    getters: {
        getAddress: function (state) {
            return state.addressString
        },
        getGeo: function (state) {
            return state.geo
        },
        getw3w: function (state) {
            return state.w3w
        },
        getKakao: function (state) {
            return state.mapobj
        }
    },
    mutations: {
        setAddress: function (state, _address) {
            state.addressString = _address
        },
        setGeo: function (state, payload) {
            state.geo = { lat: payload.lat, lng: payload.lng }
        },
        setw3w: function (state, words) {
            state.w3w = words
        },
        setKakao: function (state, payload) {
            state.mapobj = payload
        }
    },
    actions: {
        updateLocation (context, payload) {
            context.commit('setAddress', payload.address)
        },
        updateGeo (context, payload) {
            context.commit('setGeo', payload)
        },
        updatew3w (context, payload) {
            context.commit('setw3w', payload.word)
        },
        takeKakaoMap (context, payload) {
            context.commit('setKakao', payload)
        }
    },
    modules: {
    }
})
