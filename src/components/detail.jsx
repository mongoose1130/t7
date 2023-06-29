import { useEffect, useState } from "react";
import Loader from "./loader.jsx";
import { fetchDetail } from "../services/FakeApi.js";

export default function Detail({ customerObj }) {
    const [isLoading, setIsLoading] = useState(true);
    const [custTrans, setCustTrans] = useState(null);

    useEffect(() => {
        async function loadDetail(customerObj) {
            const data = await fetchDetail(customerObj);
            setCustTrans(data);
        }

        loadDetail(customerObj)
            .then(() => setIsLoading(false));

    }, [customerObj]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="mx-auto max-w-7xl px-2 sm:px-2 lg:px-8">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-left font-semibold leading-7 text-gray-900 dark:text-gray-200">{customerObj.name}</h3>
                        <p className="text-left mt-1 max-w-2xl text-sm leading-6 text-gray-500">Transaction History</p>
                    </div>
                    <div className="mt-6 border-t border-gray-300 dark:border-gray-600">
                        <dl className="divide-y divide-gray-300  dark:divide-gray-700">
                            {custTrans.length === 0 ? (
                                <div className="pt-6 text-sm font-medium leading-6 text-gray-700 dark:text-gray-400">
                                    No transactions found.
                                </div>
                            ) : (
                                custTrans.map((transaction) => (
                                    <div key={transaction.id} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                            Date:
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                                            {transaction.date}
                                        </dd>
                                        <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                            Amount:
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                                            ${transaction.amount}
                                        </dd>
                                        <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                            Points Earned:
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                                            {transaction.rewards}
                                        </dd>
                                    </div>
                                ))
                            )}
                        </dl>
                    </div>
                </div>
            )}
        </>
    )
}