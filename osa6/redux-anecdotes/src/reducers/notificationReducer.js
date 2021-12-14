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
export const newNotification= (notification, time) => {
    return async dispatch => {
        await dispatch({type: 'NEW_NOTIFICATION', data: notification})
        setTimeout(function(){
            dispatch({type: 'NEW_NOTIFICATION', data: null})
        }, time);
    }
}

export default anecdoteReducer

