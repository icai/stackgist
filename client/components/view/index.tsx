import React from 'react';

const DefaultOnSSR = () => <span />;

class View extends React.Component<
  {
    onSSR?;
    canRender?;
    className?;
  },
  {
    canRender;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      canRender: props.canRender || true
    };
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
