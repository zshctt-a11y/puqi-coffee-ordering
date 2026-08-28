import { useCallback, useMemo, useRef, useState } from 'react'
import type { Order, Product, SpecSelection } from '@/types'
import { CATEGORIES, PRODUCTS } from '@/data/menu'
import { loadLastOrder, saveLastOrder, useCart } from '@/hooks/useCart'
import ShopHeader from '@/sections/ShopHeader'
import MenuSection from '@/sections/MenuSection'
import SpecSheet from '@/sections/SpecSheet'
import CartBar from '@/sections/CartBar'
import CartSheet from '@/sections/CartSheet'
import CheckoutView from '@/sections/CheckoutView'
import SuccessView from '@/sections/SuccessView'

type View = 'menu' | 'checkout' | 'success'

function genPickupNo(): string {
  return 'A' + String(Math.floor(100 + Math.random() * 900))
}

export default function Home() {
  const cart = useCart()
  const [view, setView] = useState<View>('menu')
  const [specProduct, setSpecProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [pickupNo, setPickupNo] = useState('')
  const [remark, setRemark] = useState('')
  const [order, setOrder] = useState<Order | null>(() => loadLastOrder())
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0])
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 1600)
  }, [])

  const registerRef = useCallback((c: string, el: HTMLElement | null) => {
    sectionRefs.current[c] = el
  }, [])

  const scrollToCategory = useCallback((c: string) => {
    setActiveCategory(c)
    sectionRefs.current[c]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const onMenuScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const top = container.getBoundingClientRect().top + 120
    let current: string = CATEGORIES[0]
    for (const c of CATEGORIES) {
      const el = sectionRefs.current[c]
      if (el && el.getBoundingClientRect().top <= top) current = c
    }
    setActiveCategory(current)
  }, [])

  const handleAdd = useCallback(
    (p: Product, spec: SpecSelection, qty: number) => {
      cart.add(p, spec, qty)
      setSpecProduct(null)
      showToast(`已加入购物车 · ${p.name} ×${qty}`)
    },
    [cart, showToast],
  )

  const goCheckout = useCallback(() => {
    if (cart.totalCount === 0) return
    setCartOpen(false)
    setPickupNo(genPickupNo())
    setView('checkout')
  }, [cart.totalCount])

  const submitOrder = useCallback(() => {
    const o: Order = {
      pickupNo,
      items: cart.items,
      total: cart.totalPrice,
      count: cart.totalCount,
      remark: remark.trim(),
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
    }
    saveLastOrder(o)
    setOrder(o)
    cart.clear()
    setRemark('')
    setView('success')
  }, [cart, pickupNo, remark])

  const again = useCallback(() => {
    setView('menu')
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0 }))
  }, [])

  const overlayOpen = specProduct !== null || cartOpen

  const menuView = useMemo(
    () => (
      <div className="relative h-full">
        <div ref={scrollRef} onScroll={onMenuScroll} className="h-full overflow-y-auto">
          <ShopHeader />
          <MenuSection
            categories={CATEGORIES}
            products={PRODUCTS}
            activeCategory={activeCategory}
            onSelectCategory={scrollToCategory}
            onPick={setSpecProduct}
            registerRef={registerRef}
          />
        </div>

        <CartBar
          count={cart.totalCount}
          total={cart.totalPrice}
          bump={cart.bump}
          onOpenCart={() => setCartOpen(true)}
          onCheckout={goCheckout}
        />

        {toast && (
          <div className="anim-toast pointer-events-none absolute inset-x-0 bottom-24 z-50 flex justify-center px-8">
            <p className="rounded-full bg-[#241340]/95 px-4 py-2 text-xs font-medium text-white shadow-lg">
              {toast}
            </p>
          </div>
        )}

        {specProduct && (
          <SpecSheet product={specProduct} onClose={() => setSpecProduct(null)} onAdd={handleAdd} />
        )}

        {cartOpen && (
          <CartSheet
            items={cart.items}
            total={cart.totalPrice}
            onClose={() => setCartOpen(false)}
            onSetQty={cart.setQty}
            onRemove={cart.remove}
            onClear={cart.clear}
            onCheckout={goCheckout}
          />
        )}
      </div>
    ),
    [
      activeCategory,
      cart,
      cartOpen,
      goCheckout,
      handleAdd,
      onMenuScroll,
      registerRef,
      scrollToCategory,
      specProduct,
      toast,
    ],
  )

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#E7E0F2] sm:py-6">
      {/* 手机框 */}
      <div className="relative h-dvh w-full max-w-[420px] overflow-hidden bg-[#F7F4FB] sm:h-[min(880px,94dvh)] sm:rounded-[2.2rem] sm:shadow-2xl sm:shadow-[#2E1065]/30 sm:ring-8 sm:ring-[#241340]">
        {view === 'menu' && menuView}
        {view === 'checkout' && (
          <CheckoutView
            items={cart.items}
            total={cart.totalPrice}
            count={cart.totalCount}
            pickupNo={pickupNo}
            remark={remark}
            onRemark={setRemark}
            onBack={() => setView('menu')}
            onSubmit={submitOrder}
          />
        )}
        {view === 'success' && order && <SuccessView order={order} onAgain={again} />}
        {/* 遮罩打开时隐藏桌面端滚动条问题占位 */}
        {overlayOpen && <span className="hidden" aria-hidden="true" />}
      </div>
    </div>
  )
}
