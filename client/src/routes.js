import Header from "./components/HomePage";
import Home from "./components/Logged";
import PetCard from "./components/PetCard";
import Logged from "./components/Logged"
import MyPets from "./components/MyPets"
import CreatePet from "./components/CreatePet";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import LoginSignup from "./components/Loginsignup";


const routes = [
    {
      path: "/",
      element: <Header />
    },
    {
      path:'/home',
      element:<Home/>
    },
    {
        path:"/pet/:id",
        element:<PetCard />
    },
    {
      path:"/logged",
      element:<Logged />
    },
    {
      path:"/Pawlist",
      element:<MyPets />
    },
    {
      path:"/CreatePet",
      element:<CreatePet />
    },
    {
      path:'/aboutus',
      element:<Footer/>
    },
    {
      path:'/contacts',
      element:<Contacts/>
    },
  {
    path:'/login',
    element:<LoginSignup/>
  }
]
export default routes;