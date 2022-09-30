import { createStore } from 'vuex'
import request from '@/utils/api'

export default createStore({
  state: () => {
    return {
      articles: JSON.parse(sessionStorage.getItem('articles')) || []
    }
  },
  getters: {
  },
  mutations: {
    update (state, data) {
      state.articles.push(data)
      sessionStorage.setItem('articles', JSON.stringify(state.articles))
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
