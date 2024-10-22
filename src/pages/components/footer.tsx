import React from "react";

export function Footer(){
    return (
        <footer className="bg-slate-600 w-full p-4 sticky bottom-0 z-10">
            <div className="container h-5 mx-auto text-center">
            <p className="text-white">&copy; {new Date().getFullYear()} MabuhayTech Health Checker. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;