const Hero: React.FC = () => (
  <section className="relative">
    <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
            🌿 คอลเลกชันใหม่ Spring
          </span>
          <h1 className="mt-4 dark:text-gray-100 text-4xl sm:text-5xl font-extrabold tracking-tight">
            แต่งบ้านให้สดชื่น ด้วย <span className="text-emerald-600">ต้นไม้ฟีลมินิมอล</span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-xl">
            "Bloom" คือคำตอบสำหรับคนที่กำลังมองหาความสดชื่นให้กับบ้าน
             เราคัดสรรต้นไม้ฟิลมินิมอลที่เข้ากับการตกแต่งทุกสไตล์
             พื่อให้บ้านของคุณไม่ใช่แค่ที่อยู่อาศัย
             ต่เป็นพื้นที่ที่เต็มไปด้วยชีวิตชีวาและความสุข
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#products" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold shadow-lg hover:bg-emerald-700">เลือกซื้อเลย</a>
            <a href="#features" className="inline-flex items-center justify-center rounded-xl bg-emerald-200 border border-emerald-300/70 px-5 py-3 font-semibold hover:shadow dark:text-gray-800">ดูฟีเจอร์</a>
          </div>
          <div className="mt-6 flex gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>จัดส่งภายใน 48 ชม.</span>
            <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500"></span>การันตีความพอใจ 7 วัน</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/2] rounded-3xl overflow-hidden shadow-xl ring-1 ring-emerald-200/60">
            <img src="https://images7.alphacoders.com/878/thumb-1920-878137.jpg" alt="Plant hero" className="h-full w-full object-cover"/>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl ring-1 ring-emerald-200/60 p-4 flex items-center gap-3">
            <img src="https://allaboutplanties.com/cdn/shop/files/Monstera_Adansonii_Swiss_Cheese_Plant.webp?v=1740279995&width=576" className="h-12 w-12 rounded-xl object-cover" alt="Mini plant"/>
            <div><p className="font-semibold">Monstera Adansonii</p><p className="text-sm text-gray-500">ขายดีอันดับ 1</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default Hero;
