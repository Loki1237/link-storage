const setIsAuthorized = (value) => ({
    type: "USER_SET_IS_AUTHORIZED",
    isAuthorized: value
});

export const signIn = (login, password) => {
    return async (dispatch) => {
        const response = await fetch('/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ login, password })
        });

        if (response.ok) {
            dispatch(setIsAuthorized(true));
        } else {
            const text = await response.text();
            return Promise.reject(text || response.statusText);
        }
    };
};

export const loginAs = () => {
    return async (dispatch) => {
        const response = await fetch('/api/auth/login-as', { method: "POST" });

        if (response.ok) {
            dispatch(setIsAuthorized(true));
        } else {
            const text = await response.text();
            return Promise.reject(text || response.statusText);
        }
    };
};

export const signUp = (name, login, password, PIN) => {
    return async () => {
        const response = await fetch('/api/auth/sign-up', {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ name, login, password, PIN })
        });

        if (!response.ok) {
            const text = await response.text();
            return Promise.reject(text || response.statusText);
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        const response = await fetch('/api/auth/logout', { method: "HEAD" });

        if (response.ok) {
            dispatch(setIsAuthorized(false));
        } else {
            return Promise.reject(response.statusText);
        }
    };
};
