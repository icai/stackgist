import App, {
  Container
} from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxDvaStore from '../redux-dva/store';

class MyApp extends App {
  static async getInitialProps(props) {

    const { Component, router, ctx, store } = props;
    const { req } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ req, router, ctx, store });
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    
    const { locale, messages } = req || (window as any).__NEXT_DATA__.props;


    return { pageProps, locale, messages };
  }

  render() {
    const { Component, pageProps, store } = this.props as any;
    return (
      <Container>
            <Provider store={store}>
              {<Component {...pageProps} />}
            </Provider>
      </Container>
    );
  }
}

{/* <LocaleProvider locale={appLocale.antd || defaultAntd}>
<IntlProvider locale={appLocale.locale} messages={appLocale.messages} initialNow={now}>
  <InjectedWrapper>

  </InjectedWrapper>
</IntlProvider>
</LocaleProvider> */}

export default withReduxDvaStore(MyApp);;