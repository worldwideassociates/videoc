import React from 'react'
import Right from '../_components/right'
import { SignUpButton } from '../_components/sign-up-button';
import { Header } from '../_components/header';
import { SignInForm } from '../_components/sign-in-form';
import { Divider } from '../_components/divider';
import { TermsAndConditions } from '../_components/terms-and-conditions';
import { GoogleButton } from '../_components/google-button';

export default function SignIn() {
  return (
    <div
      className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <SignUpButton />
      <Right />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Header title="Welcome back!" subTitle="Provide your credentials to continue." />
          <div className="grid gap-6">
            <SignInForm />
            <Divider />
          </div>
          <TermsAndConditions />
        </div>
      </div>
    </div>
  )
}
