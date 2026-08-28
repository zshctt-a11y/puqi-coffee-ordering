export type DrinkArt = 'sparkling' | 'cheese' | 'handdrip'

export interface AddOn {
  id: string
  name: string
  price: number
}

export interface Product {
  id: string
  name: string
  desc: string
  price: number
  tags: string[]
  category: string
  isCoffee: boolean
  hasCheeseCap?: boolean
  art: DrinkArt
}

export interface SpecSelection {
  size: '中杯' | '大杯'
  sugar: string
  ice: string
  noCheeseCap: boolean
  addOns: string[]
}

export interface CartItem {
  key: string
  productId: string
  name: string
  art: DrinkArt
  basePrice: number
  spec: SpecSelection
  specText: string
  qty: number
  unitPrice: number
}

export interface Order {
  pickupNo: string
  items: CartItem[]
  total: number
  count: number
  remark: string
  time: string
}

export const SUGAR_OPTIONS = ['正常糖', '七分糖', '五分糖', '三分糖', '无糖'] as const
export const ICE_OPTIONS = ['正常冰', '少冰', '去冰'] as const

export const ADDON_FRUIT: AddOn = { id: 'grape', name: '葡萄果肉', price: 3 }
export const ADDON_BOBA: AddOn = { id: 'boba', name: '脆波波', price: 2 }
export const ADDON_SHOT: AddOn = { id: 'shot', name: '浓缩加倍', price: 4 }

export function addonsFor(p: Product): AddOn[] {
  return p.isCoffee ? [ADDON_FRUIT, ADDON_BOBA, ADDON_SHOT] : [ADDON_FRUIT, ADDON_BOBA]
}

export function addonById(id: string): AddOn | undefined {
  return [ADDON_FRUIT, ADDON_BOBA, ADDON_SHOT].find((a) => a.id === id)
}
