"use client"

import { useState } from "react"
import NewCommentForm from "../NewCommentForm"

type NewCommentProps = {
  postId: string
  slug: string
  parentId: string | null
}

const NewCommentWrapper = ({ postId, slug, parentId }: NewCommentProps) => {
  const [newComment, setNewComment] = useState<boolean>(false)

  const handleClick = () => {
    setNewComment(!newComment)
  }

  return (
    <div className="flex flex-col items-center cursor-pointer">
      {!newComment && (
        <i className="fa-regular fa-comment fa-icon" onClick={handleClick}></i>
      )}
      {newComment && (
        <NewCommentForm
          setNewComment={setNewComment}
          postId={postId}
          slug={slug}
          parentId={parentId}
        />
      )}
    </div>
  )
}

export default NewCommentWrapper
