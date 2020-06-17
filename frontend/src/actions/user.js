export const changePassword = (oldPassword, newPassword) => {
    return async () => {
        const response = await fetch('/api/users/password', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });

        if (!response.ok) {
            const text = await response.text();
            return Promise.reject(text);
        }
    };
};

export const changePIN = (password, newPIN) => {
    return async () => {
        const response = await fetch('/api/users/PIN', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({ password, newPIN })
        });

        if (!response.ok) {
            const text = await response.text();
            return Promise.reject(text);
        }
    };
};

export const deleteUser = () => {
    return async () => {
        const response = await fetch('/api/users', { method: "DELETE" });

        if (!response.ok) {
            const text = await response.text();
            return Promise.reject(text);
        }
    };
};
