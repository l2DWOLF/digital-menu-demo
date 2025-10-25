import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Home from './components/pages/home/Home.jsx';
import { defaultMsg } from './utils/toastify.js';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    defaultMsg("Welcome to - Digital Menu");
  }, [])

  return (<div className="wrapper">
    <Router>
      <div className="toast-wrapper">
        <ToastContainer className="toast-container"
          newestOnTop
          pauseOnFocusLoss
          pauseOnHover
        />
      </div>

      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        {/*           <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
    {/*     <ScrollToTopButton /> */}
  </div>)
}
export default App