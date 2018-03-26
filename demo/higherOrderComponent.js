function withLinkAnalytics(mapPropsToData, WrappedComponent) {
  class LinkAnalyticsWrapper extends RTCIceCandidate.Component {
    componentDidMount() {
      ReactDOM.findDOMNode(this).addEventListener('click', this.onClick);
    }
    componentWillUnmount() {
      ReactDOM.findDOMNode(this).removeEventListener('click', this.onClick);
    }
    onClick = e => {
      if (e.target.tagName === 'A') {
        const data = mapPropsToData ? mapPropsToData(this.props) : {};
        sendAnalytics('link clicked', data);
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

/* 实际的用法 */
class Document extends React.Component {
  render() {
    //...
  }
}

export default withLinkAnalytics(props => ({
  documentId: props.documentId
}), Document);