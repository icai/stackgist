export default {
  isSsl() {
    // if ( isset( $_SERVER['HTTPS'] ) ) {
    //     if ( 'on' == strtolower( $_SERVER['HTTPS'] ) ) {
    //     return true;
    //     }
    //     if ( '1' == $_SERVER['HTTPS'] ) {
    //     return true;
    //     }
    // } else if ( isset($_SERVER['SERVER_PORT'] ) && ( '443' == $_SERVER['SERVER_PORT'] ) ) {
    //     return true;
    // }
    return false;
  },
  success({ message =  'Request ok', code = 200, ...rest } = {} as any) {
    const me = this as any;
    me.status = code;
    me.body = Object.assign({success: true, message }, rest);
  },
  fail({ message = 'Request error', code = 200, ...rest } = {} as any) {
    const me = this as any;
    me.status = code;
    me.body = Object.assign({ success: false, message }, rest);
  }
};
