import { Plus } from 'lucide-react'
import type { Product } from '@/types'
import DrinkArt from '@/components/DrinkArt'

interface Props {
  categories: readonly string[]
  products: Product[]
  activeCategory: string
  onSelectCategory: (c: string) => void
  onPick: (p: Product) => void
  registerRef: (c: string, el: HTMLElement | null) => void
}

export default function MenuSection({
  categories,
  products,
  activeCategory,
  onSelectCategory,
  onPick,
  registerRef,
}: Props) {
  return (
    <div>
      {/* 吸顶分类导航 */}
      <nav className="sticky top-0 z-20 -mx-0 flex gap-2 overflow-x-auto bg-[#F7F4FB]/95 px-5 py-3 backdrop-blur">
        {categories.map((c) => {
          const active = c === activeCategory
          return (
            <button
              key={c}
              type="button"
              onClick={() => onSelectCategory(c)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all active:scale-95 ${
                active
                  ? 'bg-[#5B21B6] text-white shadow-md shadow-[#5B21B6]/30'
                  : 'bg-white text-[#6B6480] shadow-sm'
              }`}
            >
              {c}
            </button>
          )
        })}
      </nav>

      <div className="space-y-7 px-5 pb-40 pt-1">
        {categories.map((c) => (
          <section key={c} ref={(el) => registerRef(c, el)}>
            <h2 className="mb-3 flex items-baseline gap-2 text-[15px] font-bold text-[#2E1065]">
              {c}
              <span className="text-[10px] font-normal tracking-widest text-[#A79EC7]">
                {c === '气泡美式' ? 'SPARKLING' : c === '奶盖果茶' ? 'CHEESE FOAM' : 'POUR OVER'}
              </span>
            </h2>
            <div className="space-y-3">
              {products
                .filter((p) => p.category === c)
                .map((p) => (
                  <article
                    key={p.id}
                    className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm shadow-[#5B21B6]/5"
                  >
                    <div className="flex w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-[#F3EEFB] to-[#E9E1F8] py-2">
                      <DrinkArt art={p.art} size={72} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="truncate text-[15px] font-bold text-[#241340]">{p.name}</h3>
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#8B84A3]">
                        {p.desc}
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-[#F1ECFB] px-1.5 py-0.5 text-[10px] text-[#6D28D9]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <p className="text-[#5B21B6]">
                          <span className="text-xs font-semibold">¥</span>
                          <span className="text-xl font-extrabold tracking-tight">{p.price}</span>
                          <span className="ml-1 text-[10px] text-[#A79EC7]">起</span>
                        </p>
                        <button
                          type="button"
                          aria-label={`选择 ${p.name} 规格`}
                          onClick={() => onPick(p)}
                          className="flex h-8 items-center gap-1 rounded-full bg-[#5B21B6] px-3.5 text-xs font-semibold text-white shadow-md shadow-[#5B21B6]/30 transition active:scale-90"
                        >
                          <Plus size={14} strokeWidth={3} />
                          选规格
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        <p className="pt-2 text-center text-[10px] tracking-widest text-[#B9B1D1]">
          — 葡气咖啡 · 每一杯都有葡萄的香气 —
        </p>
      </div>
    </div>
  )
}
