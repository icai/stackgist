
import React, { Component } from 'react';

import Footer from 'layout/Footer';
import Layout from 'layout';

class Index extends Component {
  render () {
    return (
      <Layout>
        <div>
            Login with
            <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
            <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a>
            <hr />
            <a href="/">Home</a> | <a href="/user">User</a>
        </div>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default Index;
