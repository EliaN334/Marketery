import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  email_signin: string;
  password_signin: string;
};
const Home: NextPage = () => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { data: users, refetch } = trpc.user.listUsers.useQuery();
  const { mutate: createUser, data: createUserResponse } =
    trpc.user.createUser.useMutation({
      onSuccess: () => refetch(),
    });
  const { mutate: deleteUser } = trpc.user.deleteUser.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDeleteUser = async (userId: string) => {
    try {
      deleteUser({
        id: userId,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const onSubmit = async (data: FormValues) => {
    try {
      createUser({
        ...data,
        full_name: `${data.first_name} ${data.last_name}`,
        image: {
          url: 'https://example.com',
          public_id: 'id',
        },
      });
      console.log('client: ', createUserResponse?.onboarding_url);
      push(createUserResponse?.onboarding_url as string);
      reset();
    } catch (e) {
      console.error('create user fn ', e);
    }
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen items-center justify-center gap-10'>
        <div>
          <div className='rounded-md border border-gray-300 p-3'>
            {session?.user ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button onClick={() => signIn()} className='font-semibold'>
                Sign in{' '}
              </button>
            )}

            <p>
              {session?.user && (
                <span>
                  Signed as <code>{session?.user?.email}</code> <br />
                  Account id <code>{session?.user.account_id}</code>
                </span>
              )}
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5 rounded-md border border-gray-300 p-3'
          >
            <input
              type='text'
              {...register('first_name')}
              placeholder='First name'
            />
            <input
              type='text'
              {...register('last_name')}
              placeholder='Last name'
            />
            <input type='text' {...register('email')} placeholder='Email' />
            <input
              type='text'
              {...register('password')}
              placeholder='Password'
            />
            <button>Create user</button>
          </form>
        </div>
        <div className='divide-y divide-gray-300 rounded-xl border border-gray-300 p-3'>
          {users?.map((user) => (
            <div className='px-3 py-2' key={user.id}>
              <span className='text-xl font-medium'>{user.full_name}</span>
              <div className='text-gray-500'>
                <span>{user.email}</span> · <span>{user.role}</span>
              </div>
              <button onClick={() => handleDeleteUser(user.id)} type='button'>
                Delete user
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
