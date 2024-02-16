'use client'

import { useToast } from '@/components/ui/use-toast';
import { UploadDropzone } from '@/lib/utils/uploadthing';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  const { toast } = useToast()
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">

      <UploadDropzone
        endpoint="customerImporter"
        onClientUploadComplete={(res) => {
          toast({
            title: "Success",
            description: "Import is being processed check back later."
          })
          router.refresh()
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  )
}

export default page;