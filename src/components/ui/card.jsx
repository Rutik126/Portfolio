import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const cardVariants = cva(
  'rounded-[16px] border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(5,5,18,0.22)] backdrop-blur-[20px]',
  {
    variants: {
      tone: {
        glass: 'bg-white/5',
        solid: 'bg-[#10111b]/90',
      },
      padding: {
        default: 'p-6 md:p-8',
        compact: 'p-4 md:p-6',
      },
    },
    defaultVariants: {
      tone: 'glass',
      padding: 'default',
    },
  },
)

export const Card = forwardRef(function Card(
  { className, tone, padding, ...props },
  ref,
) {
  return <div ref={ref} className={cn(cardVariants({ tone, padding }), className)} {...props} />
})
