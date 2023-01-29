// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import type ns1 from 'src/locales/en/navbar.json';
import type ns2 from 'src/locales/es/navbar.json';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    //  resources: {
    //    ns1: typeof ns1;
    //    ns2: typeof ns2;
    //  };
    // other
  }
}
