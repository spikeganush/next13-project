'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState({
    post: '',
    tags: [],
  });
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      const res = await fetch('/api/tags', {
        next: {
          cache: 'no-store',
        },
      });
      const tags = await res.json();
      const formatTag = tags.map((tag) => tag.name);
      setTags(formatTag);
    };
    getTags();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (post.tags.length === 0) {
        setError('Please add at least one tag');
        setTimeout(() => {
          setError('');
        }, 3000);
        setSubmitting(false);
        return;
      }
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          post: post.post,
          tags: post.tags,
          userId: session?.user.id,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      tags={tags}
      filteredTags={filteredTags}
      setFilteredTags={setFilteredTags}
      post={post}
      setPost={setPost}
      error={error}
      setError={setError}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
