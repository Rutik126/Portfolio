import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-white/[0.12] px-4 py-2 text-sm font-medium transition-transform duration-300',
  {
    variants: {
      variant: {
        ghost: 'bg-white/[0.06] text-[rgba(234,234,240,0.9)] backdrop-blur-[20px]',
        accent: 'bg-[#FFD600] text-[#121212] shadow-[0_14px_40px_rgba(255,214,0,0.28)]',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  },
)

export function Button({ className, variant, ...props }) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />
}
