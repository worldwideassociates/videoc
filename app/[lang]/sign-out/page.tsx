'use client'

import { signOut } from 'next-auth/react';
import { useEffect } from 'react'



const SignOut = () => {

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  useEffect(() => {
    handleSignOut()
  }, []);
}



export default SignOut