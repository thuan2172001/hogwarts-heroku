export const api_register = (username, password, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/accounts"
    fetch(url, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then((data) => cb(data.message))
        .catch(msg => console.log(msg))
}

export const api_login = (username, password, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/authentication"
    return fetch(url, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ username, password })
    })
        .then(handleResponse)
        .then(data => {
            localStorage.setItem("token", data.token)
            localStorage.setItem("account", data.account)
            cb(data.message, data.account)
        })
        .catch(error => console.log(error))

}

export const api_get_account = (cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/authentication"
    cb(localStorage.getItem("user"))
    fetch(url, {
        method: "GET",
        headers: authHeader(),
    })
        .then(handleResponse)
        .then(data => {
            localStorage.setItem("account", data.account)
            localStorage.setItem('token', data.token)
            cb(data.account)
        })
        .catch(msg => {
            console.log(msg)
            cb(undefined)
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        })
}
export const api_get_user = (cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/user"
    fetch(url, {
        method: "GET",
        headers: authHeader(),
    })
        .then(handleResponse)
        .then(data => cb(data.user))
        .catch(msg => {
            console.log(msg)
            cb(undefined)
        })
}
export const api_update_passowrd = (old_password, password) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/account"
    fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify({ old_password, password })
    })
        .then(handleResponse)
        .then(() => alert("Change password successfully!"))
        .catch(() => alert("Change password failed!"))
}
export const api_update_student = (student, cb) => {
    const url = "https://it-must-be-ok.herokuapp.com/api/student"
    fetch(url, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(student)
    })
        .then(handleResponse)
        .then(data => cb(data.message))
        .catch(error => cb(error))
}
export const logout = (cb) => {
    localStorage.removeItem("token")
    localStorage.removeItem("account")
    cb()
}
const handleResponse = (res) => {
    return new Promise((resolve, reject) => {
        if (!res.ok) {
            reject(`${res.status} ${res.statusText}`)
        } else {
            resolve(res.json())
        }
    })
}

export const authHeader = () => {
    return {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "Application/json"
    }
}

export const initialAccount = () => {
    return localStorage.getItem("account")
}