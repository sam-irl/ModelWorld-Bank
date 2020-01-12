import api from '@/api'

const ui = {
  namespaced: true,
  state: {
    typeAhead: {
      accounts: []
    },
    currencies: {
      GBP: {
        _id: 'GBP',
        symbol: '£',
        name: 'Great British Pound'
      },
      USD: {
        _id: 'USD',
        symbol: '$',
        name: 'US Dollar'
      }
    }
  },
  actions: {
    fetchTypeAhead: ({ commit, dispatch }) => {
      api.request({
        url: '/v1/accounts/?typeahead',
        method: 'get'
      }).then(res => {
        commit('setTypeAhead', { type: 'accounts', content: res.data })
      }).catch(err => { dispatch('messages/handleError', { err }, { root: true }) })
    }
  },
  mutations: {
    setTypeAhead: (state, { type, content }) => {
      state.typeAhead[type] = content
    }
  },
  getters: {
    accountsById (state) {
      return state.typeAhead.accounts.reduce((accountsById, account) => ({
        ...accountsById,
        [account._id]: account
      }), {})
    },
    getAccount (state, getters) {
      return (id) => getters.accountsById[id]
    }
  }
}

export default ui