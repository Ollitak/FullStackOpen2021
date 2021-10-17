import axios from 'axios'


const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return (
        axios
            .get(baseURL)
            .then(response => response.data)   
    )
}


const postNew = (newPerson) => {
    return (
        axios
            .post(baseURL, newPerson)
            .then(response => response.data)
    )
}


const deletePerson = (id) => {
    return(
        axios
            .delete(`${baseURL}/${id}`)
    )
}

const changeNumber = (id, changes) => {
    return(
        axios
            .put(`${baseURL}/${id}`, changes)
            .then(response => response.data)
    )
}


const exportObj = {
    getAll: getAll,
    postNew: postNew,
    deletePerson: deletePerson,
    changeNumber: changeNumber
}

export default exportObj