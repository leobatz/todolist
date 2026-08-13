import { ChevronFirst } from "lucide-react";

export default function Sidebar({ children }) {
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="" alt="logo" className="w-32" />
                    <button className="p-1.5 rounded-lg">
                        <ChevronFirst />
                    </button>
                </div>

                <ul></ul>
            </nav>
        </aside>
    )
}