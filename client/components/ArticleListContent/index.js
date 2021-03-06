import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

const ArticleListContent = ({ data: { post_content, updatedAt, avatar, user, guid:href } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{post_content}</div>
    <div className={styles.extra}>
      <Avatar src={user.user_avatar} size="small" />
      <a href={href}>{user.display_name}</a> 发布在 <a href={href}>{href}</a>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
