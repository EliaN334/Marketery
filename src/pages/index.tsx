import { type NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { trpc } from '@/utils/trpc';

type FormValues = {
  image_preview: FileList;
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();
  const { data } = trpc.user.listUsers.useQuery();
  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('media', data.image_preview[0] as File);
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
    console.log(response);
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]'>
        <div className='container flex items-center justify-center gap-12 px-4 py-16 '>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col text-white [&_input]:text-gray-900'>
              <label htmlFor='first'>First name</label>
              <input id='first' {...register('image_preview')} type='file' />
            </div>

            <button className='text-white'>Create project</button>
          </form>

          <div className='flex flex-col text-white'>
            <h1 className='text-white'>Users:</h1>
            {data ? (
              data?.map((user) => (
                <div
                  className='flex flex-col border border-white p-5 text-white'
                  key={user.id}
                >
                  {user.first_name}
                  <br />
                  {user.email}
                  <br />
                  {user.password}
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>

        <div className='text-white'>
          <button
            onClick={
              session?.user
                ? () => signOut()
                : () => {
                    try {
                      signIn();
                    } catch (e) {
                      console.error(e);
                    }
                  }
            }
          >
            {session?.user ? `Sign out` : 'Sign in'}
          </button>

          <p>{session?.user && `Signed as ${session?.user?.email}`}</p>
        </div>
      </main>
    </>
  );
};

export default Home;
