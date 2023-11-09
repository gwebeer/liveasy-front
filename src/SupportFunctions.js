import { Modal } from 'bootstrap';
import moment from 'moment/moment';
import api from './config/api';

// Gera alerta de Falha
export async function InvalidAlert(title, description) {
    var modalElement = document.getElementById("custom-alert")

    document.getElementById('customAlert-title').textContent = title
    document.getElementById('customAlert-title').style.color = "rgb(219, 0, 0)"
    document.getElementById('customAlert-description').textContent = description

    var bsModal = new Modal(modalElement)
    bsModal.toggle()
}

// Gera alerta de Sucesso
export async function SuccessAlert(title, description) {
    var modalElement = document.getElementById("custom-alert")

    document.getElementById('customAlert-title').textContent = title
    document.getElementById('customAlert-title').style.color = "rgb(15, 141, 4)"
    document.getElementById('customAlert-description').textContent = description

    var bsModal = new Modal(modalElement)
    bsModal.toggle()
}

// Verifica se o e-mail está cadastrado
export async function RegisterEmail(email) {
    let emailCadastrado = await api.get('auth/email/' + email)
    return emailCadastrado.status
}

// Valida os campos de formulário de cadastro
export async function RegisterFieldValidation(infos, emailValidate = true) {

    // Verifica se o campo de nome foi preenchido
    if (infos.name === "") {
        // document.getElementById("name").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "É obrigatório informar seu nome.")
        return false
    }
    // Verifica se o campo de email foi preenchimento
    if (infos.email === "") {
        // document.getElementById("signup-email").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "É obrigatório informar seu email.")
        return false
    }
    // Verifica se o campo de data de nascimento foi preenchimento
    if (infos.birthDate === "") {
        // document.getElementById("birthDate").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "É obrigatório informar sua data de nascimento.")
        return false
    }
    // Verifica se o campo de telefone foi preenchimento
    if (infos.phone === "") {
        // document.getElementById("phone").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "É obrigatório informar seu telefone.")
        return false
    }

    // Valida se o nome contém ao menos 3 caracteres
    if (infos.name.length < 3) {
        // document.getElementById("name").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "Este nome é muito curto.")
        return false
    } else {
        // document.getElementById("name").classList.remove('invalid')
    }

    // Verifica se o email é válido
    if (infos.email.indexOf('@') == -1 || infos.email.indexOf('.') == -1) {
        // document.getElementById("signup-email").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "Insira um e-mail válido.")
        return false
    } else {
        // document.getElementById("signup-email").classList.remove('invalid')
    }

    // Verifica se é uma data de nascimento futura
    if (moment(infos.birthDate) > moment()) {
        // document.getElementById("birthDate").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "Você não pode inserir uma data de nascimento futura.")
        return false
    } else {
        // document.getElementById("birthDate").classList.remove('invalid')
    }

    // Verifica se usuário é maior de 16 anos
    let minBirthDate = moment().subtract(16, 'years')
    if (moment(infos.birthDate) > minBirthDate) {
        // document.getElementById("birthDate").classList.add('invalid')
        InvalidAlert("Cadastro não concluído!", "Sinto muito! Você precisa ter 16 anos para utilizar a LivEasy.")
        return false
    } else {
        // document.getElementById("birthDate").classList.remove('invalid')
    }

    // Verifica se o número de telefone é válido
    if (infos.phone.length > 11 || infos.phone.length < 10) {
        // document.getElementById("phone").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "O formato do telefone inserido é inválido. Ex: DDD + Número.")
        return false
    } else {
        // document.getElementById("phone").classList.remove('invalid')
    }

    if (!emailValidate) {
        document.getElementById("signup-email").classList.remove('invalid')
        return true
    }

    // Verifica se o e-mail já está cadastrado
    let emailCadastrado = await api.post('user/validate-email', { email: infos.email })
        .then(res => {
            if (res.status == 200) {
                InvalidAlert("Erro no Cadastro!", res.data.msg)
                document.getElementById("signup-email").classList.add('invalid')
                return false
            }
        })
        .catch(err => {
            if (err.response.status == 404) {
                document.getElementById("signup-email").classList.remove('invalid')
                return true
            } else {
                InvalidAlert("Erro no Cadastro!", "Ocorreu um erro desconhecido!")
                document.getElementById("signup-email").classList.add('invalid')
            }
        })

    if (!emailCadastrado) {
        return false
    } else {
        return true
    }

}

