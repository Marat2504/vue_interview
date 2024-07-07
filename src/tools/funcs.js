import consts from "@/tools/consts.js";

const sortMethod = (sortMethod, dataArray) => {
    if (sortMethod === 'salary') {
        return dataArray.sort((a, b) => a.salary - b.salary)
    } else if (sortMethod === '-salary') {
        return dataArray.sort((a, b) => b.salary - a.salary)
    } else if (sortMethod === 'status') {
        return dataArray.sort((a, b) => a.status - b.status)
    } else if (sortMethod === '-status') {
        return dataArray.sort((a, b) => b.status - a.status)
    } else if (sortMethod === 'title') {
        return dataArray.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortMethod === '-title') {
        return dataArray.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sortMethod === 'employment_type') {
        return dataArray.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortMethod === '-employment_type') {
        return dataArray.sort((a, b) => b.title.localeCompare(a.title))
    }

}


// Функция что бы переписать (employment_type и employment_type_display) b (status_display и status)
// в объекте модального окна на верные значение которые выбрал пользователь
function updateEmploymentType(vacancy) {
    const employmentTypeDisplayValue = Object.values(vacancy.employment_type_display)[0]
    const statusDisplayValue = Object.values(vacancy.status_display)[0]
    for (const [key, value] of Object.entries(consts.EMPLOYMENT_TYPE)) {
        if (value === employmentTypeDisplayValue) {
            vacancy.employment_type_display = {[key]: value}
            vacancy.employment_type = key
            break
        }
    }
    for (const [key, value] of Object.entries(consts.STATUS_CHOICES)) {
        if (value === statusDisplayValue) {
            vacancy.status_display = {[key]: value}
            vacancy.status = key
            break
        }
    }
    return vacancy
}

const errorProcessing = (errorsObject) => {
    let errors = []
    for (let value of Object.values(errorsObject)) {
        errors.push(value[0])
    }
    return errors
}

const formatPrice = (salary) => {
    let price = salary.toString()
    let priceString = []
    let counter = 0
    for (let i = price.length - 1; i >= 0; i--) {
        priceString.unshift(price[i])
        counter += 1
        if (counter % 3 === 0) {
            priceString.unshift(' ')
            counter = 0
        }
    }
    return priceString.join('')
}

export default {
    sortMethod, updateEmploymentType, errorProcessing, formatPrice
}
