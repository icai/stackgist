import React from 'react';

const DefaultOnSSR = () => <span />;

class View extends React.Component<
  {
    onSSR?;
    canRender?;
    className?;
    style?;
    onClick?;
  },
  {
    canRender;
  }
> {
  constructor(props) {
    super(props);
    if(typeof props.canRender !== 'undefined') {
      this.state = {
        canRender: props.canRender
      };
    } else {
      this.state = {
        canRender: true
      };
    }
  }

  componentDidMount() {
    this.setState({ canRender: true });
  }

  render() {
    const {
      children,
      onSSR = <DefaultOnSSR />,
      className,
      ...reset
    } = this.props;
    const { canRender } = this.state;

    return (
      <div className={className} {...reset}>
        {canRender ? children : onSSR}
      </div>
    );
  }
}

export default View;
