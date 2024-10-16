import React from "react";

export function Footer(){
    return (
        <footer className="bg-white w-full p-4">
            <div className="container mx-auto text-center">
            <p className="text-gray-600">&copy; {new Date().getFullYear()} MabuhayTech Health Checker. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;