import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  return (
    <div className="space-y-6 p-10 py-5 md:block max-w-xl flex justify-center">
      <Card className='pt-5 flex-1 col-span-8'>
        <CardHeader>
          <CardTitle className="mx-5">New Room</CardTitle>
        </CardHeader>
        <CardContent>

        </CardContent>
      </Card>
    </div>
  )
}

export default page;