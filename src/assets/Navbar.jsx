import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between mb-16">
      <div className="text-sm font-medium text-gray-700">
        Satwik Shekhar
      </div>

      <ul className="flex items-center gap-8 text-sm text-gray-700">
        <li>
          <a href="#" className="hover:text-yellow-600 transition">
            About
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-yellow-600 transition">
            Projects
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-yellow-600 transition">
            Contacts
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
