import NavBar from "./Components/Utilities/Navigation/Navbar";
import Footer from "./Components/Utilities/Navigation/Footer";
import Landing from "./Components/Landing/Landing";
import Album from "./Components/Album/Album";
import Artist from "./Components/Artist/Artist";
import Search from "./Components/Search/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import Track from "./Components/Track/Track";
import "./Style.scss";

import { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <NavBar />
      <div style={{ minHeight: "calc(100vh - 80px)" }}>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/album/:id" component={Album} />
          <Route exact path="/artist/:id" component={Artist} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/playlist/:id" component={Playlist} />
          <Route exact path="/track/:id" component={Track} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
