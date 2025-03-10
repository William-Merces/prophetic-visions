import { createStore } from 'vuex'

export default createStore({
  state: {
    availableBooks: [
      { id: 'revelation', name: 'Apocalipse', available: true, totalChapters: 22 },
      { id: 'daniel', name: 'Daniel', available: false, totalChapters: 12 },
      { id: 'ezekiel', name: 'Ezequiel', available: false, totalChapters: 48 },
      { id: 'moses', name: 'Moisés', available: false, totalChapters: 8 },
      { id: 'nephi', name: 'Néfi', available: false, totalChapters: 5 },
      { id: 'abraham', name: 'Abraão', available: false, totalChapters: 5 }
    ],
    currentVision: null,
    isDescriptionOpen: false
  },

  getters: {
    getAvailableBooks: (state) => {
      return state.availableBooks
    },

    getBookById: (state) => (id) => {
      return state.availableBooks.find(book => book.id === id)
    },

    getCurrentVision: (state) => {
      return state.currentVision
    }
  },

  mutations: {
    SET_CURRENT_VISION(state, vision) {
      state.currentVision = vision
    },

    TOGGLE_DESCRIPTION(state, isOpen) {
      state.isDescriptionOpen = isOpen !== undefined ? isOpen : !state.isDescriptionOpen
    }
  },

  actions: {
    setCurrentVision({ commit }, vision) {
      commit('SET_CURRENT_VISION', vision)
    },

    toggleDescription({ commit }, isOpen) {
      commit('TOGGLE_DESCRIPTION', isOpen)
    }
  }
})
