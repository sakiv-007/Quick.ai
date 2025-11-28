import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages.jsx'
import RemoveBackground from './pages/RemoveBackground.jsx'
import RemoveObject from './pages/RemoveObject.jsx'
import ReviewResume from './pages/ReviewResume.jsx'
import Community from './pages/Community.jsx'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'



const App = () => {

  const { getToken, isSignedIn } = useAuth();
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (typeof getToken === 'function' && isSignedIn) {
          const token = await getToken();
          if (mounted) console.log(token);
        }
      } catch (err) {
        console.warn('Could not acquire Clerk token:', err?.message || err);
      }
    })();
    return () => { mounted = false; };
  }, [getToken, isSignedIn]);
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ai' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='write-article' element={<WriteArticle />} />
        <Route path='blog-titles' element={<BlogTitles />} />
        <Route path='generate-images' element={<GenerateImages />} />
        <Route path='remove-background' element={<RemoveBackground />} />
        <Route path='remove-object' element={<RemoveObject />} />
        <Route path='review-resume' element={<ReviewResume />} />
        <Route path='community' element={<Community />} />
        
      </Route>
    </Routes>
  )
}

export default App
