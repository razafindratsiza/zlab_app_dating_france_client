import Cookies from 'js-cookie';
import React,{ useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = Cookies.get('access_token');
    return userToken
  };

  const [token, setToken] = React.useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}