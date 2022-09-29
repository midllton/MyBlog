import { createStore } from 'vuex'
import request from '@/utils/api'

export default createStore({
  state () {
    return {
      articles: []
    }
  },
  getters: {
    getArticle () {

    }
  },
  mutations: {
    update (state, data) {
      state.articles.push(data)
    }
  },
  actions: {
    async getArticle (ctx) {
      for (let i = 1; i <= 10; i++) {
        const data = await request('getArticle/' + i, 'get')
        ctx.commit('update', data)
      }
    }
  },
  modules: {
  }
})
