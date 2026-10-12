
import { FullPostType } from '@/lib/supabase/queries';

type FullPostCardProps = {
  post: FullPostType | null
}


const FullPostCard = ({ post }: FullPostCardProps) => {
  return (
    <div className="flex flex-col my-[2%]">
      {post && (
        <div className="border-2 border-orange-500 p-4 mb-4 rounded-2xl shadow-sm shadow-orange-400 min-h-[5%]">
          <h3 className="font-bold text-2xl">{post.title}</h3>
          <p className="text-right">Posted by {post.author.username}</p>
          <div>
            <p className="">{post.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FullPostCard