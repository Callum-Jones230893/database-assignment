
import { DeletePost } from '@/actions/delete-post-action'
import DeleteButton from '@/components/DeleteButton'
import { FullPostType } from '@/lib/supabase/queries';
import Link from 'next/link'

type FullPostCardProps = {
  post: FullPostType | null
  slug: string
  isAuthor: boolean
}


const FullPostCard = ({ post, slug, isAuthor }: FullPostCardProps) => {
  return (
    <div className="flex flex-col my-[2%]">
      {post && (
        <div className="full-post-card">
          <h3 className="subtitle">{post.title}</h3>
            <p className="text-center py-5">Posted by {post.author.username}</p>
          <div className='flex flex-col items-center'>
            <div className="flex flex-col items-center lg:grid grid-cols-3 grid-auto-flow-row w-9/12 place-items-center my-5 gap-10">
              {post.image?.map((image: string) => 
                <div key={image} className='w-50 h-auto'>
                  <img src={image} alt={image} /> 
                </div>
              )}
            </div>
            <p className="md:text-xl text-center py-5">{post.content}</p>
          </div>
          {isAuthor && 
          <div className="flex gap-2 justify-end items-center">
            <Link href={`/${slug}/edit`} className=" cursor-pointer">
              <i className="fa-solid fa-pen-to-square fa-icon" />
            </Link>
            <DeleteButton
              id={post.id}
              mutateFn={DeletePost}
              successMessage="Comment deleted"
            />
          </div>}
        </div>
      )}
    </div>
  );
}

export default FullPostCard