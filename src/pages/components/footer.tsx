import React from "react";

export function Footer(){
    return (
        <footer className="bg-slate-600 w-full p-4 sticky top-0">
            <div className="container h-5 mx-auto text-center">
            <p className="text-white">&copy; {new Date().getFullYear()} MabuhayTech Health Checker. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;