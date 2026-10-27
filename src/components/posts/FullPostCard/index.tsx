
import DeleteButton from '@/app/(main)/[slug]/DeleteButton'
import { FullPostType } from '@/lib/supabase/queries';
import Link from 'next/link'
import Image from 'next/image'

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
          <h3 className="post-title">{post.title}</h3>
          <div>
            <div className="grid grid-cols-3 grid-auto-flow-row w-1/2 mx-auto my-5 gap-y-10">
              {post.image?.map((image: string) => 
                <div key={image} className='w-50 h-auto'>
                  <img src={image} alt={image} />
                </div>
              )}
            </div>
            <p className="w-8/10 mx-auto py-5">{post.content}</p>
          </div>
          {isAuthor && 
          <div className="flex gap-2 justify-end">
            <DeleteButton id={post.id} />
            <Link href={`/${slug}/edit`} className="button cursor-pointer">Edit Post</Link>
          </div>}
          <p className="justify-start">Posted by {post.author.username}</p>
        </div>
      )}
    </div>
  );
}

export default FullPostCard