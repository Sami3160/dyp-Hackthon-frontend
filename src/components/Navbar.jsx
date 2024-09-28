const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
import clgLogo from "../assets/clg.png";
function Navbar() {

  return (
    <div className='h-auto absolute flex items-center justify-center'>
      <div className='flex justify-between items-center h-16 text-white font-semibold text-xl relative shadow-sm bg-blue-900 w-2/3 rounded-lg mt-6 text-center bg-opacity-50 backdrop-filter backdrop-blur-lg'>
        <div className='pl-8'>
          {/* <img className='w-20' src={clgLogo} alt="college logo" /> */}
        </div>
        <div className='pr-8'>
          <div className='flex text-xl gap-2 justify-center'>
            {pages.map((page, index) => (
              <div key={index} className='flex text-center items-center'>{page}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;