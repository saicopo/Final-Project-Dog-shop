
import './App.css';
import {BrowserRouter,Route,Routes} from  'react-router';


function App() {
  return (
    <div className="App">

<BrowserRouter>

<Routes>
  <Route path="/" element={<h1>Home</h1>}/>
  <Route path="/about" element={<h1>About</h1>}/>
</Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
