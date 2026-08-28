import type { DrinkArt as Art } from '@/types'

interface Props {
  art: Art
  size?: number
}

/** 手绘风 SVG 饮品插画：气泡美式 / 芝士奶盖 / 手冲咸奶油 */
export default function DrinkArt({ art, size = 96 }: Props) {
  const h = Math.round((size * 7) / 6)
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 96 112"
      fill="none"
      role="img"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {art === 'sparkling' && <Sparkling />}
      {art === 'cheese' && <Cheese />}
      {art === 'handdrip' && <HandDrip />}
    </svg>
  )
}

function Sparkling() {
  return (
    <g>
      <defs>
        <linearGradient id="sp-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="55%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>
        <linearGradient id="sp-coffee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#2E1065" />
        </linearGradient>
        <clipPath id="sp-cup">
          <path d="M28 22 L68 22 L63 100 Q62.6 106 56 106 L40 106 Q33.4 106 33 100 Z" />
        </clipPath>
      </defs>
      {/* 吸管 */}
      <rect x="56" y="4" width="5" height="46" rx="2.5" transform="rotate(12 58 6)" fill="#5B21B6" />
      {/* 杯体 */}
      <path
        d="M28 22 L68 22 L63 100 Q62.6 106 56 106 L40 106 Q33.4 106 33 100 Z"
        fill="#EDE9FE"
        opacity="0.55"
      />
      <g clipPath="url(#sp-cup)">
        {/* 底部浓缩层 */}
        <rect x="20" y="72" width="60" height="40" fill="url(#sp-coffee)" />
        {/* 葡萄气泡水层 */}
        <rect x="20" y="34" width="60" height="42" fill="url(#sp-liquid)" />
        {/* 顶部气泡水 */}
        <rect x="20" y="24" width="60" height="14" fill="#DDD6FE" opacity="0.85" />
        {/* 冰块 */}
        <rect x="36" y="40" width="12" height="12" rx="3" transform="rotate(-14 42 46)" fill="#FFFFFF" opacity="0.75" />
        <rect x="50" y="54" width="11" height="11" rx="3" transform="rotate(18 55 59)" fill="#FFFFFF" opacity="0.65" />
        {/* 气泡 */}
        <circle cx="40" cy="88" r="2.4" fill="#C4B5FD" />
        <circle cx="52" cy="80" r="1.8" fill="#C4B5FD" />
        <circle cx="46" cy="62" r="2.2" fill="#EDE9FE" />
        <circle cx="57" cy="44" r="1.6" fill="#EDE9FE" />
        <circle cx="38" cy="52" r="1.5" fill="#F5F3FF" />
        <circle cx="55" cy="68" r="1.3" fill="#DDD6FE" />
      </g>
      {/* 杯口描边 */}
      <path
        d="M28 22 L68 22 L63 100 Q62.6 106 56 106 L40 106 Q33.4 106 33 100 Z"
        stroke="#5B21B6"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 葡萄装饰 */}
      <circle cx="76" cy="30" r="7" fill="#7C3AED" />
      <circle cx="84" cy="38" r="7" fill="#6D28D9" />
      <circle cx="74" cy="44" r="7" fill="#8B5CF6" />
      <path d="M78 22 q4 -6 10 -6" stroke="#4D7C0F" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}

