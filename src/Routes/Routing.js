import React, {Component} from 'react';
import { Route,
       Switch,
       Link } from 'react-router-dom';
// import Navbars from '../NavBar/Navbar'
import Posts from '../Posts/Posts'
import SignIn from '../signIn/SignIn'
import "../CSSstuff/routing.css";
import { Navbar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import TokenCheck from '../Drafts/TokenCheck'
import Home from '../Home/Home'
import TokenChecks from '../Posts/TokenChecks'
import GetPosts from '../Posts/GetPosts'
import ImageTest from '../testing/ImageTest'
import logo from "../assets/logo.png"


    
class Routing extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          sessionToken: '',
          dropDownOpen: false,
          collapsed: true
      };
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
          }); 
    }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    componentWillMount() {
        const token = localStorage.getItem('token');
        if(token && !this.state.sessionToken) {
            this.setState({ sessionToken: token})
        }
        
    }


    
    logout = () => {
        if(!localStorage.getItem('token')) {
            alert("You are already logged out.")
           } else {
        this.setState({
            sessionToken: '' 
        })
        localStorage.clear();
        alert('Logout successful') 
    }  
    }

    setSessionState = (token) => {
        localStorage.setItem('token', token);
        this.setState({ sessionToken: token});
        // console.log('does it work')
    } 

      
        
    

    render() { 
        return(
             <div>
                <Navbar  light expand="md" className="navs">
                
                    <a href="/"><img class="logo" src={logo} alt="logo" height="40px" widht="40px"/></a>
                    
                    <Button className="all" href='/allposts'>See All</Button>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.dropdownOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav>
                        Options
                        </DropdownToggle>
                        <DropdownMenu right>
                        <Link to="/check"><DropdownItem>Drafts</DropdownItem></Link>
                                <Link to="/checks"><DropdownItem>Start Writing!</DropdownItem></Link>
                                <DropdownItem href="/signin">Sign In</DropdownItem>
                                <DropdownItem onClick={this.logout}>Log Out</DropdownItem>
                                <DropdownItem href="/test">Tset</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            <Switch>
                <Route exact path="/test"><ImageTest /></Route>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/allposts"><GetPosts sessionToken={this.state.sessionToken}/></Route>
                <Route exact path="/check"><TokenCheck sessionToken={this.state.sessionToken} /></Route>
                <Route exact path="/checks"><TokenChecks sessionToken={this.state.sessionToken}/></Route>
                <Route exact path="/signin"><SignIn theToken={this.setSessionState} /></Route>
            </Switch>
        </div>
        )
    }
}

export default Routing;