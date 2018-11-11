import React from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './RegisterResult.less';
import UserLayout from 'layouts/UserLayout';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="app.resetpass-result.view-mailbox" />
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="app.resetpass-result.back-home" />
      </Button>
    </Link>
  </div>
);
const RegisterResult = function ({ query }) {
  return (
    <UserLayout onlyLogo >
      <Result
        className={styles.registerResult}
        type={query.type || 'success'}
        title={
          <div className={styles.title}>
            <FormattedMessage
              id="app.resetpass-result.msg"
              values={{ message: query.message  }}
            />
          </div>
        }
        description={formatMessage({ id: 'app.resetpass-result.activation-email' })}
        actions={actions}
        style={{ marginTop: 56 }}
      />
    </UserLayout>

  )
};

RegisterResult.getInitialProps = async ({ ctx }) =>{
  return {
    query: ctx.query
  }
}

export default RegisterResult;
