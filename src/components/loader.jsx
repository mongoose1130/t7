import { FcInfo } from "react-icons/fc";

export default function Loader() {
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 rounded-md bg-blue-50 p-4 mt-12">
            <div className="flex">
                <div className="flex-shrink-0">
                    <FcInfo className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">Fetching Information...Be Right There!</p>
                </div>
            </div>
        </div>
    )
}