import React, { useState } from 'react';
import { PrimaryButton, SecondaryButton, Card } from './UI';

const CreatePostModal = ({ open, onClose, onCreate }) => {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [file, setFile] = useState(null);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('caption', caption);
    form.append('hashtags', hashtags);
    form.append('privacy', privacy);
    if (file) form.append('image', file);
    await onCreate(form);
    setCaption('');
    setHashtags('');
    setPrivacy('public');
    setFile(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg">
        <h3 className="text-xl font-semibold">Create Post</h3>
        <form onSubmit={submit} className="mt-4 space-y-3">
          <textarea value={caption} onChange={e=>setCaption(e.target.value)} placeholder="Write a caption" className="w-full p-3 rounded-xl bg-white/5 border border-white/10"/>
          <input value={hashtags} onChange={e=>setHashtags(e.target.value)} placeholder="#tags, comma separated" className="w-full p-3 rounded-xl bg-white/5 border border-white/10"/>
          <div className="flex items-center gap-3">
            <label className="text-sm text-[color:var(--text-dim)]">Privacy</label>
            <select value={privacy} onChange={e=>setPrivacy(e.target.value)} className="p-2 rounded-xl bg-white/5 border border-white/10">
              <option value="public">Public</option>
              <option value="followers">Followers</option>
            </select>
          </div>
          <input type="file" onChange={e=>setFile(e.target.files[0])} className="w-full"/>
          <div className="flex justify-end gap-3 pt-2">
            <SecondaryButton type="button" onClick={onClose}>Cancel</SecondaryButton>
            <PrimaryButton type="submit">Post</PrimaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreatePostModal;
