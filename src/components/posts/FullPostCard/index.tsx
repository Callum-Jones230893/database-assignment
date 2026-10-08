import { Card } from '@/components/ui/card';
import { FullPostType } from '@/lib/supabase/queries';

type FullPostCardProps = {
  post: FullPostType | null
}


const FullPostCard = ({ post }: FullPostCardProps) => {
  return (
    <Card className="w-full" size="default">
      {post && (
        <div className="p-4 mb-4 rounded-2xl w-8/10">
          <h3 className="font-bold text-2xl">{post.title}</h3>
          <p className="text-right">Posted by {post.author.username}</p>
          <div>
            <p className="">{post.content}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export default FullPostCard