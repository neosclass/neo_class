import React from 'react';

function MyComponent({ dataArray }) {
  return (
    <div>
      {dataArray.map((item, index) => (
        <div key={index}>
            <p>item.data</p>
        </div>
      ))}
    </div>
  );
}

export default MyComponent;
