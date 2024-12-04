import { Provider } from "react-redux"
import Header from "./components/Header"
import Home from "./components/Home"
import Login from "./components/Login"
import appStore from "./utils/appStore"



function App() {

  return (
    <>
     <Provider store={appStore}>
     <div>
        <Home/>
      </div>
     </Provider>
    </>
  )
}

export default App
