const initialState = {
    isVisible: false,
    text: "",
    color: "default",
    lifeTime: 0
}

export default function( state = initialState, action ) {
    if( action.type === "SHOW_MESSAGE" ) {
        return {
            isVisible: true,
            text: action.text,
            color: action.color,
            lifeTime: action.lifeTime
        }
    }

    if( action.type === "CLOSE_MESSAGE" ) {
        return initialState
    }

    return state;
}