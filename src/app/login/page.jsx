import Link from 'next/link';


const page = () => {
  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl ml-4 font-bold">TodoListPro</div>
        <ul className="flex space-x-14 text-white">
          <li>
            <Link href="/features"
               className="hover:text-gray-400">Features
            </Link>
          </li>
          <li>
            <Link href="/teams className=hover:text-gray-400">Teams
            </Link>
          </li>
          <li>
            <Link href="/resources className=hover:text-gray-400" >
              Resources
            </Link>
          </li>
          <li>
            <Link href="/prices className=hover:text-gray-400">
              Prices
            </Link>
          </li> 
          <li>
            <Link href="/login className=hover:text-gray-400">
              Login
            </Link>
          </li>
          <li>
            <Link href="/signup className=bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">Signup
              
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
  
};

export default page;
