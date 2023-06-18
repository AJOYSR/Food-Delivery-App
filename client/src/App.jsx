import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login, Main } from './containers';
import { app } from "./config/firebase.config.js";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateUserJWTToken } from './api';

import { setUserDetails } from './context/actions/userActions';
import { motion } from 'framer-motion';
import { fadeInOut } from './animations';
import { MainLoader } from './components';
import Alert from './components/Alert';
const App = () => {

  const navigate = useNavigate()

  const firebaseAuth = getAuth(app);

  const [isLoading, setIsLoading] = useState(false);

  const alert = useSelector((state) => state.alert)

  const dispatch = useDispatch()

  useEffect(() => {

    setIsLoading(true);

    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            dispatch(setUserDetails(data));
          });
          navigate('/', { replace: true })
        });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });

  }, [])

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className='fixed z-100 inset-0 bg-primary 
        backdrop-blur-md flex items-center justify-center w-full'
        >
          <MainLoader />
        </motion.div>
      )}

      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}

    </div>
  )
}

export default App