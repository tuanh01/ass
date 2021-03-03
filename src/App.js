

import Product from './components/Product';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
    return (
        <div>
            <Product></Product>

            <Router>
                <div>
                    <ul>
                        <li className="custom__link-header">
                            <Link to="/header">Quản lý danh mục sản phẩm</Link>
                    
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route  path="/header"><Header /></Route>
                        
                    </Switch>
                </div>
            </Router>
            

        </div>
    );
}

export default App;
