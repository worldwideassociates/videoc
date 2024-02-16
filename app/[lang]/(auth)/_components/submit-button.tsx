'use client'
import { Button } from '@/components/ui/button';


interface Props {
  loading: boolean,
  label: string
}

export const SubmitButton: React.FC<Props> = ({ loading, label }) => {
  return (
    <Button disabled={loading}>
      {loading ? '...' : label}
    </Button>
  )
}