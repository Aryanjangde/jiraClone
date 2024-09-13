'use client'
import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
export default function Login() {
    const fetchUserData = async (accessToken) => {
        try {
          const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          console.log('User Data:', data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            fetchUserData(tokenResponse.access_token)
        },
      });
      
  return (
    <div>
    <button onClick={() => login()}>Sign in with Google 🚀</button>
    </div>
  )
}
