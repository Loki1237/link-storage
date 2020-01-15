const initialState = {
    language: "eng",
    user: {
        id: null,
        name: null,
        login: null,
        show: "visible"
    }
};

export default function(state = initialState, action) {
    if (action.type === "SET_APP_DATA") {
        return { 
            language: action.lang || state.lang,
            user: action.user || state.user
        };
    }

    if (action.type === "EXIT") {
        return { ...initialState, language: state.language };
    }

    return state;
}
