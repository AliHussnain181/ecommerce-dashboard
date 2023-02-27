import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from "./components/Profile"
import Graph from './components/Graph';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />} >
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<h1><AddProduct /></h1>} />
            <Route path='/update/:name' element={<UpdateProduct />} />
            <Route path='/logout' element={<h1>Logout Product Component</h1>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/graph' element={<Graph />} />
          </Route>

          <Route path='signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
