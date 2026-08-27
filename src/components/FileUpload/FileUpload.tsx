import { forwardRef, useId, useRef, useState, type DragEvent, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { FolderOpenIcon } from '../Icon'
import { Text } from '../Text'

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  /**
   * Dropzone prompt text (also the file input's accessible name).
   * @default Drop files here, or click to browse
   */
  label?: string
  /** Secondary line under the box (accepted types, size limit…), linked via `aria-describedby`. */
  helperText?: string
  /** Called with the selected/dropped files. `multiple` and `accept` are forwarded to the native input. */
  onFiles?: (files: File[]) => void
}

/**
 * A click-or-drop file picker: a dashed dropzone wrapping a visually hidden
 * `<input type="file">`. Presentational — it hands you `File[]` via
 * `onFiles` and does not upload or track state itself.
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label = 'Drop files here, or click to browse',
      helperText,
      onFiles,
      disabled,
      className,
      id,
      multiple,
      accept,
      ...rest
    },
    forwardedRef,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [active, setActive] = useState(false)

    const assignRef = (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    const emit = (list: FileList | File[] | null) => {
      if (!list) return
      const files = Array.from(list)
      if (files.length === 0) return
      onFiles?.(files)
    }

    const onDragOver = (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      if (!disabled) setActive(true)
    }

    const onDragLeave = () => setActive(false)

    const onDrop = (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      setActive(false)
      if (disabled) return
      emit(event.dataTransfer.files)
    }

    const helperId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor={inputId}
          data-active={active}
          data-disabled={disabled ? 'true' : undefined}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={cn('aero-file-upload', className)}
        >
          <FolderOpenIcon size={22} />
          <Text as="span" variant="labelLarge">
            {label}
          </Text>
          <input
            ref={assignRef}
            id={inputId}
            type="file"
            className="sr-only"
            disabled={disabled}
            multiple={multiple}
            accept={accept}
            aria-describedby={helperId}
            onChange={(event) => {
              emit(event.target.files)
              event.target.value = ''
            }}
            {...rest}
          />
        </label>
        {helperText ? (
          <Text as="p" variant="labelSmall" color="muted" id={helperId}>
            {helperText}
          </Text>
        ) : null}
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'
