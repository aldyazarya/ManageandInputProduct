
import React, {Component} from 'react' ;
import {Link} from 'react-router-dom' ;

import {onLoginClick} from '../action' ;
import {onSetTimeOut} from '../action'
import {connect} from 'react-redux'


class Login extends Component {

    //function yang mengambil data di form username dan password
    onSubmitClick = () => {
        const user = this.username.value ;
        const pass = this.password.value ;
        this.props.onLoginClick (user, pass)
        console.log("Username:" + user);
        console.log("Password:" + pass);
    }

        onErrorLogin = () => {
        if(this.props.user.error !== ''){
            setTimeout(this.props.onSetTimeOut,3000)
            return (
                <div className="alert alert-danger mt-4">
                    {this.props.user.error}
                </div>
            )
        } else {
            return null
        }
        
    }


    render(){
        return (
            <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Login</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Username</h4>
                            </div>
                            <form className="input-group">
                                {/* tag input ditambahi ref={yang isinya function} , untuk mengambil data yang diisi */}
                                <input ref={input => {this.username = input}} className="form-control" type="text"/>
                            </form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => {this.password = input}}  className="form-control" type="password"/>
                            </form>
                            {/* onClick={this.onSubmitClick}, jadi ketika di klik akan mengambil data yang ada di function onSubmitClick  */}
                            <button className="btn btn-success btn-block mt-5" onClick={this.onSubmitClick}>Login</button>
                            {this.onErrorLogin()}
                            <p className="lead">
                                Don't have account ? 
                                <Link to="/register">
                                    Sign Up!
                                </Link>
                            </p>
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {user : state.auth
    }
}

export default connect (mapStateToProps, {onLoginClick, onSetTimeOut})(Login) ;