import React from 'react';
import './App.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// Import Librairies
import Container from 'react-bulma-components/lib/components/container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import User Context API
import { UserProvider } from './context/UserContext';

// Import Components
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Wiki from 'pages/Wiki';
import Wiki_ByCategory from './pages/Wiki_ByCategory';
import Wiki_CreateRessource from './pages/Wiki_CreateRessource';
import Wiki_RessourceDetails from './pages/Wiki_RessourceDetails';
import Wiki_EditRessource from './pages/Wiki_EditRessource';
import Login from './components/User/Login';
import MyAccount from './pages/MyAccount';
import HandleRessources from './components/Admin/HandleRessources';
import MyAccount_CreateAccount from './pages/MyAccount_CreateAccount';
import UserProfile from './pages/UserProfile';
import PasswordReset from './components/User/PasswordReset';
import NewPassword from './components/User/NewPassword';
import MentionsLegales from './pages/MentionsLegales';
import Footer from 'components/Layout/FooterMentions';

function App() {

  return (
    <UserProvider>
        <BrowserRouter>
          <ToastContainer />
          <Container fluid>

            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/wiki' component={Wiki} />
              <Route exact path='/wiki/:category' component={Wiki_ByCategory} />
              <Route exact path='/wikisheet/:id' component={Wiki_RessourceDetails} />
              <Route exact path='/wikiedit/:id' component={Wiki_EditRessource} />
              <Route path="/createressource" component={Wiki_CreateRessource} />
              <Route path="/profile" component={MyAccount} />
              <Route path="/useraccount/:id" component={UserProfile} />
              <Route exact path='/createAccount' component={MyAccount_CreateAccount} />
              <Route exact path='/forgotpassword' component={PasswordReset} />
              <Route exact path='/reset/:token' component={NewPassword} />

              <Route exact path='/mentionslegales' component={MentionsLegales} />
              <Route exact path='/admin' component={HandleRessources} />
              {/* <Route component={Error} />  */}
            </Switch>
            <Footer />
          </Container>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
