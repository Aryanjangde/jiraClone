'use client'
import React, { useState, useEffect, useContext } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { useDataContext } from '@/context/dataContext';
import { constrainedMemory } from 'process';

export default function Login({ onSignIn }) {
  const {userData, setUserData} = useDataContext();
  const [accessToken, setAccessToken] = useState(null);

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAccessToken(tokenResponse.access_token);
      fetchUserData(tokenResponse.access_token);
    },
    onError: () => console.log('Login failed'),
  });

  const logout = () => {
    setAccessToken(null);
    setUserData('')
    localStorage.removeItem('accessToken');
    console.log('User logged out');
  };
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
      fetchUserData(storedToken);
    }
  }, []);

  return (
    <div className='text-white'>
      {accessToken ? (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login()} className='bg-transparent'>Sign in with Google</button>
      )}
    </div>
  );
}
