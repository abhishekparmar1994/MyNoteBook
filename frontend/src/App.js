import './App.css';
import { useState } from 'react';
import Navbar from './components/NavBar';
import RoutesConfig from './components/RoutesConfig';
import Alert from './components/Alert';
import NoteState from './context/notes/noteState';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ msg: message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteState>
      <div className="app-layout">
        <Navbar />
        {alert && <Alert msg={alert.msg} type={alert.type} />}
        <RoutesConfig showAlert={showAlert} />
      </div>
    </NoteState>
  );
}

export default App;
