import { useNavigate } from "react-router-dom"
import SimplePopup from "./MUIPopup"

const Navbar = () => {
  const navigate= useNavigate()
  return (
    <div className="flex justify-between items-center py-4 px-4 bg-amber-300">
      <h2 className="text-4xl font-bold cursor-pointer text-red-500" onClick={()=>navigate('/')}>Kutubxona</h2>
      <SimplePopup/>
    </div>
  )
}

export default Navbar
