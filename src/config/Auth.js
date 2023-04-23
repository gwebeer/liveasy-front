import jwtDecode from "jwt-decode";

export const isAuthenticated = () => localStorage.getItem("AUTH_TOKEN") !== null;

export const getToken = () => {
    localStorage.getItem("AUTH_TOKEN")
}

export const saveToken = (token) => {
    const decodedToken = jwtDecode(token)

    if (token) {
        localStorage.setItem("token", token)
        localStorage.setItem("userId", decodedToken.id)
        localStorage.setItem("userType", decodedToken.type)
    } else {
        console.log("Token não encontrado. O usuário não está autenticado.")
    }
}