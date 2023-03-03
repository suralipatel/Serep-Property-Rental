import React, {Component} from 'react'; 
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Profile.css';
import {Navbar} from "react-bootstrap";

//Define a Login Component
class Profile extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = { profiledata : [], year : "" };

        //Bind the handlers to this class
        this.firstnameChangeHandler  = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler  = this.lastnameChangeHandler.bind(this);
        this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    logout = () => {
        cookie.remove('cookie1', {path: '/'})
        cookie.remove('cookie2', {path: '/'})
        cookie.remove('cookie3', {path: '/'})
        console.log("All cookies removed!")
        window.location = "/"
    }

    componentWillMount(){
        if(cookie.load('cookie1')){
            var input_email = cookie.load('cookie2');
            console.log(input_email);
            const data = { email : input_email }
            axios.post('http://localhost:3001/homeaway/profile', data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        console.log(response.data)
                        this.setState({
                            profiledata : response.data
                            }
                        )
                        this.refs.myfirstname.value = this.state.profiledata[0].firstname;
                        this.state.firstname = this.state.profiledata[0].firstname;
                        this.refs.mylastname.value = this.state.profiledata[0].lastname;
                        this.state.lastname = this.state.profiledata[0].lastname;
                        this.refs.createdyear.value = this.state.profiledata[0].created;
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Cannot fetch details");
                    this.setState({
                        authFlag : false
                })
            });
        }
    }

    firstnameChangeHandler = (e) => {this.setState({firstname : e.target.value})}
    
    lastnameChangeHandler = (e) => {this.setState({lastname : e.target.value})}

    aboutmeChangeHandler = (e) => {this.setState({aboutMe : e.target.value})}

    cityChangeHandler = (e) => {this.setState({city : e.target.value})}

    stateChangeHandler = (e) => {this.setState({state : e.target.value})}

    countryChangeHandler = (e) => {this.setState({country : e.target.value})}

    companyChangeHandler = (e) => {this.setState({company : e.target.value})}

    schoolChangeHandler = (e) => {this.setState({school : e.target.value})}

    hometownChangeHandler = (e) => {this.setState({hometown : e.target.value})}

    genderChangeHandler = (e) => {this.setState({ gender: e.target.value })}
    
    phoneChangeHandler = (e) => {this.setState({ phone: e.target.value })}

    handleValidation(){
        let formIsValid = true;

        //firstname
        if(!this.state.firstname){
           formIsValid = false;
           alert("First Name is a Required field");
           console.log("First name cannot be empty");
        }

        //lastname
        if(!this.state.lastname){
            formIsValid = false;
            alert("Last Name is a Required field");
            console.log("Last name cannot be empty");
        }
        
       return formIsValid;
   }

    //submit Login handler to send a request to the node backend
    saveChanges(event) {
        console.log("Inside save form");
        //prevent page from refresh
        event.preventDefault();
        if(this.handleValidation()){
            console.log("Profile Form data submitted");
            var input_email = cookie.load('cookie2');
            console.log(input_email);
            const data = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                aboutMe : this.state.aboutMe,
                city : this.state.city,
                state : this.state.state,
                country : this.state.country,
                company : this.state.company,
                school : this.state.school,
                hometown : this.state.hometown,
                gender : this.state.gender,
                phone : this.state.phone,
                email : input_email,
            }
            
            console.log(data);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/homeaway/profilesave',data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if(response.status === 200){
                        console.log(response.data)
                        this.setState({profiledata : response.data})
                        alert("Profile Data was succesfully saved!");
                    }
                }) 
                .catch (error => {
                    console.log("Error is:", error);
                    alert ("Profile data save error!");
                });
        }
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        console.log(cookie.load('cookie1'))
        if(!cookie.load('cookie1')){
            redirectVar = <Redirect to= "/"/>
        }
        return(
            <div>
                {redirectVar}
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/" title = "HomeAway" className = "logo"><img src={require('./LOGO2.png')} className="navbar-logo" alt="Homeaway Logo"/></a>
                        </Navbar.Brand> 
                    </Navbar.Header>
                    <div>
                        {(cookie.load('cookie1') === 'travellercookie') 
                        ?
                        (
                        <div className="btn btn-group">
                            <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/traveller/mytrips">My Trips</a>
                                <a className="dropdown-item" href="/">Book My Trip</a>
                                <a className="dropdown-item" href="#" onClick= {this.logout}>Logout</a>
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className="btn btn-group">
                            <button className="dropdown-toggle"  style = {{backgroundColor:"transparent", background:"transparent", borderColor:"transparent"}} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Hello {cookie.load('cookie3')}</button>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/owner/propertypost">Post Property</a>
                                <a className="dropdown-item" href="/owner/mylistings">My Listings</a>
                                <a className="dropdown-item" onClick = {this.logout}>Logout</a>
                            </div>
                        </div>
                        )
                    }
                    <img src={require('./logo.png')} alt="Homeaway Logo"/>
                    </div>
                </Navbar>
                <div class="container">
                <p></p>
                </div>
                <div class="image "></div>
                <div id = "profilehref" class="myprofilecontainer">
                    <div class="login-form">
                        <h1>{cookie.load('cookie3')}</h1>
                        <h2><small>Member since  <input id = "year" ref = "createdyear" type="text" readonly="readonly" /> </small></h2>
                        <h1><small>Profile Information</small></h1>
                        <br></br>
                            <div class="form-group">
                                    <input ref = "myfirstname" onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder="First Name" required/>
                                </div>
                                <div class="form-group">
                                    <input ref = "mylastname" onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder="Last Name or Initial" required/>
                                </div>
                                <div class="form-group">
                                    <input style={{height : "100px"}} onChange = {this.aboutmeChangeHandler} type="text" class="form-control input-lg" name="aboutme" placeholder="About me"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.cityChangeHandler} type="text" class="form-control" name="city" placeholder="City"/>
                                </div>
                                <div class="form-group">
                                <select style={{width:"100%"}} onChange={this.stateChangeHandler}>
                                    <option style={{color: "#ccc",}} value="" hidden>State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                  <option value="Assam">Assam</option>
                                  <option value="Bihar">Bihar</option>
                                  <option value="Chandigarh">Chandigarh</option>
                                  <option value="Chhattisgarh">Chhattisgarh</option>
                                  <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                  <option value="Daman and Diu">Daman and Diu</option>
                                  <option value="Delhi">Delhi</option>
                                  <option value="Lakshadweep">Lakshadweep</option>
                                  <option value="Puducherry">Puducherry</option>
                                  <option value="Goa">Goa</option>
                                  <option value="Gujarat">Gujarat</option>
                                  <option value="Haryana">Haryana</option>
                                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                  <option value="Jharkhand">Jharkhand</option>
                                  <option value="Karnataka">Karnataka</option>
                                  <option value="Kerala">Kerala</option>
                                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                                  <option value="Maharashtra">Maharashtra</option>
                                  <option value="Manipur">Manipur</option>
                                  <option value="Meghalaya">Meghalaya</option>
                                  <option value="Mizoram">Mizoram</option>
                                  <option value="Nagaland">Nagaland</option>
                                  <option value="Odisha">Odisha</option>
                                  <option value="Punjab">Punjab</option>
                                  <option value="Rajasthan">Rajasthan</option>
                                  <option value="Sikkim">Sikkim</option>
                                  <option value="Tamil Nadu">Tamil Nadu</option>
                                  <option value="Telangana">Telangana</option>
                                  <option value="Tripura">Tripura</option>
                                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                                  <option value="Uttarakhand">Uttarakhand</option>
                                  <option value="West Bengal">West Bengal</option>
                                </select><br/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.countryChangeHandler} type="text" class="form-control" name="country" placeholder="Country"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.companyChangeHandler} type="text" class="form-control" name="company" placeholder="Company"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.schoolChangeHandler} type="text" class="form-control" name="school" placeholder="School"/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.hometownChangeHandler} type="text" class="form-control" name="hometown" placeholder="Hometown"/>
                                </div>
                                <div class="form-group">
                                <select value={this.state.gender} style={{width:"100%"}} onChange={this.genderChangeHandler}>
                                    <option style={{color: "#ccc",}} value="" hidden>Gender</option>
                                    <option name="male"> Male</option>
                                    <option name="female">Female</option>
                                    <option name="other">Other</option>
                                </select><br/>
                                <h6 align = "left"><small>This is never shared</small></h6>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.phoneChangeHandler} type="text" class="form-control" name="phone" placeholder="Phone Number"/>
                                </div>
                            </div>  
                        <br></br>
                        <div class="col-md-10 text-center"> 
                        <button onClick = {this.saveChanges} class="btn-primary btn-lg" >Save Changes</button>
                        </div>
                        <br/>
                        </div>
            </div>
        )
    }
}
//export Login Component
export default Profile;