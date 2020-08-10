import React from 'react';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return (
        <div className="error-messages">
          {errors}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
