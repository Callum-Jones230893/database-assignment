
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
        <div className="border-2 border-orange-500 p-4 mb-4 rounded-2xl shadow-sm shadow-orange-400 min-h-[5%]">
          <h3 className="font-bold text-2xl">{post.title}</h3>
          <p className="text-right">Posted by {post.author.username}</p>
          <div>
            <p className="">{post.content}</p>
            {post.image?.map((image: string) => <div key={image}><Image src={image} alt={image} height={500} width={500} /></div>)}
          </div>
          {isAuthor && <div className="flex gap-2 justify-end">
            <DeleteButton id={post.id} />
            <Link href={`/${slug}/edit`} className="button cursor-pointer">Edit Post</Link>
          </div>}
        </div>
      )}
    </div>
  );
}

export default FullPostCard