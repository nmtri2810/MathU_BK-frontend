import React, { ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AdminPath, Path } from '@/constants/enum';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useNavigate } from 'react-router-dom';
import Layout from '@/layout/mainLayout';
import GoogleLogo from '@/assets/google.logo';
import { Role } from '@/constants';
import { cn } from '@/lib/utils';
import { useGoogleLogin } from '@react-oauth/google';
import { loginGoogleRequest } from '@/store/actions/auth';
import PageLoading from '@/components/common/pageLoading';

interface IAuth {
  isLogin: boolean;
  children: ReactNode;
  title: string;
  description: string;
  cardClassName?: string;
}

const Auth: React.FC<IAuth> = ({ isLogin, children, title, description, cardClassName }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.auth.tokens?.accessToken);
  const roleId = useAppSelector((state) => state.auth.user?.role.id);
  const authLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (accessToken) {
      navigate(roleId === Role.Admin ? AdminPath.HOME_ADMIN : Path.HOME_CLIENT);
    }
  }, [accessToken, navigate, roleId]);

  const onSubmitGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => dispatch(loginGoogleRequest({ code: codeResponse.code })),
    onError: async () => console.log('Login Failed')
  });

  return (
    <Layout className='fullscreen bg-gray-100'>
      {!authLoading ? (
        <div className='mt-40 flex flex-col items-center justify-center'>
          <div
            className={cn('w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-sm', cardClassName)}
          >
            <div className='flex flex-col space-y-1.5 p-6'>
              <h3 className='text-2xl font-semibold tracking-tight'>{title}</h3>
              <p className='text-sm text-muted-foreground'>{description}</p>
            </div>
            {children}
            <div className='grid gap-4 p-6 pt-0'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t'></div>
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <div className='bg-white px-2 text-muted-foreground'>OR</div>
                </div>
              </div>
              <Button variant='outline' className='gap-2' onClick={() => onSubmitGoogleLogin()}>
                <GoogleLogo size={20} /> {isLogin ? 'Log in with Google' : 'Sign up with Google'}
              </Button>
            </div>
          </div>
          {isLogin ? (
            <div className='my-8'>
              <span>Don't have an account? </span>
              <span
                className='select-none text-blue-700 hover:cursor-pointer hover:text-blue-800 hover:underline'
                onClick={() => navigate(Path.SIGN_UP)}
              >
                Sign up
              </span>
            </div>
          ) : (
            <div className='my-8'>
              <span>Already have an account? </span>
              <span
                className='select-none text-blue-700 hover:cursor-pointer hover:text-blue-800 hover:underline'
                onClick={() => navigate(Path.LOGIN)}
              >
                Log in
              </span>
            </div>
          )}
        </div>
      ) : (
        <PageLoading />
      )}
    </Layout>
  );
};

export default Auth;
