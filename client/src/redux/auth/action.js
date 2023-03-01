import { REGISTER_REQUEST, LOGIN_REQUEST, LOG_OUT_REQUEST } from "./types"

export const register = (query) => {
    return { type: REGISTER_REQUEST, query }
};

export const login = (query) => {
    return { type: LOGIN_REQUEST, query }
};

export const logout = () => {
    return { type: LOG_OUT_REQUEST }
}

