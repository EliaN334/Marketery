import nextI18nextConfig from 'next-i18next.config.js';
import NextDocument, { Html, Head, NextScript, Main } from 'next/document';

class Document extends NextDocument {
  render() {
    // const currentLocale =
    //   this.props.__NEXT_DATA__.locale ?? nextI18nextConfig.i18n.defaultLocale;
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
  }
}

export default Document;
