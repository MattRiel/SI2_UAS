"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LucideLock, LucideUser, LucideLoader2, LucideAlertCircle } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post("http://localhost/api/login", { username, password });
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            router.push("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-slate-400">Login to manage your library assets.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center mb-6 text-red-400 text-sm">
                        <LucideAlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Username</label>
                        <div className="relative">
                            <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300">Password</label>
                        <div className="relative">
                            <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <LucideLoader2 className="w-5 h-5 animate-spin mr-2" /> : "Sign In"}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Don&apos;t have an account? <a href="/register" className="text-blue-400 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
}
