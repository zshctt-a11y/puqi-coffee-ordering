import { ChevronLeft, MapPin, StickyNote } from 'lucide-react'
import type { CartItem } from '@/types'
import DrinkArt from '@/components/DrinkArt'

interface Props {
  items: CartItem[]
  total: number
  count: number
  pickupNo: string
  remark: string
  onRemark: (v: string) => void
  onBack: () => void
  onSubmit: () => void
}

export default function CheckoutView({
  items,
  total,
  count,
  pickupNo,
  remark,
  onRemark,
  onBack,
  onSubmit,
}: Props) {
  return (
    <div className="flex h-full flex-col bg-[#F7F4FB]">
      <header className="flex items-center gap-2 bg-white px-4 py-3.5 shadow-sm">
        <button
          type="button"
          aria-label="返回菜单"
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F1ECFB] text-[#4C1D95] transition active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-base font-bold text-[#241340]">确认订单</h2>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 pb-28">
        {/* 自取信息 */}
        <div className="rounded-2xl bg-[#5B21B6] p-4 text-white shadow-lg shadow-[#5B21B6]/25">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#DDD6FE]">自取门店</p>
              <p className="mt-0.5 flex items-center gap-1 text-sm font-bold">
                <MapPin size={14} /> 葡气咖啡 · 葡气大厦 1F 店
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#DDD6FE]">预计取餐号</p>
              <p className="mt-0.5 text-3xl font-extrabold tracking-widest">{pickupNo}</p>
            </div>
          </div>
          <p className="mt-3 border-t border-white/15 pt-2 text-[11px] text-[#DDD6FE]">
            下单后约 5–8 分钟可取，请留意叫号屏
          </p>
        </div>

        {/* 商品清单 */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-bold text-[#241340]">商品清单 · {count} 杯</h3>
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.key} className="flex items-center gap-3">
                <div className="flex w-11 shrink-0 items-center justify-center rounded-lg bg-[#F3EEFB] py-1">
                  <DrinkArt art={it.art} size={30} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[#241340]">{it.name}</p>
                  <p className="line-clamp-1 text-[10px] text-[#8B84A3]">{it.specText}</p>
                </div>
                <p className="shrink-0 text-xs text-[#8B84A3]">×{it.qty}</p>
                <p className="w-14 shrink-0 text-right text-[13px] font-bold text-[#4C1D95]">
                  ¥{it.unitPrice * it.qty}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-dashed border-[#E4DEF2] pt-3 text-sm">
            <span className="text-[#8B84A3]">合计</span>
            <span className="font-extrabold text-[#5B21B6]">¥{total}</span>
          </div>
        </div>

        {/* 备注 */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-[#241340]">
            <StickyNote size={14} className="text-[#7C3AED]" /> 订单备注
          </h3>
          <textarea
            value={remark}
            onChange={(e) => onRemark(e.target.value)}
            maxLength={50}
            placeholder="口味偏好、过敏原等，50 字以内"
            className="h-20 w-full resize-none rounded-xl bg-[#F7F4FB] p-3 text-xs text-[#241340] outline-none placeholder:text-[#B9B1D1] focus:ring-2 focus:ring-[#7C3AED]/40"
          />
          <p className="mt-1 text-right text-[10px] text-[#B9B1D1]">{remark.length}/50</p>
        </div>
      </div>

      {/* 提交栏 */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-[#EDE7F8] bg-white px-5 py-3">
        <p className="flex-1 text-[#241340]">
          <span className="text-xs text-[#8B84A3]">应付 </span>
          <span className="text-xs font-semibold text-[#5B21B6]">¥</span>
          <span className="text-2xl font-extrabold text-[#5B21B6]">{total}</span>
        </p>
        <button
          type="button"
          onClick={onSubmit}
          className="h-11 rounded-full bg-[#5B21B6] px-7 text-sm font-bold text-white shadow-lg shadow-[#5B21B6]/30 transition active:scale-95"
        >
          提交订单
        </button>
      </div>
    </div>
  )
}
