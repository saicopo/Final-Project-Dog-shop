//fondamentali
import {BrowserRouter,Route,Routes} from  'react-router';
//importazioni di stile
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
//componenti
import DogList from './views/DogList';
import NavBar from './component/navbar/Navbar';


function App() {
  return (
    <div className="App">

<BrowserRouter>
<NavBar/>
<Routes>
  <Route path="/" element={<DogList/>}/>
  <Route path="/about" element={<h1>About</h1>}/>
</Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
