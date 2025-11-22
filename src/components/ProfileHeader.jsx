import React from 'react';
import { Card, PrimaryButton, SecondaryButton } from './UI';

const ProfileHeader = ({ user, onFollowToggle, isFollowing }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <img src={user?.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${user?.name || 'user'}` } alt="avatar" className="w-20 h-20 rounded-2xl"/>
        <div className="flex-1">
          <div className="text-2xl font-semibold">{user?.name}</div>
          <div className="text-[color:var(--text-dim)]">{user?.department || 'Department'} • {user?.year || 'Year'}</div>
          <div className="mt-2 text-sm text-[color:var(--text-dim)]">{user?.bio}</div>
        </div>
        {onFollowToggle && (
          isFollowing ? (
            <SecondaryButton onClick={onFollowToggle}>Unfollow</SecondaryButton>
          ) : (
            <PrimaryButton onClick={onFollowToggle}>Follow</PrimaryButton>
          )
        )}
      </div>
      <div className="mt-4 flex gap-6 text-sm">
        <div><span className="text-white">{user?.followers || 0}</span> Followers</div>
        <div><span className="text-white">{user?.following || 0}</span> Following</div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
