import React from 'react';
import ReactDOM from 'react-dom';
import {Table} from './table/table';
import {Convertor} from './convertor/convertor';
import './css/table.css';
import './css/convertor.css';
import {BrowserRouter as Router,Switch,Route,Link,useRouteMatch,useParams} from "react-router-dom";


class TableMain extends React.Component {
 render() {
    return (
      <Router>

<nav className="navbar navbar-expand-md bg-dark navbar-dark">

  <a className="navbar-brand" href="#">Crypto Currency</a>


  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>


  <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
  <ul class="navbar-nav " >
          <li class="d-flex nav-item">
            <a class="nav-link active " > <Link to="/">Home</Link></a>
          </li>
          <li class="d-flex nav-item">
            <a class="nav-link " ><Link to="/convertor">Convertor</Link></a>
          </li>
        </ul>

    {/* <ul className="navbar-nav">
      <li className="nav-item  px-3  active ">
      <Link to="/">Home</Link>
      </li>
      <li className="nav-item pr-3">
      <Link to="/convertor">Convertor</Link>
      </li>
    </ul> */}
  </div>
</nav>

      <div>
        <Switch>
          <Route path="/convertor">
            <Convertor />
          </Route>
          <Route path="/">
          <Table/>
          </Route>
        </Switch>
      </div>
    </Router>
      
    );
 }

}
ReactDOM.render(<TableMain/>, document.getElementById('root'));