import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem } from '@/types'
import DrinkArt from '@/components/DrinkArt'

interface Props {
  items: CartItem[]
  total: number
  onClose: () => void
  onSetQty: (key: string, qty: number) => void
  onRemove: (key: string) => void
  onClear: () => void
  onCheckout: () => void
}

export default function CartSheet({
  items,
  total,
  onClose,
  onSetQty,
  onRemove,
  onClear,
  onCheckout,
}: Props) {
  return (
    <div className="absolute inset-0 z-40">
      <button
        type="button"
        aria-label="关闭购物车"
        className="anim-fade absolute inset-0 h-full w-full cursor-default bg-black/45"
        onClick={onClose}
      />
      <div className="anim-sheet absolute inset-x-0 bottom-0 flex max-h-[78%] flex-col rounded-t-3xl bg-[#F7F4FB] pt-3">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#DCD4EE]" />
        <div className="flex items-center justify-between px-5 pb-2">
          <h3 className="text-base font-bold text-[#241340]">购物车</h3>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs text-[#A79EC7] transition active:scale-95"
          >
            <Trash2 size={13} /> 清空
          </button>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto px-5 pb-4">
          {items.map((it) => (
            <div key={it.key} className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm">
              <div className="flex w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#F3EEFB] to-[#E9E1F8]">
                <DrinkArt art={it.art} size={40} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate text-sm font-bold text-[#241340]">{it.name}</p>
                  <button
                    type="button"
                    aria-label={`删除 ${it.name}`}
                    onClick={() => onRemove(it.key)}
                    className="shrink-0 text-[#C9C2DD] transition active:scale-90"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-[#8B84A3]">{it.specText}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <p className="text-[#5B21B6]">
                    <span className="text-[10px] font-semibold">¥</span>
                    <span className="text-base font-extrabold">{it.unitPrice * it.qty}</span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      aria-label="减少"
                      onClick={() => onSetQty(it.key, it.qty - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1ECFB] text-[#5B21B6] transition active:scale-90"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-4 text-center text-xs font-bold text-[#2E1065]">{it.qty}</span>
                    <button
                      type="button"
                      aria-label="增加"
                      onClick={() => onSetQty(it.key, it.qty + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5B21B6] text-white transition active:scale-90"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-[#EDE7F8] bg-white px-5 py-3">
          <p className="flex-1 text-[#241340]">
            <span className="text-xs text-[#8B84A3]">合计 </span>
            <span className="text-xs font-semibold text-[#5B21B6]">¥</span>
            <span className="text-2xl font-extrabold text-[#5B21B6]">{total}</span>
          </p>
          <button
            type="button"
            onClick={onCheckout}
            disabled={items.length === 0}
            className="h-11 rounded-full bg-[#5B21B6] px-7 text-sm font-bold text-white shadow-lg shadow-[#5B21B6]/30 transition active:scale-95 disabled:opacity-40"
          >
            去结算
          </button>
        </div>
      </div>
    </div>
  )
}
