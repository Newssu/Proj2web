import type { User } from "../lib/types";

type Props = {
  searchTerm: string; setSearchTerm: (v: string) => void;
  onRecommend: () => void;
  onOpenCart: () => void;
  cartCount: number;
  currentUser: User | null;
  onLoginOpen: () => void;
  onLogout: () => void;
  filter: "all"|"low"|"high";
  setFilter: (f: "all"|"low"|"high") => void;
};

const Header: React.FC<Props> = ({
  searchTerm, setSearchTerm, onRecommend, onOpenCart, cartCount,
  currentUser, onLoginOpen, onLogout, filter, setFilter
}) => (
  <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/70 dark:bg-gray-900/60 border-b border-emerald-100/70 dark:border-gray-800">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <a href="#!" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-white font-bold shadow-lg">B</span>
          <span className="font-extrabold text-xl tracking-tight">Bloom</span>
        </a>

        <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <input
              type="text" placeholder="ค้นหาสินค้า…" value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-emerald-200/70 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 opacity-70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.4 5.4a7.5 7.5 0 0011.3 11.3z"/>
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl px-3 py-2 border border-emerald-200/70 bg-white/70 hover:bg-emerald-100 transition font-semibold flex items-center gap-1 dark:bg-gray-800/70 dark:border-gray-700 dark:hover:bg-gray-700"
                  onClick={onRecommend}>
            🌱 แนะนำต้นไม้ให้ฉัน
          </button>

          {currentUser ? (
            <>
              <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                สวัสดี, {currentUser.username}
              </span>
              <button className="rounded-xl px-3 py-2 border border-emerald-200/70 bg-white/70 hover:bg-emerald-100 transition font-semibold dark:bg-gray-800/70 dark:border-gray-700 dark:hover:bg-gray-700"
                      onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="rounded-xl px-3 py-2 border border-emerald-200/70 bg-white/70 hover:bg-emerald-100 transition font-semibold dark:bg-gray-800/70 dark:border-gray-700 dark:hover:bg-gray-700"
                    onClick={onLoginOpen}>
              🔒 เข้าสู่ระบบ
            </button>
          )}

          <button className="relative rounded-xl px-3 py-2 border border-emerald-200/70 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 hover:shadow-md transition"
                  onClick={onOpenCart} aria-label="Open cart">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a2 2 0 100-4 2 2 0 000 4zm8 2a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
            <span className="absolute -top-2 -right-2 text-xs bg-emerald-500 text-white rounded-full px-1.5 py-0.5 shadow">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* filter buttons (ย้ายมาอยู่ใน Header เพื่อไม่ปะปนกับ grid) */}
      <div className="hidden sm:flex items-center gap-2 py-2">
        {(["all","low","high"] as const).map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl border px-3 py-2 text-sm ${
              filter===f
                ? "bg-emerald-100 dark:bg-emerald-700 border-emerald-300 dark:border-emerald-600"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}>
            {f==="all" ? "ทั้งหมด" : f==="low" ? "ราคาต่ำ" : "ราคาสูง"}
          </button>
        ))}
      </div>
    </div>
  </header>
);
export default Header;
