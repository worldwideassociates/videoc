import React from 'react';
import googleIon from '@/assets/icons/google.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image'

const LoginButton: React.FC = () => {
  return (
    <Button variant="outline">
      <Image src={googleIon} alt="Google Logo" />
      Login with Google
    </Button>
  );
};

export default LoginButton;
