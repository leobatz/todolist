import { Check } from 'lucide-react';

function SuccessAlert({ message, animacao }) {
    return (
        <div className={`flex gap-2 items-center justify-center p-3 bg-green-200 rounded-[10px] ${animacao}`}>
            <Check className='text-green-500'/>
            <h2 className='text-green-500 font-google'>{message}</h2>
        </div>
    )
}

export default SuccessAlert