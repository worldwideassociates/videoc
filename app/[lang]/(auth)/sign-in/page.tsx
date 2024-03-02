import React from 'react'
import Right from '../_components/right'
import { Header } from '../_components/header';
import { SignInForm } from '../_components/sign-in-form';
import { TermsAndConditions } from '../_components/terms-and-conditions';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/i18n.config';

interface Props {
  params: { lang: Locale }
}

export default async function SignIn({ params }: Props) {

  const { auth } = await getDictionary(params.lang) as any;

  return (
    <div
      className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Right />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Header title={auth.title} subTitle={auth.subTitle} />
          <div className="grid gap-6">
            <SignInForm t={auth.signInForm} />
          </div>
          <TermsAndConditions t={auth.signInForm.tns} />
        </div>
      </div>
    </div>
  )
}
