import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Admin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRegistrations(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0a0a0a] pt-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-cinematic text-white mb-8">Admin Dashboard</h1>

                    {loading ? (
                        <div className="text-white">Loading data...</div>
                    ) : error ? (
                        <div className="text-red-500 bg-red-900/20 p-4 rounded border border-red-500/50">
                            Error loading data: {error}
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white/5 rounded-lg border border-white/10">
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="bg-white/10 text-xs uppercase font-bold text-white">
                                    <tr>
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4">Phone</th>
                                        <th className="px-6 py-4">College</th>
                                        <th className="px-6 py-4">Dept/Year</th>
                                        <th className="px-6 py-4">Events</th>
                                        <th className="px-6 py-4">Payment</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {registrations.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-8 text-center text-gray-400">
                                                No registrations found yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        registrations.map((reg) => (
                                            <tr key={reg.id} className="hover:bg-white/5 transition">
                                                <td className="px-6 py-4 font-medium text-white">{reg.full_name}</td>
                                                <td className="px-6 py-4">{reg.email}</td>
                                                <td className="px-6 py-4">{reg.phone}</td>
                                                <td className="px-6 py-4">{reg.college}</td>
                                                <td className="px-6 py-4">{reg.department} ({reg.year})</td>
                                                <td className="px-6 py-4 max-w-xs truncate" title={JSON.stringify(reg.selected_events)}>
                                                    {/* Attempt to display nicely if it's an array, else raw */}
                                                    {Array.isArray(reg.selected_events)
                                                        ? reg.selected_events.join(', ')
                                                        : JSON.stringify(reg.selected_events)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${reg.payment_method === 'college' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                                                        }`}>
                                                        {reg.payment_method === 'college' ? 'Cash' : 'Online'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-white">₹{reg.total_amount}</td>
                                                <td className="px-6 py-4 text-gray-400">
                                                    {new Date(reg.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Admin;
