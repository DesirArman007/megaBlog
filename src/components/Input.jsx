import React, {useId} from 'react'

const Input=React.forwardRef( function Input({
    label,
    type="text",
    className="",
    autocomplete = "on",
    ...props
},ref) {

    const id=useId()
    return (
        <div className='w-full'>
            {label && (<label 
            className='inline-block mb-1'
            htmlFor={id}>
                {label}
            </label>)
            }
            <input
            type={type}
            className={` px-3 py-2 rounded-lg bg-white
                text-black outiline-none focus:bg-gray-50
                duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                autoComplete={autocomplete}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;