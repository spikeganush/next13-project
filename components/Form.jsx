import { formatTag } from '@utils/generalUtilities';
import Image from 'next/image';
import Link from 'next/link';

const Form = ({
  tags,
  filteredTags,
  setFilteredTags,
  type,
  post,
  setPost,
  error,
  setError,
  submitting,
  handleSubmit,
}) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleTagChange = (e) => {
    if (e.target.value === '') return;
    const tag = formatTag(e.target.value);
    // check if the tag already exists
    if (post.tags.includes(capitalizeFirstLetter(tag))) {
      document.querySelector('.form_tag').value = '';
      setError('Tag already exists');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    // add the new entry to the tag array
    setPost({
      ...post,
      tags: [...post.tags, capitalizeFirstLetter(tag)],
    });
    setFilteredTags([]);
    document.querySelector('.form_tag').value = '';
  };

  const handleTagSearch = (e) => {
    const value = e.target.value;
    if (value === '') {
      setFilteredTags([]);
      return;
    }
    let tagToSearch = formatTag(value);
    // filter the tags array
    const newFilteredTags = tags.filter(
      (tag) =>
        tag.includes(capitalizeFirstLetter(tagToSearch)) &&
        !post.tags.includes(tag)
    );
    setFilteredTags(newFilteredTags);
  };

  const handleDeleteTag = (tagTodelete) => {
    // delete the tag from the array
    setPost({
      ...post,
      tags: post.tags.filter((tag) => tag !== tagTodelete),
    });
  };

  return (
    <section className="w-full max-v-full flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing posts with the world, and let your imagination
        run wild.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your IDEA post
          </span>
          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            placeholder="Write your post here"
            required
            className="form_textarea"
          />
        </label>
        <div className="relative">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Tag{' '}
              <span className="font-normal">
                (#product, #grocery, #idea,...)
              </span>
            </span>
            <div className="flex">
              <div className="tag-search__area">
                <input
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagChange(e);
                      handleTagSearch(e);
                    }
                  }}
                  onChange={handleTagSearch}
                  placeholder="Enter to add a tag"
                  className="form_tag"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const mockEvent = {
                    target: {
                      value: document.querySelector('.form_tag').value,
                    },
                    preventDefault: () => {},
                  };
                  handleTagChange(mockEvent);
                }}
              >
                <Image
                  src="/assets/icons/enter-key.svg"
                  alt="tag"
                  width={35}
                  height={35}
                  className="object-contain ml-2"
                />
              </button>
              <div className="tag-list sm:flex hidden">
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {post &&
                  post.tags &&
                  post.tags.map((tag) => (
                    <button
                      type="button"
                      className="tag"
                      onClick={() => handleDeleteTag(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
              </div>
            </div>
          </label>
          {filteredTags && filteredTags.length > 0 && (
            <div className="tag-search">
              {filteredTags.map((tag) => (
                <button
                  type="button"
                  onClick={() => {
                    const mockEvent = {
                      target: {
                        value: tag,
                      },
                      preventDefault: () => {},
                    };
                    handleTagChange(mockEvent);
                  }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="tag-list sm:hidden flex">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {post &&
            post.tags &&
            post.tags.map((tag) => (
              <button className="tag" onClick={() => handleDeleteTag(tag)}>
                #{tag}
              </button>
            ))}
        </div>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `Loading...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
