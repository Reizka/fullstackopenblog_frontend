import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>Close</button>
      </div>
    </div>
  );
});

const TogglableField = props => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <div onClick={toggleVisibility}>{props.buttonLabel}</div>
      </div>
      <div style={showWhenVisible} onClick={toggleVisibility}>
        {props.children}
      </div>
    </div>
  );
};

TogglableField.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default { Togglable, TogglableField };
