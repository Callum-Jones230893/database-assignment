"use client"

import { useState } from "react"
import NewCommentForm from "../NewCommentForm"

type NewCommentType = {
  postId: string
  slug: string
  parentId: string | null
}

const NewCommentWrapper = ({ postId, slug, parentId }: NewCommentType) => {
  const [newComment, setNewComment] = useState<boolean>(false)

  const handleClick = () => {
    setNewComment(!newComment)
  }

  return (
    <div className="flex flex-col items-center">
      {!newComment && <div className="button" onClick={handleClick}>Comment</div>}
      {newComment && <NewCommentForm setNewComment={setNewComment} postId={postId} slug={slug} parentId={parentId} />}
    </div>
  )
}

export default NewCommentWrapper
