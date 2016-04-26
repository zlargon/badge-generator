import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { highlightBlock } from 'highlight.js';
import 'highlight.js/styles/github.css';  // Theme Github

class HighLight extends React.Component {
  componentDidMount () {
    const code = findDOMNode(this.refs.code);
    highlightBlock(code);
  }

  componentDidUpdate () {
    const code = findDOMNode(this.refs.code);
    highlightBlock(code);
  }

  render () {
    const { lang, children, className } = this.props;
    return (
      <pre className={className}>
        <code ref='code' className={lang}>
          {children}
        </code>
      </pre>
    );
  }
};

HighLight.propTypes = {
  lang: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default HighLight;
