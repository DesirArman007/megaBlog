import React, {useId} from 'react'

function Select({
    options,
    label,
    className,
    ...props

},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black oultine-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
 {/* options dene hai aur yaha options as array milta hai ...toh ham yaha bydefault array lelenge to avoid any errors          */}
        {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
        ))}
        </select>
    </div>
  )
}
// Select elemet ko separately banaya hai toh isko forward ref dena padega...toh aise export krte time direct wrap kr sakte hai..export default React.forwardRef(Select)
export default React.forwardRef(Select)