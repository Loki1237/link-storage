const initialState = {
    id: null,
    name: null,
    login: null,
    password: null,
    PINcode: null
}

export default function( state = initialState, action ) {
    if( action.type === "AUTHORIZATION" ) {
        return action.data
    }

    if( action.type === "EXIT" ) {
        return initialState
    }

    return state;
}