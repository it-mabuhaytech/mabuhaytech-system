import React from 'react';
import Link from 'next/link';

export function WelcomePage() {

    return (
        <main className="flex-grow container mx-auto p-6">
        <section className="text-center my-10">
          <h2 className="text-4xl font-bold">Check the Health of Your Website</h2>
          <p className="mt-4 text-gray-600">Easily monitor your websites' uptime and performance.</p>
          <Link href="/health-checker">
            <div className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Get Started
            </div>
          </Link>
        </section>

        {/* <section id="features" className="mt-12">
          <h2 className="text-3xl font-bold text-center">Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Real-Time Monitoring</h3>
              <p className="mt-2 text-gray-600">Monitor your websites in real time and get instant notifications.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Detailed Reports</h3>
              <p className="mt-2 text-gray-600">Access detailed reports on uptime and response times.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
              <p className="mt-2 text-gray-600">An intuitive interface that is easy to navigate.</p>
            </div>
          </div>
        </section> */}
      </main>
    );
}
