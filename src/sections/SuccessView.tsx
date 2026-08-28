import type { Order } from '@/types'

interface Props {
  order: Order
  onAgain: () => void
}

export default function SuccessView({ order, onAgain }: Props) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[#F7F4FB] px-5 pb-10 pt-14">
      {/* 成功标识 */}
      <div className="anim-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#5B21B6] shadow-xl shadow-[#5B21B6]/30">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
          <path d="M4 12.5 L10 18.5 L20 6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="mt-5 text-center text-xl font-bold text-[#241340]">下单成功</h2>
      <p className="mt-1 text-center text-xs text-[#8B84A3]">制作完成后请到吧台凭取餐号取餐</p>

      {/* 取餐号 */}
      <div className="mt-6 rounded-3xl bg-[#5B21B6] px-6 py-7 text-center text-white shadow-xl shadow-[#5B21B6]/25">
        <p className="text-[11px] tracking-[0.4em] text-[#DDD6FE]">取 餐 号</p>
        <p className="mt-2 text-6xl font-extrabold tracking-[0.15em]">{order.pickupNo}</p>
        <p className="mt-3 text-[11px] text-[#DDD6FE]">葡气咖啡 · 葡气大厦 1F 店 · 自取</p>
      </div>

      {/* 订单摘要 */}
      <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#241340]">订单详情</h3>
          <span className="text-[10px] text-[#A79EC7]">{order.time}</span>
        </div>
        <div className="space-y-2">
          {order.items.map((it) => (
            <div key={it.key} className="flex items-baseline justify-between gap-2 text-xs">
              <div className="min-w-0">
                <span className="font-semibold text-[#241340]">{it.name}</span>
                <span className="ml-1.5 text-[#A79EC7]">×{it.qty}</span>
                <p className="line-clamp-1 text-[10px] text-[#B9B1D1]">{it.specText}</p>
              </div>
              <span className="shrink-0 font-bold text-[#4C1D95]">¥{it.unitPrice * it.qty}</span>
            </div>
          ))}
        </div>
        {order.remark && (
          <p className="mt-2 rounded-lg bg-[#F7F4FB] px-2.5 py-1.5 text-[11px] text-[#6B6480]">
            备注：{order.remark}
          </p>
        )}
        <div className="mt-3 flex justify-between border-t border-dashed border-[#E4DEF2] pt-2.5 text-sm">
          <span className="text-[#8B84A3]">共 {order.count} 杯 · 实付</span>
          <span className="font-extrabold text-[#5B21B6]">¥{order.total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onAgain}
        className="mt-6 h-12 w-full rounded-full bg-[#5B21B6] text-sm font-bold text-white shadow-lg shadow-[#5B21B6]/30 transition active:scale-[0.97]"
      >
        再来一单
      </button>
      <p className="mt-4 text-center text-[10px] tracking-widest text-[#B9B1D1]">
        — 感谢惠顾 · 葡气满满的一天 —
      </p>
    </div>
  )
}
