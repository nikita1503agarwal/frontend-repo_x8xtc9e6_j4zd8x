import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import { Card, PrimaryButton, SecondaryButton } from './components/UI';
import PostCard from './components/PostCard';
import CreatePostModal from './components/CreatePostModal';
import ProfileHeader from './components/ProfileHeader';
import { apiGet, apiPost, apiPatch, apiDelete, apiLogin, API_URL } from './utils/api';
import Spline from '@splinetool/react-spline';
import { Bell, Compass, Home, Plus, User, LogOut } from 'lucide-react';

const Landing = () => {
  const [email, setEmail] = useState('student@campus.edu');
  const [password, setPassword] = useState('password123');
  const nav = useNavigate();

  const signup = async () => {
    await apiPost('/api/auth/signup', { name: 'Student', email, password, role: 'STUDENT' });
    await apiLogin(email, password);
    nav('/feed');
  };
  const login = async () => {
    await apiLogin(email, password);
    nav('/feed');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-70"><Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} /></div>
      <div className="relative z-10 px-6 pt-28 pb-16 max-w-5xl mx-auto">
        <div className="text-center">
          <div className="inline-block rounded-2xl px-4 py-2 text-sm border border-white/10 bg-[color:var(--bg-card)] backdrop-blur-md">Project: Swish — Private Social Sharing</div>
          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-[linear-gradient(160deg,#1E1B4B,#4F46E5,#EC4899)]">Your Campus. Your Vibes. Your Safe Space.</h1>
          <p className="mt-4 text-[color:var(--text-dim)] max-w-2xl mx-auto">Verified-only social sharing for Students, Faculty, and Admins. Create, connect, and explore trending campus moments.</p>
        </div>
        <Card className="mt-10 max-w-xl mx-auto">
          <div className="grid gap-3">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Campus Email" className="w-full p-3 rounded-xl bg-white/5 border border-white/10"/>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-3 rounded-xl bg-white/5 border border-white/10"/>
            <div className="flex gap-3">
              <PrimaryButton onClick={login} className="flex-1">Log in</PrimaryButton>
              <SecondaryButton onClick={signup} className="flex-1">Create account</SecondaryButton>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Shell = ({ children }) => {
  const nav = useNavigate();
  const logout = () => { localStorage.removeItem('swish_token'); nav('/'); };
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(15,23,42,0.6)] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/feed" className="font-bold">Swish</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm text-[color:var(--text-dim)]">
            <Link to="/feed" className="hover:text-white">Feed</Link>
            <Link to="/explore" className="hover:text-white">Explore</Link>
            <Link to="/notifications" className="hover:text-white">Notifications</Link>
            <Link to="/admin" className="hover:text-white">Admin</Link>
          </nav>
          <SecondaryButton onClick={logout}><LogOut size={16}/></SecondaryButton>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
      <div className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 bg-[color:var(--bg-card)] border border-white/10 rounded-2xl backdrop-blur-lg px-6 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.35)] flex items-center gap-6">
        <Link to="/feed"><Home/></Link>
        <Link to="/explore"><Compass/></Link>
        <Link to="/notifications"><Bell/></Link>
        <Link to="/profile/me"><User/></Link>
      </div>
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const load = async () => { const data = await apiGet('/api/posts'); setPosts(data); };
  useEffect(()=>{ load(); },[]);
  const like = async (id) => { await apiPost(`/api/posts/${id}/like`); load(); };
  const create = async (formData) => {
    const res = await fetch(`${API_URL}/api/posts`, { method: 'POST', headers: { ...(() => {const t=localStorage.getItem('swish_token');return t?{Authorization:`Bearer ${t}`}:{}})() }, body: formData });
    if(!res.ok) alert('Upload failed'); else { setOpen(false); load(); }
  };

  return (
    <Shell>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="hidden lg:block"/>
        <div className="space-y-4">
          <Card className="flex items-center justify-between">
            <div className="text-[color:var(--text-dim)]">Share a moment with your campus</div>
            <PrimaryButton onClick={()=>setOpen(true)}><Plus size={16}/> Create</PrimaryButton>
          </Card>
          {posts.map(p => (<PostCard key={p.id} post={p} onLike={like} />))}
        </div>
        <div className="hidden md:block space-y-4">
          <Card>
            <div className="text-sm text-[color:var(--text-dim)]">Filters</div>
            <div className="mt-2 flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-2xl bg-white/5 border border-white/10 text-sm">Recent</span>
              <span className="px-3 py-1 rounded-2xl bg-white/5 border border-white/10 text-sm">Trending</span>
              <span className="px-3 py-1 rounded-2xl bg-white/5 border border-white/10 text-sm">Following</span>
            </div>
          </Card>
        </div>
      </div>
      <CreatePostModal open={open} onClose={()=>setOpen(false)} onCreate={create} />
    </Shell>
  );
};

const Explore = () => {
  const [items, setItems] = useState([]);
  useEffect(()=>{ apiGet('/api/explore/trending').then(setItems); },[]);
  return (
    <Shell>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(p=> (
          <Card key={p.id} className="overflow-hidden p-0">
            {p.image_url && <img src={p.image_url} className="w-full h-40 object-cover"/>}
            <div className="p-3 text-sm">{p.caption}</div>
          </Card>
        ))}
      </div>
    </Shell>
  );
};

