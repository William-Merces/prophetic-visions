import { createStore } from 'vuex'

export default createStore({
  state: {
    availableChapters: [1]
  },
  getters: {
    isChapterAvailable: (state) => (chapterNum) => {
      return state.availableChapters.includes(Number(chapterNum))
    }
  },
  mutations: {
    completeChapter(state, chapterNum) {
      if (!state.availableChapters.includes(Number(chapterNum))) {
        state.availableChapters.push(Number(chapterNum))
      }

      // Se o próximo capítulo não estiver disponível, adicione-o
      if (!state.availableChapters.includes(Number(chapterNum) + 1)) {
        state.availableChapters.push(Number(chapterNum) + 1)
      }
    }
  },
  actions: {
    markChapterAsCompleted({ commit }, chapterNum) {
      commit('completeChapter', chapterNum)
    }
  }
})
