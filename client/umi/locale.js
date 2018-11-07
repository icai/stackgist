/* eslint-disable no-undef */
import cookie from '../services/cookie';
const checkServer = () =>
  Object.prototype.toString.call(global.process) === '[object process]';


let LOCALES = '';


function setLocale(lang) {
  if (lang !== undefined && !/^([a-z]{2})-([A-Za-z]{2})$/.test(lang)) {
    // for reset when lang === undefined
    throw new Error('setLocale lang format error');
  }
  if (getLocale() !== lang) {
    const isServer = checkServer();
  
    if(!isServer) {
      // egg-i18n 默认 1y 
      cookie.set('locale', lang, 365);
      window.location.reload();
    } else {
      LOCALES = lang;
    }
  }
}

function getLocale(lang) {
  if(!lang) {
    const isServer = checkServer();
    if(isServer) {
      lang =  LOCALES
    } else {
      lang =  cookie.get('locale')
    }
  }
  // egg-i18n 小写, ant-design pro 大写, 返回界面匹配
  return lang.replace(/\w+$/, (a)=> a.toUpperCase());
}

let intl = {
  formatMessage: () => {
    return null;
  }
};

// react-intl 没有直接暴露 formatMessage 这个方法
// 只能注入到 props 中，所以通过在最外层包一个组件然后组件内调用这个方法来把 intl 这个对象暴露到这里来
// TODO 查找有没有更好的办法
function _setIntlObject(theIntl) {
  // umi 系统 API，不对外暴露
  intl = theIntl;
}

function formatMessage() {
  return intl.formatMessage.call(intl, ...arguments);
}

export * from 'react-intl';

export { formatMessage, setLocale, getLocale, _setIntlObject };
