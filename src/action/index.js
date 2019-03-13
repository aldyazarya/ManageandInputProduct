import axios from 'axios' ;
import cookies from 'universal-cookie' ;

const cookie = new cookies()

export const onLoginClick = (user,pass) => {
    return (dispatch) => {
    // cek di database untuk username dan password yang di input
    axios.get ("http://localhost:2008/users", {
        params: {
            username: user,
            password: pass
        }
        //kalau berhasil ambil data maka dia akan masuk di .then kalau gagal masuk di .catch
    }).then(response => {
        if (response.data.length > 0){
            // //jika data usernama ditemukan/ objek ada isinya
            console.log(response.data);

            const {id, username} = response.data[0]

            dispatch ({
                type: "Berhasil Login",
                payload: {id, username}
            })
            //path:'/' berarti dia bisa diakses disemua tempat
            cookie.set('masihLogin', username, {path:'/'})

        } else {
            //jika username tidak ditemukan
            dispatch({
                type:'ERROR',
                payload: "Username and Password Don't Match"
            })

        }
    }).catch(err => {
        console.log("system error");
        
    })
    }
}

export const onRegisterClick = (user, pass, email) => {
    return (dispatch) => {
        axios.get ("http://localhost:2008/users", {
            params: {
                username: user,
            }
        }).then(response => {
            if (response.data.length === 0) {
                axios.post("http://localhost:2008/users", {
                username: user,
                password: pass,
                email: email
            }).then (response =>{
                dispatch({
                    type: 'SUCCESS',
                    payload: 'Register Success'
            })
            
            })} else {
                dispatch({
                    type: 'ERROR',
                    payload: 'Username has been taken'
                })
            }
        })
        
        }
    } 



export const onLogoutUser = () => {
    cookie.remove('masihLogin')
    return {type: "Logout_User"}
}


    
export const onSetTimeOut = () => {
    return {type:'SET_TIMEOUT'}
}

export const keepLogin =(user) => {
    return dispatch => {
        axios.get("http://localhost:2018/users", {
            params: {
                username: user
            }
        }).then(response =>{
            if(response.data.length > 0) {
                dispatch({
                    type: 'Berhasil Login',
                    payload: {username: user}
                })
            }
        })
}
}