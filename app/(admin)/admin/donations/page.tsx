import { connectDB } from "@/lib/db";
import Donation from "@/lib/models/Donation";

export default async function AdminDonations() {
    await connectDB();
    const donations = await Donation.find().sort({ createdAt: -1 }).lean();

    // 1. Calculations placed here
    const total = donations.reduce((acc: number, curr: any) => acc + curr.amount, 0);
    const totalOnce = donations
        .filter((d: any) => d.frequency === 'once')
        .reduce((a, b: any) => a + b.amount, 0);
    const totalMonthly = donations
        .filter((d: any) => d.frequency === 'monthly')
        .reduce((a, b: any) => a + b.amount, 0);

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-black">Donation Analytics</h1>
                <p className="text-slate-500">Track your NGO's financial support and donor frequency.</p>
            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="rounded-[2rem] bg-primary p-8 text-white shadow-xl shadow-primary/20">
                    <p className="text-sm font-bold uppercase opacity-80">Total Funds Raised</p>
                    <h2 className="text-5xl font-black mt-2">${total.toLocaleString()}</h2>
                </div>
                <div className="rounded-[2rem] border bg-white p-8 dark:bg-slate-900 flex flex-col justify-center">
                    <p className="text-sm font-bold uppercase text-slate-500">Total Transactions</p>
                    <h2 className="text-5xl font-black mt-2">{donations.length}</h2>
                </div>
            </div>

            {/* 2. Breakdown Stats Bar */}
            <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="p-6 rounded-[1.5rem] border bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs font-bold text-slate-400 uppercase">One-time</p>
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200">${totalOnce.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-[1.5rem] border bg-slate-50 dark:bg-slate-800/50">
                    <p className="text-xs font-bold text-slate-400 uppercase">Monthly Recurring</p>
                    <p className="text-xl font-bold text-primary">${totalMonthly.toLocaleString()}</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-[2rem] border bg-white overflow-hidden dark:bg-slate-900">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th className="p-6 text-xs font-bold uppercase">Donor</th>
                            <th className="p-6 text-xs font-bold uppercase">Type</th>
                            <th className="p-6 text-xs font-bold uppercase">Amount</th>
                            <th className="p-6 text-xs font-bold uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {donations.map((d: any) => (
                            <tr key={d._id.toString()} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="p-6">
                                    <p className="font-bold">{d.donorName}</p>
                                    <p className="text-xs text-slate-400">{d.email}</p>
                                </td>
                                <td className="p-6">
                                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${d.frequency === 'monthly'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {d.frequency}
                                    </span>
                                </td>
                                <td className="p-6 font-black text-green-600">${d.amount}</td>
                                <td className="p-6 text-sm text-slate-500">
                                    {new Date(d.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}