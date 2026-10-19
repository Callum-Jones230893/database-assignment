import { Dispatch, SetStateAction } from "react"

type ConfirmChoiceProps = {
  handleConfirmation: Dispatch<SetStateAction<boolean>>
  setNewComment: Dispatch<SetStateAction<boolean>>
}

const ConfirmChoice = ({ handleConfirmation, setNewComment }: ConfirmChoiceProps) => {
  return (
    <div className="fixed flex-col inset-0 z-55 flex items-center justify-center bg-black/50 p-4 gap-10">
      <p>Would you like to proceed?</p>
      <div className="flex gap-10 z-100">
        <span onClick={() => handleConfirmation(true)}>Confirm</span>
        <span onClick={() => setNewComment(false)}>Cancel</span>
      </div>
    </div>
  )
}

export default ConfirmChoice

// add to all confirmations, onClick this div opens an overlay, click yes, and the mutationfn triggers, click cancel and overlay closes and either cancels
// or takes you back to the changes