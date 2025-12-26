"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-900 text-slate-100 min-h-screen selection:bg-blue-500/30`}>
                <nav className="border-b border-slate-800 p-4 sticky top-0 bg-slate-900/80 backdrop-blur-md z-[60]">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent cursor-pointer" onClick={() => router.push("/")}>
                            SI2 UAS
                        </h1>
                        <div className="flex items-center space-x-8 text-sm font-medium">
                            <a href="/" className="text-slate-400 hover:text-white transition-colors">Home</a>
                            {user?.role === 'admin' && (
                                <a href="/dashboard" className="text-slate-400 hover:text-white transition-colors">Dashboard</a>
                            )}
                            <a href="/books" className="text-slate-400 hover:text-white transition-colors">Books</a>
                            <a href="/gallery" className="text-slate-400 hover:text-white transition-colors">Gallery</a>

                            {user ? (
                                <div className="flex items-center space-x-4 pl-4 border-l border-slate-800">
                                    <span className="text-slate-500">Hi, <span className="text-slate-200 capitalize">{user.username}</span></span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all text-xs"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => router.push("/login")}
                                    className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 font-bold active:scale-95"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
                <main className="container mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </main>
            </body>
        </html>
    );
}
