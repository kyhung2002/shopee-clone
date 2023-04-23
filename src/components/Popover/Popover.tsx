import { useRef, useState, useId, ElementType } from 'react'
import { FloatingPortal, arrow, shift, useFloating, offset, Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
interface IProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  // Customize multiple elements type
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}
const Popover = ({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: IProps) => {
  const [open, setOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const id = useId()
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    // Use Element here to customize the multiple HTML element
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                ref={arrowRef}
                className='absolute z-10 -translate-y-[95%] border-[11px] border-x-transparent border-b-white border-t-transparent after:absolute
            after:z-20 after:block after:h-[10px] after:w-[120px] 
            after:-translate-x-2/4  
            '
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              ></span>
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}

export default Popover
