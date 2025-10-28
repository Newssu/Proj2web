const Features: React.FC = () => (
  <section id="features" className="py-10">
    <div className="px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        {icon:"🚚", title:"ส่งไวทั่วไทย", desc:"แพ็กกันกระแทกอย่างดี ส่งถึงมือปลอดภัย", badge:"ส่งด่วนทั่วประเทศ ภายใน 2-3 วัน", badgeColor:"bg-yellow-500"},
        {icon:"🌱", title:"คุณภาพคัดเกรด", desc:"เลือกต้นไม้สุขภาพดีจากฟาร์มโดยตรง", badge:"รับประกันต้นไม้สดใหม่ทุกวัน", badgeColor:"bg-green-600"},
        {icon:"💳", title:"ชำระเงินง่าย", desc:"รองรับโอน/บัตร/เก็บปลายทาง*", badge:"ระบบปลอดภัย รองรับทุกธนาคาร", badgeColor:"bg-indigo-600"},
        {icon:"🔒", title:"ปลอดภัย", desc:"ข้อมูลลูกค้าถูกเก็บอย่างเป็นความลับ", badge:"ระบบเข้ารหัสมาตรฐานสากล", badgeColor:"bg-red-600"},
      ].map((f, i)=>(
        <div key={i} className="relative group p-5 rounded-2xl bg-white/80 dark:bg-gray-800/80 border border-emerald-100/70 dark:border-gray-800 shadow-sm hover:shadow-2xl transition">
          <p className="text-2xl">{f.icon}</p>
          <h3 className="mt-2 font-semibold">{f.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition duration-300">
            <div className={`${f.badgeColor} text-white text-base font-semibold rounded-lg px-4 py-2 shadow-lg whitespace-nowrap`}>
              {f.badge}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);
export default Features;
