import React, { Fragment } from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';





const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 StackGist
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'stackgist';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - stackgist`;
  //   }
  //   return title;
  // }

  render() {
    const { children, onlyLogo } = this.props;
    const links = [
      {
        key: 'help',
        title: formatMessage({ id: 'layout.user.link.help' }),
        href: '',
      },
      {
        key: 'privacy',
        title: formatMessage({ id: 'layout.user.link.privacy' }),
        href: '',
      },
      {
        key: 'terms',
        title: formatMessage({ id: 'layout.user.link.terms' }),
        href: '',
      },
    ];
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          {onlyLogo ? <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            </div> : ''}
          <div className={onlyLogo ? styles.mainonly : styles.main}>
            {!onlyLogo && <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Ant Design</span>
                </Link>
              </div>
              <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
            </div>}
            {children}
          </div>
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
