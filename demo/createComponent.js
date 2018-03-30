class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text } = this.props;
    return (<div id="app">
      <span>{text}</span>
    </div>);
  }
}
// babel编译之后
_createClass(App, [{
  key: 'render',
  value: function render() {
    var a = this.props.a;

    return _react2.default.createElement(
      'div',
      { id: 'app' },
      _react2.default.createElement(
        'span',
        null,
        a,
      )
    );
  }
}]);

// createClass.js
var { Component } = require('ReactBaseClasses');
var { isValidElement } = require('ReactElement');
var ReactNoopUpdateQueue = require('ReactNoopUpdateQueue');
var factory = require('create-react-class/factory');

module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);


// factory.js
function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  function createClass(spes) {
    var Constructor = identity(function(props, context, updater) {
      if (this._reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      } 
      this.props = props;
      this.context = text;
      this.updater = updater || ReactNoopUpdateQueue;
      this.state = null;

      var initialState = this.getInitialState ? this.getInitialState() : null;
      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.Constructor = Constructor;
    Constructor.prototype._reactAutoBindPairs = [];

    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }
    return Constructor;
  }
  return createClass;
}

// identity
function identity(fn) {
  return fn;
}

// ReactElement
ReactElement.createElement = function(type, config, children) {
  var propName;
  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }
    self = config._self === undefined ? null : config._self;
    source = config._source === undefined ? null : config._source;
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for(var i = 0; i < childrenLength; i++) {
      childArray[i] = childrenLength[i + 2];
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props,)
}

// ReactElement
var ReactElement = function(type, key, ref, self, source, owner, props) {
  var element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    ref: ref,
    props: props,
    _owner: owner,
  };
  return element;
}

//综上所述，最后执行完返回element元素，这里就是一个描述react对象的virtual dom。
/* 
*基本的过程：将es6写法的class组件通过babel编译生成createClass和createElement组成的函数执行式，最终
*返回虚拟的virtual dom。也就是这里的element对象
第一步：createClass，返回一个生成Constructor构造函数的func函数；
第二部：createElement，返回生成的虚拟dom对象element
通过这两个函数的执行，将jsx + es6语法的组件，编译成virtual dom的对象结构；也就是创建了一个react组件
*/