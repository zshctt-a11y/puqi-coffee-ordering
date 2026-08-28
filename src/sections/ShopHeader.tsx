import { MapPin, Clock, Bell } from 'lucide-react'

export default function ShopHeader() {
  return (
    <header className="relative overflow-hidden bg-[#5B21B6] px-5 pb-6 pt-5 text-white">
      {/* 装饰圆斑 */}
      <div className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-[#7C3AED]/60" />
      <div className="pointer-events-none absolute -bottom-16 left-16 h-36 w-36 rounded-full bg-[#4C1D95]/80" />
      <div className="pointer-events-none absolute right-20 bottom-2 h-10 w-10 rounded-full bg-[#A78BFA]/30" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-[#DDD6FE]">GRAPE · COFFEE · TEA</p>
            <h1 className="mt-1 text-[26px] font-bold leading-tight">葡气咖啡</h1>
            <p className="mt-1 text-xs text-[#DDD6FE]">今日特调：巨峰葡萄季 · 全场上新</p>
          </div>
          <button
            type="button"
            aria-label="门店通知"
            className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition active:scale-90"
          >
            <Bell size={17} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-[#EDE9FE]">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1">
            <MapPin size={11} /> 自取 · 葡气大厦 1F 店
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1">
            <Clock size={11} /> 营业中 08:00–21:30
          </span>
        </div>
      </div>
    </header>
  )
}
