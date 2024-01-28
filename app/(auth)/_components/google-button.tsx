'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';


export const GoogleButton = () => {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
    signIn('google')
  }

  return (
    <Button disabled={loading} onClick={handleClick} variant='outline'>
      {loading ? '...' : 'Google'}
    </Button>
  )
}