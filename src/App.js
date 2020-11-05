import NavBar from './Components/Utilities/Navigation/Navbar'
import Footer from './Components/Utilities/Navigation/Footer'
import Landing from './Components/Landing/Landing'
import Album from './Components/Album/Album'
import './Style.scss';

import { Route, Switch, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <>
      <NavBar />
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/album/:id" component={Album} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
