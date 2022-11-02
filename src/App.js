import { Route, Routes } from 'react-router-dom';
import './App.css';
import Blogs from './Pages/Blogs/Blogs';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PurchasePage from './Pages/PurchasePage/PurchasePage';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/Dashboard/MyOrders';
import MyProfile from './Pages/Dashboard/MyProfile';
import AddReview from './Pages/Dashboard/AddReview';
import Payment from './Pages/Dashboard/Payment';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddTools from './Pages/Dashboard/AddTools';
import MakeAdmin from './Pages/Dashboard/MakeAdmin';
import ManageAllOrders from './Pages/Dashboard/ManageAllOrders';
import ManageTools from './Pages/Dashboard/ManageTools';
import RequireUser from './Pages/Login/RequireUser';
import MyPortfilo from './Pages/MyPortfilo/MyPortfilo';
import NotFoundPage from './Pages/Shared/NotFoundPage';

function App() {
  return (
    <div>

        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='blogs' element={<Blogs></Blogs>}></Route>
          <Route path='login' element={<Login></Login>}></Route>
          <Route path='signup' element={<Signup></Signup>}></Route>
          <Route path='purchase/:tool_Id' element={
            <RequireAuth>
              <PurchasePage></PurchasePage>
            </RequireAuth>
          }></Route>

          <Route path='dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
            <Route index element={<MyProfile></MyProfile>}></Route>
            <Route path='myorders' element={
              <RequireUser>
                <MyOrders></MyOrders>
              </RequireUser>
            }></Route>   
            <Route path='review' element={
              <RequireUser>
                <AddReview></AddReview>
              </RequireUser>
            }></Route>   
            <Route path='payment/:payment_id' element={
              <RequireUser>
                <Payment></Payment>
              </RequireUser>
            }></Route>   

            <Route path='addTool' element={
              <RequireAdmin>
                <AddTools></AddTools>
              </RequireAdmin>
            }></Route>

            <Route path='makeAdmin' element={
              <RequireAdmin>
                <MakeAdmin></MakeAdmin>
              </RequireAdmin>
            }></Route>
            
            <Route path='manageAllOrders' element={
              <RequireAdmin>
                <ManageAllOrders></ManageAllOrders>
              </RequireAdmin>
            }></Route>

            <Route path='manageTools' element={
              <RequireAdmin>
                <ManageTools></ManageTools>
              </RequireAdmin>
            }></Route>



          </Route>


        <Route path='myPortfilo' element={<MyPortfilo></MyPortfilo>}></Route>


        <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
        {/* <h2 className='text-3xl'>Hellow World</h2>
        <button className='btn btn-primary text-white bg-gradient-to-r from-primary to-secondary'>Button</button> */}


      <ToastContainer />    
    </div>
  );
}

export default App;
