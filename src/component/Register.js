
import React, {Component} from 'react' ;
import {Link} from  'react-router-dom';

import {onRegisterClick} from '../action' ;
import {onSetTimeOut} from '../action'
import {connect} from 'react-redux' ;



class Register extends Component {

    onSubmitClick = () => {
        const user = this.username.value
        const pass = this.password.value
        const email = this.email.value
        this.props.onRegisterClick (user, pass, email)
    }

    onErrorAlert = () => {
        if(this.props.error !== ''){
            setTimeout(this.props.onSetTimeOut,5000)
            return (
                <div className="alert alert-danger mt-4">
                    {this.props.error}
                </div>
            )
        } else if (this.props.success !== ''){
            return (
                <div className="alert alert-success mt-4">
                    {this.props.success}
                </div>
            )
        }
    }




    render(){
        return (
            <div className="mt-5 row">
                <div className="col-sm-3 mx-auto card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-tittle">
                            <h1>Register</h1>
                        </div>
                        <div className="card-tittle mt-1">
                            <h4>Username</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input =>(this.username = input)} className="form-control" type="text"/>
                        </form>
                        <div className="card-tittle mt-1">
                            <h4>Password</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input =>(this.password = input)} className="form-control" type="password"/>
                        </form>
                        <div className="card-tittle mt-1">
                            <h4>Email</h4>
                        </div>
                        <form className="input-group">
                            <input ref={input =>(this.email = input)} className="form-control" type="text"/>
                        </form>
                        <button className="btn btn-success btn-block mt-5" onClick={this.onSubmitClick}>Register</button>
                        {this.onErrorAlert()}
                        <p className="lead">
                            Already have account? 
                            <Link to="/login">
                                Sign In!
                            </Link> 
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {error : state.auth.error,
        success: state.auth.success
    }
}

export default connect (mapStateToProps,{onRegisterClick, onSetTimeOut}) (Register) ;