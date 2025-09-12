import './App.css'
import FridgeDetails from "./components/features/FridgeDetails/FridgeDetails.tsx";
import CompartmentDetails from "./components/features/CompartmentDetails/CompartmentDetails.tsx";
import FridgeList from "./components/features/FridgeList/FridgeList.tsx";
function App() {

  return (
    <>
        <CompartmentDetails />
        <FridgeDetails />
        <FridgeList />
    </>
  )
}

export default App
