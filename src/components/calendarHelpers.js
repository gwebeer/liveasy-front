import moment from "moment"

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const weekDaysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Janeiro', "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

export function weekDates(selectedMoment) {
    let selectedDate = moment(selectedMoment, "DD/MM/YYYY").day()

    let firstDayWeek = moment(selectedMoment, "DD/MM/YYYY").subtract(selectedDate, 'days').format("DD/MM/YYYY")
    let lastDayWeek = moment(selectedMoment, "DD/MM/YYYY").add((6 - selectedDate), 'days').format("DD/MM/YYYY")

    return { 'firstDay': firstDayWeek, 'lastDay': lastDayWeek }
}

export function monthName(monthIndex) {
    return (months[monthIndex])
}

export function columnDate(name, date) {
    let thisWeek = weekDates(moment(date, "DD/MM/YYYY"))
    let firstMoment = moment(thisWeek.firstDay, "DD/MM/YYYY")

    let dayIndex = weekDays.indexOf(name)
    let requestedDate = firstMoment.add(dayIndex, 'day').format("DD/MM/YYYY")

    return requestedDate
}

export function weekDay_date(date) {
    let day = moment(date, "DD/MM/YYYY").day()
    return weekDaysEn[day]
}

export function docId(date) {
    let selectedDate = moment(date, "DD/MM/YYYY").day()

    let firstDayWeek = moment(date, "DD/MM/YYYY").subtract(selectedDate, 'days').format("DD-MM-YYYY")
    let lastDayWeek = moment(date, "DD/MM/YYYY").add((6 - selectedDate), 'days').format("DD-MM-YYYY")

    let docId = firstDayWeek + ">" + lastDayWeek
    return docId
}