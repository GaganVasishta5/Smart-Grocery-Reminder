// src/App.jsx
import Header from './components/Header';
import LocationTracker from './components/LocationTracker';
import CanvasBoard from './components/CanvasBoard';
import NetworkStatus from './components/NetworkStatus';
import GroceryList from './components/GroceryList';



function App() {
  return (
    <div className="container py-4">
      <Header />
      <div className="my-4">
        <LocationTracker />
        <CanvasBoard />
        <NetworkStatus />
        <GroceryList />



      </div>
    </div>
  );
}

export default App;
