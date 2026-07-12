'use client'

import { type FC } from 'react'

interface ModalDialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const ModalDialog: FC<ModalDialogProps> = ({ open, onClose, title, children }): JSX.Element | null => {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>
        <div className="text-sm text-gray-700">{children}</div>
      </div>
    </div>
  )
}
