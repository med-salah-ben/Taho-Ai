"use client";

import "./globals.css";
// import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <title>Taho AI</title>
      </head>
      <body className="flex h-screen w-full bg-gray-100">
        <aside className="w-64 bg-[#ececec] p-4 border-r hidden md:flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Taho AI</h2>
          <nav className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              {"Aujourd'hui"}
            </h3>
            <ul className="text-sm text-gray-700">
              <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                What is React
              </li>
              <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                What is Python
              </li>
              <li className="py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer">
                Explain is FastApi
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center">
          {/* <SessionProvider> */}
            {children}
          {/* </SessionProvider> */}
        </main>
      </body>
    </html>
  );
}
