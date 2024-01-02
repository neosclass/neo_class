import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

ReactDOM.render(
    <MantineProvider theme={{ colorScheme: 'light' }}>
        <App />
    </MantineProvider>,
      document.getElementById('root')
);

