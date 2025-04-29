import { Routes, Route } from 'react-router-dom'
import AdminRoute from './components/auth/AdminRoute.jsx'
import Signin from './components/user/Signin.jsx'
import Signup from './components/user/Signup.jsx'
import Profile from './components/user/Profile.jsx'
import Home from './components/core/Home.jsx'
import Shop from './components/core/Shop.jsx'
import './main.css'

// import PrivateRoute from "./auth/PrivateRoute";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        {/* <PrivateRoute path="/profile/:userId" exact component={Profile} /> */}
          {/*  <AdminRoute path="/create/product" exact element={<AddProduct />} />
        <AdminRoute path="/create/category" exact element={<AddCategory />} />
        <AdminRoute path="/admin/orders" exact element={<Orders />} />
        <AdminRoute path="/admin/products" exact element={<ManageProducts />} />
        <AdminRoute path="/admin/product/update/:productId" exact element={<UpdateProduct />} />*/}
      </Routes>
    </>
  )
}

export default App
