import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react'
import React from 'react'

const Login: React.FC = () => {
  // will be fixed
  return (
    <div className='flex justify-center items-center h-screen bg-login'>
      <Card className='p-24'>
        <CardHeader shadow={false} className='m-0 flex flex-col gap-2 justify-center items-center text-center p-6'>
          <Typography variant='h4'>Welcome to something application!</Typography>
          <Typography className='text-gray-500'>Please login first to access the page.</Typography>
        </CardHeader>
        <CardBody className='flex flex-col gap-4'>
          <Input label='Email' size='lg' />
          <Input label='Password' size='lg' />
          <div className='-ml-2.5'>
            <Checkbox label='Remember Me' />
          </div>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button fullWidth>Sign In</Button>
          <Typography variant='small' className='mt-6 flex justify-center'>
            Don&apos;t have an account?
            <Typography as='a' href='#signup' variant='small' className='ml-1 font-bold text-secondary'>
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
