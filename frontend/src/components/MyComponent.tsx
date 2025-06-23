import React, { Component } from "react";

const MyComponent = () => {
  return (
    <>
      <h1>Hello, World!</h1>
      <p>This is my first React component.</p>
    </>
  );
};

//  クラスコンポーネント
class MyClassComponent extends Component {
  render() {
    return (
      <div>
        <h1>Hello from MyClassComponent!</h1>
        <p>This is a class-based component.</p>
      </div>
    );
  }
}

export { MyComponent, MyClassComponent };
