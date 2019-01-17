import React, {Component} from 'react';
import { Route,
       Switch,
       Link } from 'react-router-dom';
// import Navbars from '../NavBar/Navbar'
import Posts from '../Posts/Posts'
import SignIn from '../signIn/SignIn'
import GetDrafts from '../Drafts/GetDrafts'
import "../CSSstuff/routing.css";
import { Nav, Navbar, NavbarBrand, Button, Jumbotron, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import TokenCheck from '../Drafts/TokenCheck'
import Home from '../Home/Home'
import GetPosts from '../Posts/GetPosts'

    
class Routing extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          sessionToken: '',
          dropDownOpen: false
      };
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
        console.log('does it work')
    } 
        
    

    render() { 
        return(
            <div>
           <Navbar  light expand="md" className="navs">
            {/* <Link to="/check"><Button>Drafts</Button></Link> */}
            {/* <Button href="/post">Make a Post</Button> */}
            {/* <Button href="/signin">Sign In</Button> */}
            {/* <Button onClick={this.logout}>Log Out</Button> */}
             <a href="/"><button className="home">AC</button></a>
            <Button href='/allposts'>See All</Button>
                <Dropdown className="right" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        <i className="fas fa-bars"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <Link to="/check"><DropdownItem>Drafts</DropdownItem></Link>
                        <DropdownItem href="/post">Start Writing!</DropdownItem>
                        <DropdownItem href="/signin">Sign In</DropdownItem>
                        <DropdownItem onClick={this.logout}>Log Out</DropdownItem>
                    </DropdownMenu>
            </Dropdown>
          </Navbar>
          {/* <Jumbotron fluid className="jumbo">
          <Container fluid className="jumboCon"> 
          <h1 className="display-3">Lorem Ipsum</h1>
          <p className="lead">To learn, is to admit you don't know everything</p>
        </Container>
      </Jumbotron> */}
      
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