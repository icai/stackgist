import { View } from 'ui';
import React, { Component } from 'react';
import Router, { withRouter } from 'next/router';

import * as utils from 'libs/utils';

interface IProps {
  to:
    | {
        url: string;
        params?: object;
      }
    | string;
  style: object | undefined;
  className?: string;
  children?: React.ReactNode;
}
interface PageState {}

class Link extends Component<IProps, PageState> {
  static defaultProps = {
    to: {
      url: '',
      params: {}
    },
    style: {},
    className: '',
    children: ''
  };

  parseUrl = (opts) => {
    let { url, params } = opts;
    if (typeof opts === 'string') {
      url = opts.toLowerCase();
      params = false;
    }
    const href = url.toLowerCase() + (params ? '?' + utils.param(params) : '');
    return href;
  }

  goTo = opts => {
    Router.push(this.parseUrl(opts));
    // window.location.href = href;
    // return false;
  };
  render() {
    const { className, style, to, children, ...rest } = this.props;
    const withpointer = { ...style, cursor: 'pointer' };
    return (
      <a
        className={className}
        style={ withpointer }
        href={this.parseUrl(to)}
        onClick={this.goTo.bind(this, to)}
        {...rest}
      >
        {children}
      </a>
    );
  }
}

export default withRouter(Link as React.ComponentType<any>);
