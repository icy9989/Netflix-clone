interface InputProps {
  id: string
  type?: string
  label: string
  value: string
  onChange: any
}

const Input:React.FC<InputProps> = ({ id, type, label, value, onChange }) => {
  return (
    <div className="relative">
        <input
            id={id}
            type={type}
            className="
              w-full
            text-white
              text-sm
            bg-neutral-700 
              px-6 
              pt-6 
              pb-1 
              rounded-md 
              outline-none
              peer
            " 
            value={value}
            onChange={onChange}
            placeholder=""
        />
        <label
          htmlFor="email"
          className="
            absolute
            top-4
            left-6
            text-zinc-400
            text-sm
            origin-[0]
            transform 
            -translate-y-3 
            scale-75
            duration-150
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75
            peer-focus:-translate-y-3
          "
        >
          {label}
        </label>
    </div>
  )
}

export default Input