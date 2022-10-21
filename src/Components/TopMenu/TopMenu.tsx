import { useState } from "react"
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom'
export default function TopMenu(){
    const [activeItem, setActiveItem] = useState<string>('Words')
    return (
      <div className="mb-4">
        <Navbar
            fluid={true}
            rounded={true}
            >
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                EngStudy
                </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link
                href="/navbars"
                active={true}
                >
                Home
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
      </div>
    )
}