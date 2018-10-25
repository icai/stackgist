import App, {
  Container,
  AppComponentProps,
  AppComponentContext
} from 'next/app';
import React from 'react';
import withReduxDvaStore from '../redux-dva/store';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { LocaleProvider } from 'antd';
import { _setIntlObject } from '../umi/locale';
import 'assets/antd.less';
import '../global.less';

const defaultAntd = require('antd/lib/locale-provider/zh_CN');

const localeInfo = {
  'en-US': {
    messages: require('../locales/en-US.js').default,
    locale: 'en-US',
    antd: require('antd/lib/locale-provider/en_US'),
    data: require('react-intl/locale-data/en'),
    momentLocale: ''
  },
  'pt-BR': {
    messages: require('../locales/pt-BR.js').default,
    locale: 'pt-BR',
    antd: require('antd/lib/locale-provider/pt_BR'),
    data: require('react-intl/locale-data/pt'),
    momentLocale: 'pt-br'
  },
  'zh-CN': {
    messages: require('../locales/zh-CN.js').default,
    locale: 'zh-CN',
    antd: require('antd/lib/locale-provider/zh_CN'),
    data: require('react-intl/locale-data/zh'),
    momentLocale: 'zh-cn'
  },
  'zh-TW': {
    messages: require('../locales/zh-TW.js').default,
    locale: 'zh-TW',
    antd: require('antd/lib/locale-provider/zh_TW'),
    data: require('react-intl/locale-data/zh'),
    momentLocale: 'zh-tw'
  }
};

let appLocale = {
  locale: 'zh-CN',
  messages: {},
  data: require('react-intl/locale-data/zh'),
  momentLocale: 'zh-cn'
};

const InjectedWrapper = injectIntl(function(props) {
  _setIntlObject(props.intl);
  return props.children;
});

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
} else {
  appLocale = localeInfo['zh-CN'] || appLocale;
  appLocale.data && addLocaleData(appLocale.data);
}


class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, router, ctx, store } = props;
    const { req, isServer } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ req, router, ctx, store });
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    
    const { locale, messages } = req || window.__NEXT_DATA__.props;
    return { pageProps, locale, messages };
  }

  render() {
    const { Component, pageProps, store, locale, messages } = this.props;
    const now = Date.now();
    return (
      <Container>
        <LocaleProvider locale={appLocale.antd || defaultAntd}>
          <IntlProvider locale={appLocale.locale} messages={appLocale.messages} initialNow={now}>
           {/* <IntlProvider locale={locale} messages={messages} initialNow={now}> */}
            <InjectedWrapper>
              <Provider store={store}>
                {<Component {...pageProps} />}
              </Provider>
            </InjectedWrapper>
          </IntlProvider>
        </LocaleProvider>
      </Container>
    );
  }
}

export default withReduxDvaStore(MyApp);