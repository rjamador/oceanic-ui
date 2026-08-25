/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Accordion.Item), which by convention (see "Compound
   components" in docs/creating-components.md) lives in one file per
   component folder rather than scattering the shared context across files. */
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import { ChevronRightIcon } from '../Icon'
import styles from './Accordion.module.css'

interface AccordionContextValue {
  /** Shared `<details name>` — when set, only one item in the group can be
   *  open at a time. This is native HTML behavior, no JS coordination. */
  name?: string
}

const AccordionContext = createContext<AccordionContextValue>({})

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** When true, opening one item closes the others (native `<details name>` grouping). */
  exclusive?: boolean
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(
  ({ exclusive, className, children, ...rest }, ref) => {
    const generatedName = useId()

    return (
      <AccordionContext.Provider value={{ name: exclusive ? generatedName : undefined }}>
        <div ref={ref} className={cn(styles.root, className)} {...rest}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  },
)
AccordionRoot.displayName = 'Accordion'

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDetailsElement>, 'title'> {
  title: ReactNode
  defaultOpen?: boolean
}

const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(
  ({ title, defaultOpen, className, children, ...rest }, ref) => {
    const { name } = useContext(AccordionContext)

    return (
      <details
        ref={ref}
        name={name}
        open={defaultOpen}
        className={cn(styles.item, className)}
        {...rest}
      >
        <summary className={styles.summary}>
          <span className={styles.chevron} aria-hidden="true">
            <ChevronRightIcon />
          </span>
          {title}
        </summary>
        <div className={styles.content}>{children}</div>
      </details>
    )
  },
)
AccordionItem.displayName = 'Accordion.Item'

export const Accordion = Object.assign(AccordionRoot, { Item: AccordionItem })
