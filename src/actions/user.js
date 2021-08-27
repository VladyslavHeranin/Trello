import axios from "axios"
import { setUser, setList } from "../reducers/userRed"


export const registration = async (email, password, name) => {

    try {
        const response = await axios.post("https://reacttrelloapp.herokuapp.com/api/auth/registration", {
            email,
            password,
            name
        })

        window.M.toast({ html: response.data.message })

    } catch (error) {
        window.M.toast({ html: error.response.data.message })
    }

}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post("https://reacttrelloapp.herokuapp.com/api/auth/login", {
                email, password
            })
   
            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}


export function createList(id, name) {
    return async dispatch => {

        try {
            const response = await axios.post(`https://reacttrelloapp.herokuapp.com/api/auth/list`, {
                id, name
            })

            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)

        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}





export const createItem = (listId, id, name) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://reacttrelloapp.herokuapp.com/api/auth/createItem`, {
                listId, id, name
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}



export const Auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://reacttrelloapp.herokuapp.com/api/auth/auth`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}



export const delList = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`https://reacttrelloapp.herokuapp.com/api/auth/delList/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}





export const delItem = (itemId) => {

    return async dispatch => {

        try {
            const response = await axios.delete(`https://reacttrelloapp.herokuapp.com/api/auth/deleteItem/${itemId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}











