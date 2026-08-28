import type { Product } from '@/types'

export const CATEGORIES = ['气泡美式', '奶盖果茶', '手冲咖啡'] as const

export const PRODUCTS: Product[] = [
  {
    id: 'grape-sparkling-americano',
    name: '葡萄气泡冰美式',
    desc: '气泡水 × 巨峰葡萄 × 双份浓缩，清爽起泡',
    price: 18,
    tags: ['含咖啡因', '气泡'],
    category: '气泡美式',
    isCoffee: true,
    art: 'sparkling',
  },
  {
    id: 'cheese-jasmine-grape',
    name: '芝芝茉莉葡萄',
    desc: '茉莉绿茶底 × 手剥葡萄果肉 × 芝士奶盖',
    price: 19,
    tags: ['奶盖', '不含咖啡'],
    category: '奶盖果茶',
    isCoffee: false,
    hasCheeseCap: true,
    art: 'cheese',
  },
  {
    id: 'salted-cream-pourover',
    name: '咸奶油手冲冰美式',
    desc: '浅烘手冲冰美式 × 海盐咸奶油 top',
    price: 21,
    tags: ['手冲', '咸奶油'],
    category: '手冲咖啡',
    isCoffee: true,
    art: 'handdrip',
  },
]
