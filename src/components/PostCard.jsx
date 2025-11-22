import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Card, PrimaryButton } from './UI';

const PostCard = ({ post, onLike }) => {
  return (
    <Card className="overflow-hidden">
      {post.image_url && (
        <img src={post.image_url} alt="post" className="w-full h-64 object-cover rounded-xl" />
      )}
      <div className="mt-3">
        <div className="text-sm text-[color:var(--text-dim)]">{new Date(post.created_at).toLocaleString()}</div>
        <div className="mt-2 text-lg">{post.caption}</div>
        <div className="mt-2 flex items-center gap-4">
          <PrimaryButton onClick={() => onLike?.(post.id)} className="px-3 py-1 text-sm">
            <div className="flex items-center gap-2"><Heart size={16}/> {post.likes}</div>
          </PrimaryButton>
          <div className="px-3 py-1 rounded-2xl border border-white/10 text-sm flex items-center gap-2"><MessageCircle size={16}/> {post.comments}</div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
