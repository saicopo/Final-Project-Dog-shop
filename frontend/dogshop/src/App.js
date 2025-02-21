//fondamentali
import {BrowserRouter,Route,Routes} from  'react-router';
//importazioni di stile
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
//componenti
import DogList from './views/DogList';
import NavBar from './component/navbar/Navbar';
import DogDetails from './views/DogDetails';
import SellerList from './views/SellerList';
import SellerDetails from './views/SellerDetails';
import NewDog from './views/NewDog';
import Footer from './component/footer/Footer';
import UpdateSeller from './views/UpdateSeller';

function App() {
  return (
    <div className="App">

<BrowserRouter>
<NavBar/>
<Routes>
  <Route path="/" element={<DogList/>}/>
  <Route path="/dog/:id" element={<DogDetails/>}/>
  <Route path='/seller' element={<SellerList/>}/>
  <Route path='/seller/:id' element={<SellerDetails/>}/>
  <Route path='/updateSeller/:id' element={<UpdateSeller/>}/>
  <Route path='/newDog' element={<NewDog/>}/>
</Routes>
<Footer/>
   </BrowserRouter>
    </div>
  );
}

export default App;
