import { useEffect, useState, useRef } from "react";
import { getCustomers } from "../services/FakeApi.js";
import Detail from "./detail.jsx";
import Loader from "./loader.jsx";

export default function Body() {
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [sel_customer, setSelCustomer] = useState(null);
    const [customers, setCustomers] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        async function fetchCustomers() {
            const data = await getCustomers();
            setCustomers(data);
        }

        fetchCustomers()
            .then(() => setIsLoading(false));

    }, []);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-8 border-b border-gray-600">
                    <div className="my-6 overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-300 dark:bg-gray-500">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-300 sm:pl-6">
                                        Customer Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-right">
                                        Last Purchase
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 dark:text-gray-300 text-right">
                                        Total Rewards
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-400 bg-white dark:bg-gray-700">
                                {customers.map((customer) => (
                                    <tr key={customer.id}
                                        className="hover:bg-green-400 dark:hover:bg-green-900 cursor-pointer"
                                        onClick={() => {
                                            setSelCustomer(customer);
                                            setModalOpen(true);
                                        }}
                                    >
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-200 sm:pl-6">
                                            {customer.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200 text-right">
                                            {customer.date}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-200 text-right">
                                            {customer.rewards}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpen && (
                        <div className="fixed inset-0 top-20 flex items-center justify-center z-10">
                            <div className="bg-gray-800 bg-opacity-50 absolute inset-0 transition-opacity duration-500"></div>
                            <div
                                ref={modalRef}
                                className="bg-white dark:bg-gray-950 rounded-lg p-4 z-20 text-right transform transition-transform duration-500 max-h-screen overflow-y-auto"
                            >
                                <button
                                    type="button"
                                    className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                                    onClick={() => {
                                        setModalOpen(false);
                                        setSelCustomer(null);
                                    }}
                                >
                                    &times;
                                </button>
                                <Detail customerObj={sel_customer} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}