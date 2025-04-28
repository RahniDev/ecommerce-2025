import { Routes, Route } from 'react-router-dom'
import AdminRoute from './auth/AdminRoute.jsx'
import Signin from './user/Signin.jsx'
import Signup from './user/Signup.jsx'
import Profile from './user/Profile.jsx'
import Home from './core/Home.jsx'
import Shop from './core/Shop.jsx'
// import PrivateRoute from "./auth/PrivateRoute";


const App = () => {
  return (
    <>
      <h1>True Being Wellness</h1>
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
