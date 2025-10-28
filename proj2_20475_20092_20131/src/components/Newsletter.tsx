const Newsletter: React.FC = () => (
  <section className="py-10">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-emerald-600 text-white p-8 sm:p-10 shadow-xl grid lg:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-extrabold">รับคูปองส่วนลด 10%</h3>
          <p className="mt-1 text-white/90">สมัครรับข่าวสาร โปรดี ๆ มีทุกสัปดาห์</p>
        </div>
        <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
          <input type="email" placeholder="อีเมลของคุณ"
                 className="flex-1 rounded-xl px-4 py-3 text-gray-900 focus:outline-none" required/>
          <button type="submit" className="rounded-xl bg-white text-emerald-700 font-semibold px-5 py-3 hover:shadow">
            สมัคร
          </button>
        </form>
      </div>
    </div>
  </section>
);
export default Newsletter;
