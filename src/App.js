import logo from './logo.svg';
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
