// Assets imports
import logo from '../../assets/images/logo.png'
import instagram from '../../assets/images/icons/instagram.svg'
import linkedin from '../../assets/images/icons/linkedin.svg'
import github from '../../assets/images/icons/github.svg'

export default function Footer() {
  return (
    <div className="fixed left-0 bottom-0 w-screen h-12 flex justify-between items-center px-4 bg-slate-800 z-20">
      <div className="flex justify-center items-center">
        <img src={logo} alt="logo" className="w-14" />
        <h2 className="relative -left-2 text-slate-200 tracking-widest">DEVNATTO</h2>
      </div>
      <div className="flex gap-4">
        <a href="https://www.instagram.com/dev.natto/" target="_blank" className="transition-all hover:scale-110">
          <img src={instagram} alt="instagram" />
        </a>
        <a href="https://www.linkedin.com/in/febonatto/" target="_blank" className="transition-all hover:scale-110">
          <img src={linkedin} alt="linkedin" />
        </a>
        <a href="https://www.github.com/febonatto/" target="_blank" className="transition-all hover:scale-110">
          <img src={github} alt="github" />
        </a>
      </div>
    </div>
  )
}