// Valida os campos de formulário de cadastro
export async function selectStep(step) {
    // Mantém no array apenas os passos não selecionados
    let steps = ['primeira-casa', 'nova-casa', 'ja-mudei']
    steps.splice(steps.indexOf(step), 1)

    // Adiciona classe de formato selecionado no card selecionado
    document.getElementById(step).classList.add('selected-step')

    // Remove classe de formato selecionado dos demais cards
    steps.forEach((element) => {
        document.getElementById(element).classList.remove('selected-step')
    })

    // Seleciona a descrição da etapa selecionada
    let description = ""
    switch (step) {
        case "primeira-casa":
            description = "Está etapa é para você que deseja sair de casa e morar sozinho. Vamos entender e nos planejar junto para facilitar esse passo tão importante."
            break;
        case "nova-casa":
            description = "Para você que precisa se mudar, mas já mora sozinho. Por aqui vamos te ajudar a se organizar para tornar a mudança mais fácil."
            break;
        case "ja-mudei":
            description = "Esta etapa é pensada para você que já se mudou, mas precisa de ajuda para se organizar financeiramente e fazer a gestão de seu novo lar."
            break;
    }

    return {
        'step': step,
        'description': description
    }
}


// Valida se a senha atende todos os requisitos
export async function passwordValidation(password) {
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let specialCaracters = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "[", "]", "~", ">", "<", ".", ",", ":", "/", "+", "-", "'", '"', "|", "?"]
    let status = {
        length: false,
        number: false,
        special: false
    }

    // Verifica se a senha contém no mínimo 8 caracteres
    if (password.length >= 8) {
        document.getElementById("length").classList.add("success")
        document.getElementById("length-check").classList.remove("hide")
        status.length = true
    } else {
        document.getElementById("length").classList.remove("success")
        document.getElementById("length-check").classList.add("hide")
        status.length = false
    }

    // Verifica se a senha contém um caracter numérico
    let statusNumber = false
    for (let i = 0; i < password.length; i++) {
        if (numbers.includes(password[i])) {
            statusNumber = true
        }
    }
    if (statusNumber) {
        document.getElementById("number").classList.add("success")
        document.getElementById("number-check").classList.remove("hide")
        status.number = true
    } else {
        document.getElementById("number").classList.remove("success")
        document.getElementById("number-check").classList.add("hide")
        status.number = false
    }

    // Verifica se a senha contém um caracter especial
    let statusSpecial = false
    for (let i = 0; i < password.length; i++) {
        if (specialCaracters.includes(password[i])) {
            statusSpecial = true
        }
    }
    if (statusSpecial) {
        document.getElementById("special").classList.add("success")
        document.getElementById("special-check").classList.remove("hide")
        status.special = true
    } else {
        document.getElementById("special").classList.remove("success")
        document.getElementById("special-check").classList.add("hide")
        status.special = false
    }

    if (status.length && status.number && status.special) {
        return true
    } else {
        return false
    }
}

// Valida os campos de formulário de cadastro
export async function movingInformation(info) {
    // Verifica se o campo de renda mensal foi preenchido
    if (info.income === "") {
        InvalidAlert("Campo Inválido!", "O campo de renda mensal está em branco.")
        return false
    }
    // Verifica se o botão de orçamento especial foi selecionado
    if (info.movingBudget === "") {
        InvalidAlert("Campo Inválido!", "É necessário informar se você tem um orçamento especial para mudança.")
        return false
    }
    // Verifica se o campo de data da mudança foi preenchido
    if (info.movingDate === "") {
        InvalidAlert("Campo Inválido!", "Você não informou uma data de previsão para mudança.")
        return false
    }
    // Se tiver orçamento especial, verifica se foi informado um valor
    if (info.movingBudget === true && info.movingBudgetValue === "") {
        InvalidAlert("Campo Inválido!", "Você não informou seu orçamento de mudança.")
        return false
    }
    // Verifica se é uma data de nascimento futura
    if (moment(info.movingDate) < moment()) {
        // document.getElementById("birthDate").classList.add('invalid')
        InvalidAlert("Campo Inválido!", "Você não pode inserir uma data de mudança no passado.")
        return false
    }
    return true
}

