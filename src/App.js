import React, { Component } from 'react';


import {BrowserRouter, Route} from 'react-router-dom' ;
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import Header from './component/Header' ;
import Home from './component/Home';
import Login from './component/Login' ;
import Register from './component/Register.js' ;
import ManageProduct from './component/ManagePoduct'
import {keepLogin} from './action'

const cookie = new cookies()


class App extends Component {

  //life cycle method
  componentDidMount() {
    //akan di jalankan sekali ketika pertama kali component di render
    //mengambil value yang disimpan pada file cookie masihLogin
    var userCookie = cookie.get('masihLogin')
    // jika didapatkan username di file cookie akan memanggil function keepLogin
    if(userCookie !== undefined) {
      console.log("cookie ada");
      this.props.keepLogin(userCookie)
      
    }

  }




  render() {
    return (
      <BrowserRouter>
        <div className="container">
            {/* headernya tidak di route agar selalu muncul di tiap route yang dituju */}
            <Header/>
            {/* ditambahkan exact pada home agar homenya tidak ikut */}
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/manageproduct" component={ManageProduct}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, {keepLogin}) (App)
