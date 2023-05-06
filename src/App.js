import logo from './logo.svg';
import './scss/custom.scss'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Rotas from './routes';
import ToastAlert from './components/ToastAlert';

function App() {
  return (
    <div>
      <Rotas/>
      <ToastAlert/>
    </div>
  );
}

export default App;
