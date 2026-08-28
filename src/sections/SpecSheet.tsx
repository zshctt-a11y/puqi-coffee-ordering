import { useMemo, useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import type { Product, SpecSelection } from '@/types'
import { SUGAR_OPTIONS, ICE_OPTIONS, addonsFor } from '@/types'
import { defaultSpec, unitPriceOf } from '@/hooks/useCart'
import DrinkArt from '@/components/DrinkArt'

interface Props {
  product: Product
  onClose: () => void
  onAdd: (p: Product, spec: SpecSelection, qty: number) => void
}

function OptionChip({
  label,
  active,
  sub,
  onClick,
}: {
  label: string
  active: boolean
  sub?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-xs font-medium transition-all active:scale-95 ${
        active
          ? 'bg-[#5B21B6] text-white shadow-md shadow-[#5B21B6]/25'
          : 'bg-[#F1ECFB] text-[#4B4265]'
      }`}
    >
      {label}
      {sub && <span className={`ml-1 text-[10px] ${active ? 'text-[#DDD6FE]' : 'text-[#A79EC7]'}`}>{sub}</span>}
    </button>
  )
}

export default function SpecSheet({ product, onClose, onAdd }: Props) {
  const [spec, setSpec] = useState<SpecSelection>(() => defaultSpec())
  const [qty, setQty] = useState(1)
  const addons = useMemo(() => addonsFor(product), [product])
  const unit = unitPriceOf(product, spec)

  const toggleAddon = (id: string) =>
    setSpec((s) => ({
      ...s,
      addOns: s.addOns.includes(id) ? s.addOns.filter((a) => a !== id) : [...s.addOns, id],
    }))

  return (
    <div className="absolute inset-0 z-40">
      <button
        type="button"
        aria-label="关闭"
        className="anim-fade absolute inset-0 h-full w-full cursor-default bg-black/45"
        onClick={onClose}
      />
      <div className="anim-sheet absolute inset-x-0 bottom-0 max-h-[86%] overflow-y-auto rounded-t-3xl bg-white px-5 pb-6 pt-4">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#E4DEF2]" />

        {/* 商品头 */}
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F3EEFB] to-[#E9E1F8]">
            <DrinkArt art={product.art} size={56} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#241340]">{product.name}</h3>
            <p className="mt-0.5 line-clamp-2 text-[11px] text-[#8B84A3]">{product.desc}</p>
            <p className="mt-1 text-[#5B21B6]">
              <span className="text-xs font-semibold">¥</span>
              <span className="text-2xl font-extrabold">{unit}</span>
              <span className="ml-1 text-[10px] text-[#A79EC7]">/ 杯</span>
            </p>
          </div>
          <button
            type="button"
            aria-label="关闭规格弹窗"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1ECFB] text-[#6B6480] transition active:scale-90"
          >
            <X size={16} />
          </button>
        </div>

        {/* 杯型 */}
        <Section title="杯型">
          <OptionChip
            label="中杯"
            sub="+0"
            active={spec.size === '中杯'}
            onClick={() => setSpec((s) => ({ ...s, size: '中杯' }))}
          />
          <OptionChip
            label="大杯"
            sub="+3"
            active={spec.size === '大杯'}
            onClick={() => setSpec((s) => ({ ...s, size: '大杯' }))}
          />
        </Section>

        {/* 糖度 */}
        <Section title="糖度">
          {SUGAR_OPTIONS.map((o) => (
            <OptionChip
              key={o}
              label={o}
              active={spec.sugar === o}
              onClick={() => setSpec((s) => ({ ...s, sugar: o }))}
            />
          ))}
        </Section>

        {/* 冰度 */}
        <Section title="冰度">
          {ICE_OPTIONS.map((o) => (
            <OptionChip
              key={o}
              label={o}
              active={spec.ice === o}
              onClick={() => setSpec((s) => ({ ...s, ice: o }))}
            />
          ))}
        </Section>

        {/* 去奶盖 */}
        {product.hasCheeseCap && (
          <Section title="奶盖">
            <OptionChip
              label="正常奶盖"
              active={!spec.noCheeseCap}
              onClick={() => setSpec((s) => ({ ...s, noCheeseCap: false }))}
            />
            <OptionChip
              label="去奶盖"
              active={spec.noCheeseCap}
              onClick={() => setSpec((s) => ({ ...s, noCheeseCap: true }))}
            />
          </Section>
        )}

        {/* 加料 */}
        <Section title="加料">
          {addons.map((a) => (
            <OptionChip
              key={a.id}
              label={a.name}
              sub={`+${a.price}`}
              active={spec.addOns.includes(a.id)}
              onClick={() => toggleAddon(a.id)}
            />
          ))}
        </Section>

        {/* 数量 + 加入购物车 */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full bg-[#F1ECFB] px-2 py-1.5">
            <button
              type="button"
              aria-label="减少数量"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#5B21B6] shadow-sm transition active:scale-90 disabled:opacity-40"
              disabled={qty <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center text-sm font-bold text-[#2E1065]">{qty}</span>
            <button
              type="button"
              aria-label="增加数量"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#5B21B6] shadow-sm transition active:scale-90"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onAdd(product, spec, qty)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#5B21B6] text-sm font-bold text-white shadow-lg shadow-[#5B21B6]/30 transition active:scale-[0.97]"
          >
            加入购物车
            <span className="text-[#DDD6FE]">¥{unit * qty}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h4 className="mb-2 text-xs font-bold text-[#4B4265]">{title}</h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
