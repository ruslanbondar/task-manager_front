import React from 'react';
import { connect } from 'react-redux';

const Content = ({ data }) => {
    console.log(data);
    return (
        <div>
            <h1>Content</h1>

            {data.map(item => <h3 key={item.id}>{item.name}</h3>)}
        </div>
  );
};

const mapStateToProps = state => {
    return {
        data: state.test
    };
};

export default connect(mapStateToProps, {})(Content);