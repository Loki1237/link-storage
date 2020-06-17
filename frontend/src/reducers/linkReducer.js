const initialState = {
    isFetching: false,
    error: "",
    links: [],
    show: "all"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "LINKS_SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }

        case "LINKS_SET_ERROR":
            return {
                ...state,
                error: action.error
            }

        case "LINKS_SET_LINK_LIST":
            return {
                ...state,
                links: action.payload
            };

        case "LINKS_SET_SHOW":
            return {
                ...state,
                show: action.show
            };

        case "LINKS_RESET_STATE":
            return initialState;
    }

    return state;
}
