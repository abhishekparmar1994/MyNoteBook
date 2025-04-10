import './App.css';
import Navbar from './components/NavBar';
import RoutesConfig from './components/RoutesConfig';
// import Alert from './components/Alert';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      {/* <Alert msg="this is "/> */}
      <RoutesConfig />
    </div>
  );
}


export default App;
