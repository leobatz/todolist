import { TriangleAlert } from 'lucide-react';

function WarningAlert({ message, animacao }) {
    return (
        <div className={`flex gap-2 items-center justify-center p-3 bg-yellow-200 rounded-[10px] ${animacao}`}>
            <TriangleAlert className='text-yellow-500'/>
            <h2 className='text-yellow-500 font-google'>{message}</h2>
        </div>
    )
}

export default WarningAlert