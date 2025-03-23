// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    availableBooks: [
      { id: 'apocalypse', name: 'Apocalipse', available: true, totalChapters: 22 }
    ]
  },

  getters: {
    getAvailableBooks: (state) => {
      return state.availableBooks
    },

    getBookById: (state) => (id) => {
      return state.availableBooks.find(book => book.id === id)
    }
  }
})
