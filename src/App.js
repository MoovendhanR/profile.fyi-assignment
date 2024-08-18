import { useState } from 'react';
import AllRoutes from './Pages/AllRoutes/AllRoutes';
import Navbar from './Pages/Navbar/Navbar';
import Sidebar from './Pages/Navbar/Sidebar';
import { CartProvider } from './Components/CartContext';

function App() {
  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };

  return (
    <>
     <CartProvider>
      <Navbar toggle={toggle}/>
      <Sidebar isopen={isopen} toggle={toggle} />
      <AllRoutes/>
      </CartProvider>
    </>
  );
}

export default App;
