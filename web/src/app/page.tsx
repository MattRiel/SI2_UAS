import Image from "next/image";

export default function Home() {
    return (
        <div className="space-y-12">
            <section className="text-center py-20 bg-slate-800/50 rounded-3xl border border-slate-700 backdrop-blur-sm">
                <h2 className="text-5xl font-extrabold mb-4">Welcome to SI2 UAS</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    The modernized library management system built with Laravel 12 and Next.js 14.
                    Manage your books, gallery, and users with industrial-standard technology.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { title: "Secure Access", desc: "JWT-based authentication with role-based access control.", icon: "🔐" },
                    { title: "Cloud Storage", desc: "Store your images securely in MinIO S3-compatible storage.", icon: "☁️" },
                    { title: "Fast API", desc: "High-performance REST API powered by Laravel 12.", icon: "⚡" },
                ].map((feat) => (
                    <div key={feat.title} className="p-8 bg-slate-800/30 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors group">
                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{feat.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                        <p className="text-slate-400 text-sm">{feat.desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
