const checkServer = () =>
  Object.prototype.toString.call(global.process) === '[object process]';

export default {
  publicHost: 'http://127.0.0.1:7001',
  localHost: 'http://127.0.0.1:7001',
  wrapHost(url) {
    const isServer = checkServer();
    if (isServer) {
      return this.localHost + url;
    } else {
      return this.publicHost + url;
    }
  }
};
