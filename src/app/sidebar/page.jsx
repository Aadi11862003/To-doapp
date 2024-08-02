// pages/sidebar/page.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-12 space-y-6">
      <h2 className="text-2xl font-bold mb-4">TodoListPro</h2>
      <ul className="space-y-4 p-5">
        <li>
          <Link href="/additem" passHref>
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              Add Task
            </div>
          </Link>
        </li>
        <li>
          <Link href="/Search">
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              Search
            </div>
          </Link>
        </li>
        <li>
          <Link href="/Inbox">
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              Inbox
            </div>
          </Link>
        </li>
        <li>
          <Link href="/Today">
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              Today
            </div>
          </Link>
        </li>
        <li>
          <Link href="/todolist">
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              To-do List
            </div>
          </Link>
        </li>
        <li>
          <Link href="/upcoming">
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              Upcoming
            </div>
          </Link>
        </li>
        <li>
          <Link href="/filters">
            <div className="hover:text-gray-400 bg-blue-500 text-white rounded-lg p-4 block text-center h-12 w-40">
              Filters
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
