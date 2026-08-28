import { cloneElement, isValidElement, type ReactElement, type ReactNode, type Ref } from 'react'
import { useMergeRefs } from '@floating-ui/react'

import { cn } from '@/lib/cn'

type SlottableProps = {
  className?: string
  ref?: Ref<HTMLElement>
  children?: ReactNode
}

export interface SlotProps extends Record<string, unknown> {
  /** Clone the single child element instead of rendering a `<button>`. */
  asChild: boolean
  child: ReactNode
  forwardedRef: Ref<HTMLElement>
  className?: string
  children?: ReactNode
}

/**
 * Renders `<button>` by default, or — when `asChild` is set — clones the
 * single child element and merges the component's own props onto it. Lets
 * `Sidebar.Item` become an `<a>` / router `<Link>` without a second
 * component. Same `cloneElement` mechanism `Tooltip`/`Popover` use here.
 */
export function Slot({ asChild, child, forwardedRef, className, children, ...props }: SlotProps) {
  const element = isValidElement<SlottableProps>(child)
    ? (child as ReactElement<SlottableProps>)
    : null
  const mergedRef = useMergeRefs([forwardedRef, element?.props.ref])

  if (asChild && element) {
    return cloneElement(element, {
      ...props,
      className: cn(className, element.props.className),
      ref: mergedRef,
      children: (
        <>
          {children}
          {element.props.children}
        </>
      ),
    } as SlottableProps)
  }

  return (
    <button type="button" ref={mergedRef as Ref<HTMLButtonElement>} className={className} {...props}>
      {children}
    </button>
  )
}
