"use client"

import { useState } from "react"
import NewCommentForm from "../NewCommentForm"

const NewCommentWrapper = () => {
  const [newComment, setNewComment] = useState<boolean>(false)

  const handleClick = () => {
    setNewComment(!newComment)
  }


  return (
    <div className="flex flex-col items-center">
      {!newComment && <div className="button" onClick={handleClick}>Comment</div>}
      {newComment && <NewCommentForm setNewComment={setNewComment} />}
    </div>
  )
}

export default NewCommentWrapper