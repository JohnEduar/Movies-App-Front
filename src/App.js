import React from "react";
import { Header } from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {DirectorView} from './components/director/DirectorView';
import {GeneroView} from './components/genero/GeneroView';
import {MediaView} from './components/media/MediaView';
import {ProductoraView} from './components/productora/ProductoraView';
import {TipoView} from './components/tipo/TipoView';


function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Router>
        <Header />
        <div style={{ flex: '1' }}>
          <Switch>
            <Route exact path='/medias' component={MediaView} />
            <Route exact path='/tipos' component={TipoView} />
            <Route exact path='/directores' component={DirectorView} />
            <Route exact path='/generos' component={GeneroView} />
            <Route exact path='/productoras' component={ProductoraView} />
            <Redirect to='/medias' />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>

  );
}

export default App;
