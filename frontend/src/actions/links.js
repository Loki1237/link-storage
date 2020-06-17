export const setIsFetching = (value) => ({
    type: "LINKS_SET_IS_FETCHING",
    isFetching: value
});

export const setError = (value) => ({
    type: "LINKS_SET_ERROR",
    error: value
});

export const setLinkList = (links) => ({
    type: "LINKS_SET_LINK_LIST",
    payload: links
});

export const setShow = (show) => ({
    type: "LINKS_SET_SHOW",
    show
});

export const resetState = () => ({
    type: "LINKS_RESET_STATE"
});

const getLinks = async () => {
    const response = await fetch('/api/links');

    if (!response.ok) {
        throw Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
};

export const updateLinkList = () => {
    return async (dispatch) => {
        dispatch(setIsFetching(true));

        try {
            const response = await getLinks();

            dispatch(setIsFetching(false));
            dispatch(setLinkList(response.links));
            dispatch(setShow(response.show));
        } catch (err) {
            dispatch(setError(err.message));
        }
    };
};

export const createLink = (name, URL, isVisible) => {
    return async (dispatch) => {
        const response = await fetch('/api/links', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ name, URL, isVisible })
        });

        if (response.ok) {
            const response = await getLinks();

            dispatch(setLinkList(response.links));
            dispatch(setShow(response.show));
        } else {
            return Promise.reject(response.statusText);
        }
    };
};

export const changeLink = (id, name, URL, isVisible) => {
    return async (dispatch) => {
        const response = await fetch(`/api/links/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ name, URL, isVisible })
        });

        if (response.ok) {
            const response = await getLinks();

            dispatch(setLinkList(response.links));
            dispatch(setShow(response.show));
        } else {
            return Promise.reject(response.statusText);
        }
    };
};

export const deleteLink = (id) => {
    return async (dispatch) => {
        const response = await fetch(`/api/links/${id}`, { method: "DELETE" });

        if (response.ok) {
            const response = await getLinks();

            dispatch(setLinkList(response.links));
            dispatch(setShow(response.show));
        } else {
            return Promise.reject(response.statusText);
        }
    };
};

export const showHidden = (PIN) => {
    return async (dispatch) => {
        const response = await fetch('/api/users/show_hidden', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ PIN })
        });

        if (response.ok) {
            const response = await getLinks();

            dispatch(setLinkList(response.links));
            dispatch(setShow(response.show));
        } else {
            const text = await response.text();
            return Promise.reject(text || response.statusText);
        }
    };
};
