import { useState } from 'react'

const useResponsiveDialog = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return { open, handleClickOpen, handleClose }
}

export default useResponsiveDialog
