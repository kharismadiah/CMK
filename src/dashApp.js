import React from 'react';
import { Provider } from 'react-redux';
import { store, history } from './redux/store';
import PublicRoutes from './router';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import themes from './settings/themes';
import AppLocale from './languageProvider';

import { themeConfig } from './settings';
import DashAppHolder from './dashAppStyle';
import Boot from './redux/boot';
import GlobalStyles from './settings/globalStyles';


const DashApp = () => (
  <IntlProvider
    locale="en"
  >
    <ThemeProvider theme={themes[themeConfig.theme]}>
      <DashAppHolder>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
        <GlobalStyles />
      </DashAppHolder>
    </ThemeProvider>
  </IntlProvider>
);
Boot()
  .then(() => DashApp())
  .catch(error => console.error(error));

export default DashApp;
export { AppLocale };
