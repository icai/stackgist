import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

import UserLayout from 'layouts/UserLayout';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;


@connect(({ login, loading }) => {
  return {
    login,
    submitting: loading.effects['login/login']
  };
})
class LoginPage extends Component {
  static async getInitialProps(props) {
    return {
    }
  }
  state = {
    type: 'account',
    autoLogin: true
  };


  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type
        }
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  renderMessage = content => (
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <UserLayout>
        <div className={styles.main}>
          <Login
            defaultActiveKey={type}
            onSubmit={this.handleSubmit}
            ref={form => {
              this.loginForm = form;
            }}
          >
              {login.status === 'error' &&
                login.type === 'account' &&
                !submitting &&
                this.renderMessage(
                  formatMessage({ id: 'app.login.message-invalid-credentials' })
                )}
              <UserName name="username" placeholder="admin/user" />
              <Password
                name="password"
                placeholder="888888/123456"
                onPressEnter={() =>
                  this.loginForm.validateFields(this.handleSubmit)
                }
              />
            <div>
              <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                <FormattedMessage id="app.login.remember-me" />
              </Checkbox>
              <a style={{ float: 'right' }} href="/user/resetpassword">
                <FormattedMessage id="app.login.forgot-password" />
              </a>
            </div>
            <Submit loading={submitting}>
              <FormattedMessage id="app.login.login" />
            </Submit>
            <div className={styles.other}>
              <FormattedMessage id="app.login.sign-in-with" />
              <a href="/passport/weibo"> 
                <Icon
                  type="weibo-circle"
                  className={styles.icon}
                  theme="outlined"
                />
              </a>
              <a href="/passport/github">
                <Icon type="github" className={styles.icon} theme="outlined" />
              </a> 
              
              <Link className={styles.register} to="/User/Register">
                <FormattedMessage id="app.login.signup" />
              </Link>
            </div>
          </Login>
        </div>
      </UserLayout>
    );
  }
}

export default LoginPage;
