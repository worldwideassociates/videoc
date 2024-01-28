import React from 'react'
import Right from '../_components/right'
import { SignInButton } from '../_components/sign-in-button';
import { Header } from '../_components/header';
import SignUpForm from '../_components/sign-up-form';
import { Divider } from '../_components/divider';
import { TermsAndConditions } from '../_components/terms-and-conditions';
import { GoogleButton } from '../_components/google-button';

export default function SignUp() {
  return (
    <div
      className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <SignInButton />
      <Right />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Header title="Create  Account" subTitle="Ready to unlock exclusive access? " />
          <div className="grid gap-6">
            <SignUpForm />
            <Divider />
            <GoogleButton />
          </div>
          <TermsAndConditions />
        </div>
      </div>
    </div>
  )
}
