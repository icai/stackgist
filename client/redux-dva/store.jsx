import React, { Component } from 'react';
import dva, { connect } from 'dva';
import createLoading from 'dva-loading';
import { Provider } from 'react-redux';
import model from '../models';

const checkServer = () =>
  Object.prototype.toString.call(global.process) === '[object process]';

// eslint-disable-next-line
const __NEXT_DVA_STORE__ = '__NEXT_DVA_STORE__';

function createDvaStore(initialState) {
  let app;
  if (initialState) {
    app = dva({
      initialState
    });
  } else {
    app = dva({});
  }
  app.use(createLoading());

  model(app);
  // const isArray = Array.isArray(model);
  // if (isArray) {
  //   model.forEach(m => {
  //     app.model(m);
  //   });
  // } else {
  //   app.model(model);
  // }
  app.router(() => {});
  app.start();
  // console.log(app);
  // eslint-disable-next-line
  const store = app._store;
  return store;
}

function getOrCreateStore(initialState) {
  const isServer = checkServer();
  if (isServer) {
    // run in server
    // console.log('server');
    return createDvaStore(initialState);
  }
  // eslint-disable-next-line
  if (!window[__NEXT_DVA_STORE__]) {
    // console.log('client');
    // eslint-disable-next-line
    window[__NEXT_DVA_STORE__] = createDvaStore(initialState);
  }
  // eslint-disable-next-line
  return window[__NEXT_DVA_STORE__];
}

// export default function withDva(...args) {

// }

export default function withDva(App) {
  return class WrappedApp extends Component {
    static getInitialProps = async (props = {}) => {
      if (!props) throw new Error('No app context');
      if (!props.ctx) throw new Error('No page context');

      const isServer = checkServer();
      const store = getOrCreateStore(props.req);

      props.ctx.store = store;
      props.ctx.isServer = isServer;
      // call children's getInitialProps
      // get initProps and transfer in to the page
      const initialProps = App.getInitialProps
        ? await App.getInitialProps.call(App, { ...props, isServer, store })
        : {};

      return {
        store,
        isServer,
        initialProps,
        initialState: store.getState()
      };
    };

    constructor(props) {
      super(props);
      let { initialState, store } = props;
      const hasStore = store && 'dispatch' in store && 'getState' in store;
      store = hasStore ? store : getOrCreateStore(initialState);
      this.store = store;
    }
    render() {
      let { initialProps, initialState, store, ...props } = this.props;
      // Cmp render must return something like <Provider><Component/></Provider>
      return <App {...props} {...initialProps} store={this.store} />;
    }
  };
}
