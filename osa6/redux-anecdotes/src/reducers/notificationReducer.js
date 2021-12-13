const initialState = null

const anecdoteReducer = (state = initialState, action) => {
    switch(action.type){
        case 'NEW_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

// Action creator: new notification
export const newNotification= (notification) => {
    return {type: 'NEW_NOTIFICATION', data: notification}
}

export default anecdoteReducer

