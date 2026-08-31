import { X } from 'lucide-react';

function ErrorAlert({ message, animacao }) {
    return (
        <div className={`flex gap-2 items-center justify-center p-3 bg-red-200 rounded-[10px] ${animacao}`}>
            <X className='text-red-500'/>
            <h2 className='text-red-500 font-google'>{message}</h2>
        </div>
    )
}

export default ErrorAlert