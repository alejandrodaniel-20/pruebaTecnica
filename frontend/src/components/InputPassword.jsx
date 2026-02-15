import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

const inputClass = 'border border-[#E8E4DF] outline-none focus:ring-2 focus:ring-[#B8D4E8] focus:border-transparent text-[#5C6B7A] font-medium text-sm rounded-lg w-full p-2.5 px-8';

export default function InputPassword({ ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input type={show ? 'text' : 'password'} className={inputClass} {...props} />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9BA8B5] hover:text-[#5C6B7A]"
      >
        {show ? <RiEyeOffLine className="text-lg" /> : <RiEyeLine className="text-lg" />}
      </button>
    </div>
  );
}
