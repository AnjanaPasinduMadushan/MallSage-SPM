import Header from './header';

// Higher-Order Component (HOC) to wrap a component with Header
const WithHeader = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => (
    <Header>
      <Component {...props} />
    </Header>
  );
};

export default WithHeader;
