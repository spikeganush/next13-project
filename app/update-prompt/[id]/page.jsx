'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = ({ params }) => {
  const router = useRouter();
  const promptId = params?.id;

  const [post, setPost] = useState({ prompt: '', tags: '' });
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
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tags: data.tags,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert('Missing PromptId!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
