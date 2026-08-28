import { ShoppingCart } from 'lucide-react'

interface Props {
  count: number
  total: number
  bump: number
  onOpenCart: () => void
  onCheckout: () => void
}

export default function CartBar({ count, total, bump, onOpenCart, onCheckout }: Props) {
  const empty = count === 0
  return (
    <div className="absolute inset-x-4 bottom-4 z-30">
      <div className="flex h-14 items-center gap-3 rounded-full bg-[#241340] pl-2 pr-2 shadow-xl shadow-[#2E1065]/40">
        <button
          type="button"
          aria-label="打开购物车"
          onClick={onOpenCart}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#5B21B6] text-white transition active:scale-90"
        >
          <ShoppingCart size={19} />
          {!empty && (
            <span
              key={bump}
              className="anim-bump absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F97316] px-1 text-[10px] font-bold text-white"
            >
              {count > 99 ? '99+' : count}
            </span>
          )}
        </button>
        <div className="min-w-0 flex-1 text-white">
          {empty ? (
            <p className="text-xs text-[#A79EC7]">购物车是空的，去挑一杯吧</p>
          ) : (
            <p>
              <span className="text-xs font-semibold">¥</span>
              <span className="text-xl font-extrabold tracking-tight">{total}</span>
              <span className="ml-2 text-[10px] text-[#A79EC7]">共 {count} 杯</span>
            </p>
          )}
        </div>
        <button
          type="button"
          disabled={empty}
          onClick={onCheckout}
          className={`h-11 shrink-0 rounded-full px-5 text-sm font-bold transition active:scale-95 ${
            empty
              ? 'bg-white/10 text-white/40'
              : 'bg-white text-[#4C1D95] shadow-md'
          }`}
        >
          去结算
        </button>
      </div>
    </div>
  )
}
