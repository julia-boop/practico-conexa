import './css/App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Login from './pages/Login';
import Post from './pages/Post';
import Photo from './pages/Photo';
import icon from './img/homeicon.png';

function App() {
  return (
    <div className="navbar d-flex justify-content-around">
      <BrowserRouter>
        <div>
          <h1 className="title"><Link to="/login" exact="true">login</Link></h1>
          <div className="underline"/>
        </div>
        <div>
          <h1 className="title"><Link to="/posts" exact="true">posts</Link></h1>
          <div className="underline"/>
        </div>
        <div>
          <h1 className="title"><Link to="/photos" exact="true">photos</Link></h1>
          <div className="underline"/>
        </div>
        <Switch>
          <Route path="/login" exact component={Login}/>
          <Route path="/posts" exact component={Post}/>
          <Route path="/photos" exact component={Photo}/>
        </Switch>
      </BrowserRouter>
      <div className="home-img d-flex justify-content-center"><img src={icon} /></div>
    </div>
      
  );
}

export default App;
