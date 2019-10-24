import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
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
        getFire: function (state) {
            return state.fire
        },
        getFireui: function (state) {
            return state.fireui
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
        }
    },
    modules: {
    }
})
