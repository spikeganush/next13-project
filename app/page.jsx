import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">Idea Posts</span>
      </h1>
      <p className="desc text-center">
        This is an open-source IDEA posting tool for modern world to discover,
        create and share creative posts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
