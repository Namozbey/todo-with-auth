export const setItem = (data = []) => {
    return {
        type: 'SET',
        data
    }
}

export const addItem = (newItem = {}) => {
    return {
        type: 'ADD',
        newItem
    }
}

export const deleteItem = (id = null) => {
    return {
        type: 'DELETE',
        id
    }
}

export const doneItem = (id = null) => {
    return {
        type: "DONE",
        id
    }
}

export const markItem = (id = null) => {
    return {
        type: "MARK",
        id
    }
}