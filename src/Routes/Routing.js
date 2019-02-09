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
import GetPosts from '../Posts/GetPosts'

    
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
         
             <a href="/"><button className="home">AC</button></a>
             
            <Button className="all" href='/allposts'>See All</Button>
            {/* <Dropdown className="all"  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle className="all">
                    <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu className="all">
                        <Link to="/check"><DropdownItem>Drafts</DropdownItem></Link>
                        <DropdownItem href="/post">Start Writing!</DropdownItem>
                        <DropdownItem href="/signin">Sign In</DropdownItem>
                        <DropdownItem onClick={this.logout}>Log Out</DropdownItem>
                    </DropdownMenu>
            </Dropdown>  */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.dropdownOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                <Link to="/check"><DropdownItem>Drafts</DropdownItem></Link>
                        <DropdownItem href="/post">Start Writing!</DropdownItem>
                        <DropdownItem href="/signin">Sign In</DropdownItem>
                        <DropdownItem onClick={this.logout}>Log Out</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
          </Navbar> 

          {/* <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div> */}
      <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/allposts"><GetPosts sessionToken={this.state.sessionToken}/></Route>
          <Route exact path="/check"><TokenCheck sessionToken={this.state.sessionToken} /></Route>
          <Route exact path="/post"><Posts sessionToken={this.state.sessionToken}/></Route>
          <Route exact path="/signin"><SignIn theToken={this.setSessionState} /></Route>
      </Switch>
            </div>
        )
    }
}

export default Routing;