const user = {
    state: {
        user_id: '',
    },

    mutations: {
        SET_USER_ID: (state, user) => {
            state.user_id = user.id
        },
    },

    actions: {

    }
}

export default user
