import React from 'react';
import Link from 'components/link';
import Exception from 'components/Exception';
import { Layout } from 'antd';

const { Content } = Layout;

export default () => (
  <Layout
    style={{
      minHeight: '100vh'
    }}
  >
    <Content>
      <Exception
        type="404"
        linkElement={Link}
        desc={'Sorry, the page you visited does not exist'}
        backText={'Back to home'}
      />
    </Content>
  </Layout>
);
