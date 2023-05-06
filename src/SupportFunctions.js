import { Modal } from 'bootstrap';

export async function InvalidAlert(title, description) {
    var modalElement = document.getElementById("custom-alert")

    document.getElementById('customAlert-title').textContent = title
    document.getElementById('customAlert-description').textContent = description

    var bsModal = new Modal(modalElement)
    bsModal.toggle()
}