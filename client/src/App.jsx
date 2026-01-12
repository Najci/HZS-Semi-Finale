import React, { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider, Navigate, useNavigate, BrowserRouter, useSearchParams, useParams, useLocation } from 'react-router-dom';
import Main from './components/Main';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Login from './components/Login';
import { CookiesProvider, useCookies } from 'react-cookie';
import axios from 'axios';
import Game from './components/Game';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Instructions from './components/Instructions';
import LandingPage from './components/LandingPage';

const ProtectedRoute = ({ element, username}) => {
  const user = element.props.user

  const currentUrl = useLocation().pathname

  if (!user) {
    return <Navigate to="/" />;
  }
  else{
    return element
  }

 /*  if (username){
    return hasAccess ? element : <Navigate to="/" />;
  }

  if(element.props.id){
    const hasAccess = user.role === element.props.id;
  
    return hasAccess ? element : <Navigate to="/" />;
  } */
};


function App() {
  const [cookie, setCookie] = useCookies(['user']);

  const StudentAssignment = () => {
    const { assignmentid}= useParams();
    return (
        <ProtectedRoute
          element={<StudentQuiz cookie={cookie.user} assignmentId={assignmentid} id="student"/>}
          user={cookie.user}
        />
    );
  };

  function handleLogin(user) {
    setCookie('user', user, { path: '/' });
  }

  function handleLogout() {
    setCookie('user', '', { path: '/', expires: new Date(0) });
    console.log('User logged out');
  } 

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route element={
      <>
        <Main />
        <Footer user={cookie.user}/>
      </>
      }>
        <Route path='/leaderboard' element={<ProtectedRoute element={<Leaderboard user={cookie.user} />} />}/>
        <Route path="/signup" element={<SignUp CreateCookie={handleLogin} user={cookie.user} />} />
        <Route path="/login" element={ <Login CreateCookie={handleLogin} user={cookie.user} />} />
        <Route path='/' element={<LandingPage user={cookie.user} />} />
        <Route path="/game" element={<ProtectedRoute element={<Game user={cookie.user} />} />} />
        <Route path="/dashboard" element={ <ProtectedRoute element={<Dashboard user={cookie.user} logoutFunction={handleLogout} />} />} />
        <Route path='/instructions' element={<Instructions user={cookie.user} />} />
      </Route>
    )
  );

  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

export default App;
