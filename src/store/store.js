import Vue from "vue/dist/vue.esm";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store(
  {
    plugins: [
      createPersistedState()
      // ({
      //    storage: {
      //      paths: ['user','password', 'authorized'],
      //      getItem: (key) => Cookies.getJSON(key),
      //      setItem: (key, state) => Cookies.set(key, state, {expires: 3, secure: true}),
      //      removeItem: key => Cookies.remove(key)
      //    }
      //  })
    ],
    state: {
      user: {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password")
      },
      authorized: localStorage.getItem("authorized")
    },

    // plugins: [
    //   createPersistedState(
    //     {
    //       storage: {
    //         paths: ['user', 'authorized'],
    //         getItem: (key) => Cookies.getJSON(key),
    //         setItem: (key, state) => Cookies.set(key, state, {expires: 3, secure: true})
    //       }
    //     })
    // ],
    mutations: {
      SET_USERNAME(state, name) {
        state.user.username = name;
      },
      CLEAR_USERNAME(state) {
        state.user.username = '';
      },
      SET_PASSWORD(state, password) {
        state.user.password = password;
      },
      CLEAR_PASSWORD(state) {
        state.user.password = '';
      },
      SET_AUTHORIZED(state, status) {
        state.authorized = status;
      },
      CLEAR_AUTHORIZED(state) {
        state.authorized = 'false';
      }
    },
    actions: {
      setUsername({commit}, name) {
        commit('SET_USERNAME', name);
        return new Promise(resolve => {
          setTimeout(() => {
            localStorage.setItem("username", name);
            commit('SET_USERNAME', name);
            // resolve();
          }, 1000);
        });
      },
      clearUsername({commit}) {
        commit('CLEAR_USERNAME');
      },
      setPassword({commit}, password) {
        commit('SET_PASSWORD', password);
        setTimeout(() => {
          localStorage.setItem("password", password);
          commit('SET_PASSWORD', password);
          // resolve();
        }, 1000);
      },
      clearPassword({commit}) {
        commit('CLEAR_PASSWORD');
      },
      setAuthorized({commit}, status) {
        commit('SET_AUTHORIZED', status);
        setTimeout(() => {
          localStorage.setItem("authorized", status);
          commit('SET_AUTHORIZED', status);
          // resolve();
        }, 1000);
      },
      clearAuthorized({commit}) {
        commit('CLEAR_AUTHORIZED');
      }
    },
    getters: {
      username: state => state.user.username,
      password: state => state.user.password,
      authorized: state => state.authorized,
      user: state => state.user
    }
  }
);
