const initialState = null

// Used to reset the timeout of previous notificaiton
let previousTimeoutID = null;

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
        clearTimeout(previousTimeoutID) // Clears the previous timeout in case its still ongoing
        await dispatch({type: 'NEW_NOTIFICATION', data: notification})
        // Timeout ID is stored after every notification change
        previousTimeoutID = setTimeout(function(){
            dispatch({type: 'NEW_NOTIFICATION', data: null})
        }, time);
    }
}

export default anecdoteReducer

