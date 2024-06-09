import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { loginRequest } from '@/store/actions/auth';
import { LoginSchema } from '@/validations/auth';
import { OpenCloseEyeIcon } from '@/components/pages/auth/openCloseEyeIcon';
import Auth from '@/pages/auth';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    dispatch(loginRequest(data));
  }

  return (
    <Auth isLogin={true} title={t(I18nKeys.LOGIN_SCREEN.TITLE)} description={t(I18nKeys.LOGIN_SCREEN.DESCRIPTION)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 p-6 pt-0'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(I18nKeys.GLOBAL.EMAIL)}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(I18nKeys.GLOBAL.EMAIL_PLACEHOLDER)}
                    type='email'
                    errorMsg={form.formState.errors.email?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>{t(I18nKeys.GLOBAL.PASSWORD)}</FormLabel>
                  <span className='select-none text-sm font-normal leading-none text-blue-700 hover:cursor-pointer hover:text-blue-800 hover:underline'>
                    {t(I18nKeys.GLOBAL.FORGOT_PASSWORD)}
                  </span>
                </div>
                <div className='relative'>
                  <FormControl>
                    <Input
                      className='pr-9'
                      placeholder={t(I18nKeys.GLOBAL.PASSWORD_PLACEHOLDER)}
                      type={isShowPassword ? 'text' : 'password'}
                      errorMsg={form.formState.errors.password?.message}
                      {...field}
                    />
                  </FormControl>
                  <OpenCloseEyeIcon
                    isShowPassword={isShowPassword}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-4' type='submit'>
            {t(I18nKeys.LOGIN_SCREEN.SUBMIT)}
          </Button>
        </form>
      </Form>
    </Auth>
  );
};

export default Login;
