'use client';

import { useState, useEffect } from 'react';

import Profile from '@/components/Profile';
import { useParams, useSearchParams } from 'next/navigation';

const UserProfile = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <Profile
      name={name}
      desc={`Welcome to ${name}'s personalized profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
