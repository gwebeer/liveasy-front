import { Modal } from 'bootstrap';
import api from './config/api';

export async function InvalidAlert(title, description) {
    var modalElement = document.getElementById("custom-alert")

    document.getElementById('customAlert-title').textContent = title
    document.getElementById('customAlert-title').style.color = "rgb(219, 0, 0)"
    document.getElementById('customAlert-description').textContent = description

    var bsModal = new Modal(modalElement)
    bsModal.toggle()
}

export async function SuccessAlert(title, description) {
    var modalElement = document.getElementById("custom-alert")

    document.getElementById('customAlert-title').textContent = title
    document.getElementById('customAlert-title').style.color = "rgb(15, 141, 4)"
    document.getElementById('customAlert-description').textContent = description

    var bsModal = new Modal(modalElement)
    bsModal.toggle()
}

export async function RegisterEmail(email) {
    let emailCadastrado = await api.get('auth/email/' + email)
    return emailCadastrado.status
}