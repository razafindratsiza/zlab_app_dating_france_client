
'use client';
import React, { useState, useEffect } from 'react'

import HomeScreen from '@/screens/HomeScreen'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { useGetUserDetailsQuery } from '@/hook/authApi';
import useToken from '@/hook/useToken';
import { setCredentials } from '@/features/auth/authSlice';
const Page:React.FC = () => {

  const { token, setToken } = useToken();
  const dispatch = useDispatch()

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 9000, // 15mins
  })

  
  if (!token) {
    console.log('is unauth')
  }

 
  useEffect(() => {
    console.log(token)
    if (data) {
      dispatch(setCredentials(data?.data?.userInfo))
    }
  }, [data, dispatch])


  if (isFetching) {
    return <h1>loadinng....</h1>
  }
  return (
    <><ToastContainer />
      <HomeScreen />
    </>
  )
}

export default Page