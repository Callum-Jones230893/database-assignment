"use client"

import { CommentType } from "@/lib/supabase/queries"
import { useState } from "react"

type CommentProps = {
  comment: CommentType | null
}

const CommentCard = ({ comment }: CommentProps) => {
  const [parentId, setParentId] = useState<string | null>(null)

  const handleClick = {
    // setParentId()
  }

  return (
    <div className="flex flex-col items-center my-[5%]">
      {comment && comment.commenter && (
        <div className="border border-black p-4 mb-4 rounded-2xl w-1/2">
          <p>{comment.content}</p>
          <p>{comment.commenter.username}</p>
        </div>
      )}
      <div className="">Reply</div>
    </div>
  )
}

export default CommentCard