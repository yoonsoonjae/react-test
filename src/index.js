import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter 임포트
import './index.css';
import App from './App';
import reportWebVitals from './components/AirQuality/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}> {/* BrowserRouter로 감싸기 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// 성능 측정을 위한 reportWebVitals
reportWebVitals()
