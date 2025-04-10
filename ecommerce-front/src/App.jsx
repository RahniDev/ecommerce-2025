import { Routes, Route } from 'react-router-dom'
import AdminRoute from './auth/AdminRoute'
import Home from './core/Home'

const App = () => {

  return (
    <>
      <h1>True Being Wellness</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <AdminRoute path="/create/product" exact element={<AddProduct />} />
        <AdminRoute path="/create/category" exact element={<AddCategory />} />
        <AdminRoute path="/admin/orders" exact element={<Orders />} />
        <AdminRoute path="/admin/products" exact element={<ManageProducts />} />
        <AdminRoute path="/admin/product/update/:productId" exact element={<UpdateProduct />} />
      </Routes>
    </>
  )
}

export default App
