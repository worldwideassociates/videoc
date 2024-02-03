'use client'

import React, { useState } from 'react';
import googleIcon from '@/assets/icons/google.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import { signIn } from 'next-auth/react';



const GoogleButton: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <Button variant="outline" disabled={loading} className="min-w-[200px]" onClick={handleClick}>
      {
        loading ? "..." : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '24px', height: '24px', position: 'relative' }}>
              <Image src={googleIcon} alt="Google Logo" layout="fill" objectFit="contain" />
            </div>
            Login with Google
          </div>
        )
      }
    </Button>
  );
};

export default GoogleButton;