const Notifications = () => {
  const [items, setItems] = useState([]);
  useEffect(()=>{ apiGet('/api/notifications').then(setItems); },[]);
  const markRead = async (id)=>{ await apiPatch(`/api/notifications/${id}/read`); setItems(items.map(i=> i.id===id?{...i, read:true}:i)); };
  return (
    <Shell>
      <div className="space-y-3">
        {items.map(n=> (
          <Card key={n.id} className={`flex items-center justify-between ${n.read? 'opacity-60':''}`}>
            <div className="text-sm">{n.type} • {new Date(n.created_at).toLocaleString()}</div>
            {!n.read && <SecondaryButton onClick={()=>markRead(n.id)}>Mark read</SecondaryButton>}
          </Card>
        ))}
      </div>
    </Shell>
  );
};

const Profile = () => {
  const [me, setMe] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(()=>{ apiGet('/api/posts').then(setPosts).catch(()=>{});},[]);
  // For demo, we can't fetch /api/users/me; use placeholder header.
  const dummy = { name: 'You', bio: 'Be kind, be bold.', followers: 12, following: 8 };
  return (
    <Shell>
      <ProfileHeader user={dummy} />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {posts.map(p=> (
          <img key={p.id} src={p.image_url || `https://picsum.photos/seed/${p.id}/400/300`} className="w-full h-40 object-cover rounded-xl"/>
        ))}
      </div>
    </Shell>
  );
};

const Admin = () => {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(()=>{ apiGet('/api/admin/reports').then(setReports).catch(()=>{}); apiGet('/api/admin/users').then(setUsers).catch(()=>{}); },[]);
  const resolve = async (id)=>{ await apiPatch(`/api/admin/reports/${id}`, {}); setReports(reports.map(r=> r.id===id?{...r, status:'resolved'}:r)); };
  const block = async (id)=>{ await apiPatch(`/api/admin/users/${id}/block`, {}); setUsers(users.map(u=> u.id===id?{...u, blocked:true}:u)); };
  return (
    <Shell>
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="text-lg font-semibold mb-2">Reports</div>
          {reports.map(r=> (
            <div key={r.id} className="flex items-center justify-between py-2 border-t border-white/10">
              <div className="text-sm">{r.reason} • {r.status}</div>
              {r.status!=='resolved' && <PrimaryButton onClick={()=>resolve(r.id)} className="px-3 py-1 text-sm">Resolve</PrimaryButton>}
            </div>
          ))}
        </Card>
        <Card>
          <div className="text-lg font-semibold mb-2">Users</div>
          {users.map(u=> (
            <div key={u.id} className="flex items-center justify-between py-2 border-t border-white/10">
              <div className="text-sm">{u.name} • {u.email} • {u.role}</div>
              {!u.blocked && <SecondaryButton onClick={()=>block(u.id)} className="px-3 py-1 text-sm">Block</SecondaryButton>}
            </div>
          ))}
        </Card>
      </div>
    </Shell>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/profile/:id" element={<Profile/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
