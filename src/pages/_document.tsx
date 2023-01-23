import { Html, Head, NextScript, Main } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel='shortcut icon' href='icon.svg' type='image/x-icon' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
          rel='stylesheet'
        />
      </Head>

      <body className='overflow-x-clip font-pt-sans antialiased'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
