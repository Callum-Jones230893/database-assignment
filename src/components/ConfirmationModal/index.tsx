import { Dispatch, SetStateAction } from "react"

type ConfirmationModalProps = {
  handleConfirmation: Dispatch<SetStateAction<boolean>>
  setNewChange: Dispatch<SetStateAction<boolean>>
}

const ConfirmModal = ({ handleConfirmation, setNewChange }: ConfirmationModalProps) => {
  return (
    <div className="fixed flex-col inset-0 z-55 flex items-center justify-center bg-black/50 p-4 gap-10 h-100vh">
      <p>Would you like to proceed?</p>
      <div className="flex gap-10 z-100">
        <span onClick={() => handleConfirmation(true)} className="cursor-pointer">Confirm</span>
        <span onClick={() => setNewChange(false)} className="cursor-pointer">Cancel</span>
      </div>
    </div>
  )
}

export default ConfirmModal

// add to all confirmations, onClick this div opens an overlay, click yes, and the mutationfn triggers, click cancel and overlay closes and either cancels
// or takes you back to the changes