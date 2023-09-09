'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const UpdatePost = ({ params }) => {
  const router = useRouter();
  const postId = params?.id;

  const [post, setPost] = useState({ post: '', tags: '' });
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      const res = await fetch('/api/tags');
      const tags = await res.json();
      const formatTag = tags.map((tag) => tag.name);
      setTags(formatTag);
    };
    getTags();
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        post: data.post,
        tags: data.tags,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert('Missing PostId!');

    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          post: post.post,
          tags: post.tags,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      tags={tags}
      filteredTags={filteredTags}
      setFilteredTags={setFilteredTags}
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePost}
    />
  );
};

export default UpdatePost;
