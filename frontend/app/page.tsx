import Navbar from "./components/Navbar";
import HomeToolbar from "./components/HomeToolBar";
import PostList from "./components/PostList";
import Sidebar from "./components/SideBar";

export default function Home() {
  const posts = [
    {
      id: 1,
      authorName: "Wittawat",
      community: "History",
      title: "The Beginning of the End of the World",
      excerpt:
        "The afterlife sitcom The Good Place comes to its culmination...",
      commentCount: 32,
    },
    {
      id: 2,
      authorName: "Zach",
      community: "History",
      title: "The Big Short War",
      excerpt:
        "Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid...",
      commentCount: 4,
    },
    {
      id: 3,
      authorName: "Nicholas",
      community: "Exercise",
      title: "The Mental Health Benefits of Exercise",
      excerpt:
        "You already know that exercise is good for your body. But did you know it can also boost your mood...",
      commentCount: 32,
    },
  ];

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex pt-12 md:pt-8 pl-4 pr-4 w-full">
        <div className="md:w-[22.5%] hidden md:flex-1 md:block ">
          <Sidebar />
        </div>
        <div className="md:w-[55%] max-w-[798px]  ">
          <HomeToolbar />
          <PostList posts={posts} />
        </div>
        <div className="md:w-[22.5%] md:flex-1"></div>
      </div>
    </div>
  );
}
