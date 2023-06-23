// Components imports
import Calculator from "../Calculator";
import Footer from './../Footer';

export default function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 overflow-hidden">
      <Calculator />
      <Footer />
    </div>
  )
}
