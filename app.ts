import { Application } from 'egg';
export default (app: Application) => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    await app.model.sync({ force: true }); // 开发环境使用
    //  测试数据
    await app.model.query(
      "INSERT INTO `stackgist`.`wp_posts` (`ID`, `post_author`, `post_date`, `post_date_gmt`, `post_content`, `post_title`, `post_excerpt`, `post_status`, `comment_status`, `ping_status`, `post_password`, `post_name`, `to_ping`, `pinged`, `post_modified`, `post_modified_gmt`, `post_content_filtered`, `post_parent`, `guid`, `menu_order`, `post_type`, `post_mime_type`, `comment_count`) VALUES ('1', '1', '2018-10-14 18:29:00', '2018-10-14 10:29:00', '欢迎使用WordPress。这是您的第一篇文章。编辑或删除它，然后开始写作吧！', '世界，您好2！', '', 'publish', 'open', 'open', '', 'hello-world', '', '', '2018-10-14 18:29:00', '2018-10-14 10:29:00', '', '0', 'http://wp.test/?p=1', '0', 'post', '', '1');"
    );
    // await app.model.sync({});
  });

  app.config.coreMiddleware.splice(0, 0, 'nextrender');
  app.next.prepare();
}