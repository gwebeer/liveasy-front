import jwtDecode from "jwt-decode";

export const isAuthenticated = () => localStorage.getItem("AUTH_TOKEN") !== null;

export const getToken = () => {
    localStorage.getItem("AUTH_TOKEN")
}

export const decodeToken = () => {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN")

    if (AUTH_TOKEN) {
        return jwtDecode(AUTH_TOKEN)
    } else {
        alert("Usuário não autenticado!")
    }
}