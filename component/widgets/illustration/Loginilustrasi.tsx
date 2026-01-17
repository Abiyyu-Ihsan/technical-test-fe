import { motion } from "framer-motion"

export default function LoginIllustration() {
  return (
    <motion.svg
      width="800"
      height="600"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <defs>
        <linearGradient
          id="bgGradient"
          x1="0"
          y1="0"
          x2="800"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" rx="40" fill="url(#bgGradient)" />

      {/* Floating Card */}
      <motion.g
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect
          x="260"
          y="150"
          width="280"
          height="300"
          rx="16"
          fill="white"
          opacity="0.95"
        />

        <rect x="300" y="190" width="200" height="20" rx="6" fill="#E5E7EB" />
        <rect x="300" y="235" width="200" height="36" rx="8" fill="#F3F4F6" />
        <rect x="300" y="285" width="200" height="36" rx="8" fill="#F3F4F6" />

        {/* Button pulse */}
        <motion.rect
          x="300"
          y="340"
          width="200"
          height="40"
          rx="10"
          fill="#4F46E5"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>

      {/* Lock Icon Bounce */}
      <motion.g
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="140" cy="320" r="70" fill="#6366F1" opacity="0.15" />
        <rect x="120" y="310" width="40" height="30" rx="6" fill="#4F46E5" />
        <path
          d="M128 310V298C128 286 152 286 152 298V310"
          stroke="#4F46E5"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Rotating Decoration */}
      <motion.circle
        cx="640"
        cy="160"
        r="50"
        fill="#818CF8"
        opacity="0.2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        transformOrigin="640px 160px"
      />

      {/* Floating Dot */}
      <motion.circle
        cx="680"
        cy="420"
        r="30"
        fill="#A5B4FC"
        opacity="0.25"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}
