const inputClass = 'border border-zinc-300 outline-none focus:border-transparent text-zinc-900 font-semibold text-sm rounded-lg w-full p-2.5 px-8';

export default function InputWithIcon({ icon: Icon, type = 'text', ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />}
      <input type={type} className={inputClass} {...props} />
    </div>
  );
}
