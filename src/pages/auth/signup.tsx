import React from 'react';
import Auth from '@/pages/auth';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '@/validations/auth';
import { useAppDispatch } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { signupRequest } from '@/store/actions/auth';
import { useTranslation } from 'react-i18next';
import { I18nKeys } from '@/locales/i18nKeys';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      username: ''
    }
  });

  function onSubmit(data: z.infer<typeof SignupSchema>) {
    const { email, password, username } = data;
    dispatch(signupRequest({ email, password, username }));
  }

  return (
    <Auth
      isLogin={false}
      title={t(I18nKeys.SIGNUP_SCREEN.TITLE)}
      description={t(I18nKeys.SIGNUP_SCREEN.DESCRIPTION)}
      cardClassName='min-w-[500px]'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='min-w- grid gap-4 p-6 pt-0'>
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
                <FormLabel>{t(I18nKeys.GLOBAL.PASSWORD)}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(I18nKeys.GLOBAL.PASSWORD_PLACEHOLDER)}
                    type='password'
                    errorMsg={form.formState.errors.password?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirmation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(I18nKeys.SIGNUP_SCREEN.PASSWORD_CONFIRMATION)}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(I18nKeys.SIGNUP_SCREEN.PASSWORD_CONFIRMATION_PLACEHOLDER)}
                    type='password'
                    errorMsg={form.formState.errors.passwordConfirmation?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t(I18nKeys.GLOBAL.USERNAME)}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t(I18nKeys.SIGNUP_SCREEN.ENTER_USERNAME)}
                    type='text'
                    errorMsg={form.formState.errors.username?.message}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-4' type='submit'>
            {t(I18nKeys.SIGNUP_SCREEN.SUBMIT)}
          </Button>
        </form>
      </Form>
    </Auth>
  );
};

export default SignUp;