export async function addClass(finder, className, idMethod = false) {

    if (idMethod) {
        let elements = document.getElementById(finder).classList.add(className)
    }
    if (!idMethod) {
        let elements = document.getElementsByClassName(finder);
        Object.values(elements).forEach((element) => {
            element.classList.add(className)
        })
    }
}
export async function removeClass(finder, className, idMethod = false) {

    if (idMethod) {
        let elements = document.getElementById(finder).classList.remove(className)
    }
    if (!idMethod) {
        let elements = document.getElementsByClassName(finder);
        Object.values(elements).forEach((element) => {
            element.classList.remove(className)
        })
    }
}


export async function getUserInfo(userId) {
    const find = await api.get('/user/' + userId)
        .then(res => {
            if (res.status == 200) {
                return res.data
            }
        })
        .catch(err => {
            if (err.status == 400) {
                return "O ID informato não é válido"
            }
            if (err.status == 404) {
                return "O ID não foi encontrado na base"
            }
        });

    return find
}
export async function getItemList(processId) {
    const find = await api.get('/user/list/item/' + processId)
        .then(res => {
            if (res.status == 200) {
                return res.data
            }
        })
        .catch(err => {
            if (err.status == 400) {
                return "O ID informato não é válido"
            }
            if (err.status == 404) {
                return "O ID não foi encontrado na base"
            }
        });

    return find
}
export async function getProcessInfo(processId) {
    const find = await api.get('/user/process/' + processId)
        .then(res => {
            if (res.status == 200) {
                return res.data
            }
        })
        .catch(err => {
            if (err.status == 400) {
                return "O ID informato não é válido"
            }
            if (err.status == 404) {
                return "O ID não foi encontrado na base"
            }
        });

    return find
}

export async function getCoastItemList(processId) {
    const find = await api.get('/user/list/cost/item/' + processId)
        .then(res => {
            if (res.status == 200) {
                //console.log(res.data)
                return res.data
            }
        })
        .catch(err => {
            if (err.status == 400) {
                return "O ID informato não é válido"
            }
            if (err.status == 404) {
                return "O ID não foi encontrado na base"
            }
        });

    return find
}
export async function getIdealProperty(userId) {
    const find = await api.get('/user/property/' + userId)
        .then(res => {
            if (res.status == 200) {
                console.log(res.data)
                return res.data
            }
        })
        .catch(err => {
            if (err.response.status == 400) {
                return "O ID informato não é válido"
            }
            if (err.response.status == 404) {
                return "O ID não foi encontrado na base"
            }
        });

    return find
}

export async function idealPropertieValidation(propertieInfo) {

    let question = []
    Object.keys(propertieInfo).forEach((key) => {
        if (propertieInfo[key] === "" && key !== 'infrastructure') {
            switch (key) {
                case 'isForRent':
                    question.push("1")
                    break
                case 'propertyType':
                    question.push("2")
                    break
                case 'isCondominium':
                    question.push("3")
                    break
                case 'rooms':
                    question.push("5")
                    break
                case 'bathrooms':
                    question.push("6")
                    break
                case 'parkingSpaces':
                    question.push("7")
                    break
                case 'furnished':
                    question.push("8")
                    break
            }
        }
    })
    
    return question
}


export async function getItems(processId) {
    const items = await api.get('/user/list/item/' + processId)
    .then( (response) => {
        return response.data
    })

    return items
}



// 200 deu certo
// 400 id inválido
// id não existe no banco