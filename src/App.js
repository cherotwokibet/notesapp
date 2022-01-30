import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ForgotPassword from './auth/ForgotPassword';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './contexts/AuthContext';

import Create from './Create/Create';
import Notes from './Notes/Notes';


function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Router>
          <Layout>
            <Routes>
              <Route 
                path='/create' 
                element={
                  <PrivateRoute>
                    <Create/>
                  </PrivateRoute>
                }
              />
              <Route 
                path='/' 
                element={
                  <PrivateRoute>
                    <Notes/>
                  </PrivateRoute>
                }
              />
                
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/forgot_password' element={<ForgotPassword/>}/>
            </Routes>
          </Layout>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
