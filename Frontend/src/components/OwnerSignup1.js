import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './OwnerLogin.css';
import {Navbar} from "react-bootstrap";

//Define a Owner Signup1 Component
class OwnerSignup1 extends Component{
    
    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie1') === 'ownercookie'){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar className="nav" >
                <Navbar.Header style={{height:"8vw"}}>
                    <Navbar.Brand>
                        <a href="/" title = "SEREP"><img src={require('./LOGO2.png')} style={{height:"6vw"}} alt="Homeaway Logo"/></a>
                    </Navbar.Brand> 
                </Navbar.Header>
                    <img src={require('./logo.png')} alt="Homeaway Logo"/>
                </Navbar>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="container">
                <p></p>
                </div>
                <div class="center">
                    <div id="yourdiv">
                        <h1 class="display-5">Sign Up for SEREP<br></br></h1>
                        <h2><small>	Already have an account? <a class="bg-default" href="/owner/login">Log in</a></small>	</h2>
                    </div>
                </div>
                <div class="container">
                <div class="col-sm-6 col-sm-offset-6" style={{left: "400px"}}>
                        <div class="login-form">
                            <br></br>
                            <a href="/owner/signup2"><button class="btn btn-warning" style={{width:"100%"}}>Sign Up with Email</button></a>
                            <br></br>
                            <div class="mydiv">
                                <span class="myspan">or</span>
                            </div>
                            <br></br>
                            <div>
                            <button class="mybtn facebook_button">Log in with Facebook</button>
                            </div>
                            <br></br>
                            <div>
                            <button className="mybtn google_button" >Log in with Google</button>
                            </div>
                            <br></br>
                            <div class="center" id= "yourdiv">
                            <font size="1">We don't post anything without your permission.
                            <br></br>
                            By creating an account you are accepting our Terms and Conditions and Privacy Policy.
                            <br></br>
                            </font>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="center" id= "yourdiv">
                <font size="1">Use of this Web site constitutes acceptance of the SEREP.com Terms and Conditions and Privacy Policy.
                    <br></br>
                    ©2018 SEREP. All rights reserved.</font>
                </div>
            </div>
        )
    }
}
//export Owner Signup1 Component
export default OwnerSignup1;