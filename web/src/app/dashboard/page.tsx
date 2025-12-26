"use client";

import { useEffect, useState } from "react";
import api from "../../lib/api";
import { LucideBook, LucideImage, LucideUsers, LucideArrowUpRight, LucideClock, LucideLoader2 } from "lucide-react";

interface Stats {
    books: number;
    images: number;
    users: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats>({ books: 0, images: 0, users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/stats");
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const cards = [
        { title: "Total Books", value: stats.books, icon: LucideBook, color: "text-blue-400", bg: "bg-blue-500/10" },
        { title: "Gallery Items", value: stats.images, icon: LucideImage, color: "text-purple-400", bg: "bg-purple-500/10" },
        { title: "Total Users", value: stats.users, icon: LucideUsers, color: "text-green-400", bg: "bg-green-500/10" },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-40">
                <LucideLoader2 className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-bold">Admin Dashboard</h2>
                <p className="text-slate-400">Overview of the library system status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cards.map((card) => (
                    <div key={card.title} className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden group">
                        <div className={`inline-flex p-4 rounded-2xl ${card.bg} mb-6`}>
                            <card.icon className={`w-8 h-8 ${card.color}`} />
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-slate-400 text-sm font-medium mb-1">{card.title}</p>
                                <p className="text-4xl font-bold">{card.value}</p>
                            </div>
                            <LucideArrowUpRight className="w-6 h-6 text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                        {/* Decorative background gradient */}
                        <div className={`absolute -right-12 -bottom-12 w-40 h-40 rounded-full blur-3xl opacity-10 ${card.color.replace('text', 'bg')}`} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center">
                            <LucideClock className="w-5 h-5 mr-3 text-blue-400" />
                            Recent Activities
                        </h3>
                        <button className="text-blue-400 text-sm hover:underline">View all</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center p-4 bg-slate-900/40 rounded-2xl border border-slate-700/50">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-4" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New book added: "Cerdas Tidak Cermat"</p>
                                    <p className="text-xs text-slate-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800/40 border border-slate-700 p-8 rounded-3xl backdrop-blur-md">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold flex items-center">
                            <LucideUsers className="w-5 h-5 mr-3 text-purple-400" />
                            Quick Actions
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl text-blue-400 hover:bg-blue-600/20 transition-all text-left font-medium">
                            Create User
                        </button>
                        <button className="p-4 bg-purple-600/10 border border-purple-500/20 rounded-2xl text-purple-400 hover:bg-purple-600/20 transition-all text-left font-medium">
                            Export SQL
                        </button>
                        <button className="p-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl text-slate-400 hover:bg-slate-900 transition-all text-left font-medium">
                            System Settings
                        </button>
                        <button className="p-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl text-slate-400 hover:bg-slate-900 transition-all text-left font-medium">
                            View Logs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
