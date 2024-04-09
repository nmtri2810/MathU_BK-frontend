import GithubLogo from '@/assets/github.logo'
import GoogleLogo from '@/assets/google.logo'
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react'
import { Eye } from 'lucide-react'
import React from 'react'

const Login: React.FC = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-screen bg-login bg-gray-50'>
      <GithubLogo size={50} />
      <Typography variant='h4' color='blue-gray'>
        Sign in to MathU
      </Typography>
      <Card className='w-96'>
        <CardBody className='flex flex-col gap-4 pb-4'>
          <Input label='Email' size='lg' />
          <Input label='Password' size='lg' icon={<Eye className='hover:cursor-pointer' />} />
          <div className='flex justify-end'>
            <Typography as='button' variant='small' className='hover:underline'>
              Forgot password?
            </Typography>
          </div>
        </CardBody>
        <CardFooter className='pt-0 flex flex-col gap-4'>
          <Button variant='gradient' fullWidth>
            Sign In
          </Button>
          <div className='flex justify-center text-sm relative'>
            <span className='border-gray-300 border-t w-full absolute top-3'></span>
            <span className='relative bg-white px-6 text-base'>or</span>
          </div>
          <Button variant='outlined' className='flex items-center justify-center gap-2' fullWidth>
            <GoogleLogo size={16} />
            Login with google
          </Button>
        </CardFooter>
      </Card>
      <Typography variant='small' className='mt-3 flex justify-center'>
        Don't have an account?
        <Typography as='button' variant='small' color='blue-gray' className='ml-1 font-bold hover:underline'>
          Sign up
        </Typography>
      </Typography>
    </div>
  )
}

export default Login
