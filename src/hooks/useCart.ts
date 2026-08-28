import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CartItem, Order, Product, SpecSelection } from '@/types'
import { addonById } from '@/types'

const CART_KEY = 'puqi:cart'
const ORDER_KEY = 'puqi:lastOrder'

export function defaultSpec(): SpecSelection {
  return { size: '中杯', sugar: '正常糖', ice: '正常冰', noCheeseCap: false, addOns: [] }
}

export function unitPriceOf(p: Product, spec: SpecSelection): number {
  let price = p.price + (spec.size === '大杯' ? 3 : 0)
  for (const id of spec.addOns) price += addonById(id)?.price ?? 0
  return price
}

export function specTextOf(p: Product, spec: SpecSelection): string {
  const parts = [spec.size, spec.sugar, spec.ice]
  if (p.hasCheeseCap && spec.noCheeseCap) parts.push('去奶盖')
  for (const id of spec.addOns) {
    const a = addonById(id)
    if (a) parts.push(`+${a.name}`)
  }
  return parts.join(' / ')
}

export function cartKeyOf(p: Product, spec: SpecSelection): string {
  return `${p.id}|${spec.size}|${spec.sugar}|${spec.ice}|${spec.noCheeseCap ? 1 : 0}|${[...spec.addOns].sort().join(',')}`
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function loadLastOrder(): Order | null {
  try {
    const raw = localStorage.getItem(ORDER_KEY)
    return raw ? (JSON.parse(raw) as Order) : null
  } catch {
    return null
  }
}

export function saveLastOrder(order: Order) {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order))
  } catch {
    /* ignore */
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [bump, setBump] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {
      /* ignore */
    }
  }, [items])

  const add = useCallback((p: Product, spec: SpecSelection, qty: number) => {
    const key = cartKeyOf(p, spec)
    const unitPrice = unitPriceOf(p, spec)
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.key === key)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [
        ...prev,
        {
          key,
          productId: p.id,
          name: p.name,
          art: p.art,
          basePrice: p.price,
          spec,
          specText: specTextOf(p, spec),
          qty,
          unitPrice,
        },
      ]
    })
    setBump((b) => b + 1)
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((it) => it.key !== key)
        : prev.map((it) => (it.key === key ? { ...it, qty } : it)),
    )
  }, [])

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((it) => it.key !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const totalCount = useMemo(() => items.reduce((s, it) => s + it.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((s, it) => s + it.qty * it.unitPrice, 0), [items])

  return { items, add, setQty, remove, clear, totalCount, totalPrice, bump }
}
