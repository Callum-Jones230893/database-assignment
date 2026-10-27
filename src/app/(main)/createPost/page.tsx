import NewPost from "@/components/posts/NewPost"

const CreatePostPage = () => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="subtitle">Create Post</h2>
      <NewPost />
    </div>
  )
}

export default CreatePostPage