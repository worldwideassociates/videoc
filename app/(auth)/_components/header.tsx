import React from 'react'


interface Props {
  title: string;
  subTitle: string;
}

export const Header: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{subTitle}</p>
    </div>
  )
}
