const initialState = ""

const filterReducer = (state = initialState, action) => {
    console.log("filter reducer called")
    switch(action.type){
        case 'UPDATE_FILTER':
            return action.data
        default:
            return state
    }
}

// Action creator: new notification
export const newFilter = (filter) => {
    return {type: 'UPDATE_FILTER', data: filter}
}

export default filterReducer

