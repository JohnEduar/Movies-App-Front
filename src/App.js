//import logo from './logo.svg';
//import './App.css';
import React from "react";
import { Header } from "./components/ui/Header";
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
    <Router>
      <Header />
      <Switch>
        <Route exact path='/medias' component={MediaView} />
        <Route exact path='/tipos' component={TipoView} />
        <Route exact path='/directores' component={DirectorView} />
        <Route exact path='/generos' component={GeneroView} />
        <Route exact path='/productoras' component={ProductoraView} />
        <Redirect to='/medias' />
      </Switch>
    </Router>


  );
}

export default App;
