export default function FormCard({ title, children, logo = '/img/logo_daaltex.png' }) {
  return (
    <div className="bg-white/90 p-8 rounded-xl shadow-md border border-[#E8E4DF] sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto mt-4 mb-4">
      <div className="flex items-center justify-center mb-4">
        <img src={logo} alt="Logo" className="w-8 h-8 mr-2" onError={(e) => { e.target.style.display = 'none'; }} />
        <h1 className="text-[#5C6B7A] text-center text-2xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
}