function Cheese() {
  return (
    <g>
      <defs>
        <linearGradient id="ch-tea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="60%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
        <linearGradient id="ch-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="100%" stopColor="#FDE9C8" />
        </linearGradient>
        <clipPath id="ch-cup">
          <path d="M26 26 L70 26 L64 102 Q63.5 108 57 108 L39 108 Q32.5 108 32 102 Z" />
        </clipPath>
      </defs>
      <path
        d="M26 26 L70 26 L64 102 Q63.5 108 57 108 L39 108 Q32.5 108 32 102 Z"
        fill="#F5F3FF"
        opacity="0.55"
      />
      <g clipPath="url(#ch-cup)">
        {/* 茶底 */}
        <rect x="18" y="46" width="64" height="66" fill="url(#ch-tea)" />
        {/* 芝士奶盖（波浪下缘） */}
        <path
          d="M18 26 L82 26 L82 42 Q72 50 62 43 Q52 36 42 44 Q32 52 24 44 Q20 40 18 42 Z"
          fill="url(#ch-cap)"
        />
        {/* 手剥葡萄果肉沉底 */}
        <circle cx="40" cy="96" r="5" fill="#3B0764" />
        <circle cx="52" cy="99" r="5.5" fill="#4C1D95" />
        <circle cx="60" cy="93" r="4.5" fill="#581C87" />
        <circle cx="46" cy="90" r="3.5" fill="#5B21B6" />
        {/* 茉莉绿微光 */}
        <rect x="18" y="52" width="64" height="5" fill="#BEF264" opacity="0.28" />
        {/* 冰块 */}
        <rect x="36" y="56" width="11" height="11" rx="3" transform="rotate(-12 41 61)" fill="#FFFFFF" opacity="0.6" />
        <rect x="52" y="66" width="10" height="10" rx="3" transform="rotate(16 57 71)" fill="#FFFFFF" opacity="0.5" />
      </g>
      <path
        d="M26 26 L70 26 L64 102 Q63.5 108 57 108 L39 108 Q32.5 108 32 102 Z"
        stroke="#6D28D9"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 奶盖溢出的小滴 */}
      <circle cx="30" cy="48" r="2.2" fill="#FDE9C8" />
      {/* 杯盖 */}
      <rect x="24" y="18" width="48" height="8" rx="4" fill="#5B21B6" />
      <rect x="42" y="10" width="12" height="9" rx="4" fill="#7C3AED" />
      {/* 茉莉花点缀 */}
      <g transform="translate(80 76)">
        <circle cx="0" cy="-4" r="3" fill="#FFFFFF" />
        <circle cx="3.8" cy="1.2" r="3" fill="#FFFFFF" />
        <circle cx="-3.8" cy="1.2" r="3" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="1.6" fill="#FDE68A" />
      </g>
    </g>
  )
}

function HandDrip() {
  return (
    <g>
      <defs>
        <linearGradient id="hd-coffee" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6D28D9" />
          <stop offset="45%" stopColor="#3B0764" />
          <stop offset="100%" stopColor="#1E0533" />
        </linearGradient>
        <linearGradient id="hd-cream" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF9EC" />
          <stop offset="100%" stopColor="#F3E2C7" />
        </linearGradient>
        <clipPath id="hd-cup">
          <path d="M24 44 L72 44 L66 104 Q65.5 109 59 109 L37 109 Q30.5 109 30 104 Z" />
        </clipPath>
      </defs>
      {/* 手冲壶剪影（背景装饰） */}
      <g opacity="0.9">
        <path d="M66 14 q14 2 14 14 l-2 8 -8 -2 1 -6 q0 -6 -9 -8 Z" fill="#8B5CF6" />
        <path d="M80 36 q8 1 8 8" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
        {/* 注水流线 */}
        <path d="M84 46 q2 8 -2 14" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 5" />
      </g>
      {/* 分享壶杯体 */}
      <path
        d="M24 44 L72 44 L66 104 Q65.5 109 59 109 L37 109 Q30.5 109 30 104 Z"
        fill="#EDE9FE"
        opacity="0.55"
      />
      <g clipPath="url(#hd-cup)">
        {/* 浅烘手冲咖啡 */}
        <rect x="16" y="56" width="70" height="56" fill="url(#hd-coffee)" />
        {/* 海盐咸奶油 top */}
        <path
          d="M16 44 L86 44 L86 54 Q76 62 66 55 Q56 48 46 56 Q36 64 26 56 Q18 50 16 54 Z"
          fill="url(#hd-cream)"
        />
        {/* 奶油旋涡 */}
        <path
          d="M40 48 q8 -5 14 0 q5 4 -1 8 q-7 4 -12 0 q-4 -3 2 -6"
          stroke="#E9D3AC"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* 海盐粒 */}
        <circle cx="34" cy="50" r="1.2" fill="#FFFFFF" />
        <circle cx="58" cy="47" r="1.2" fill="#FFFFFF" />
        <circle cx="48" cy="52" r="1" fill="#FFFFFF" />
        {/* 冰块 */}
        <rect x="36" y="66" width="11" height="11" rx="3" transform="rotate(-15 41 71)" fill="#A78BFA" opacity="0.45" />
        <rect x="52" y="76" width="10" height="10" rx="3" transform="rotate(14 57 81)" fill="#A78BFA" opacity="0.4" />
      </g>
      <path
        d="M24 44 L72 44 L66 104 Q65.5 109 59 109 L37 109 Q30.5 109 30 104 Z"
        stroke="#4C1D95"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* 把手 */}
      <path d="M72 58 q12 2 10 14 q-2 10 -14 8" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}
