
import React, { Component } from 'react';
import { connect } from 'dva';
import Footer from 'layout/Footer';
import Layout from 'layout';

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class Index extends Component<{
  user;
}> {
  static async getInitialProps({ctx}) {
    return {
      user: ctx.isServer ? ctx.req.user : ctx.store.getState().user.currentUser || {}
    }
  }
  render () {
    const user = this.props.user;
    return (
      <Layout>
        <div>
            Login with
            <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
            <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a>
            <hr />
            <a href="/">Home</a> | <a href="/user">User</a> | <a href="/user/register">Register</a>
            <hr/>
            <a href="/user/login">Login</a> | <a href="/logout">Logout</a>
            <hr/>
            {JSON.stringify(user)}
        </div>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Index;
