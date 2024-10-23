import Post from "@/components/post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  return (
    <div className="h-screen w-full bg-[#15202B] px-[10%]">
      <div className="flex flex-row items-start gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <Avatar>
          <AvatarImage
            className="w-12 h-12 rounded-full"
            src="https://github.com/shadcn.png"
            alt="User avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col w-full">
          <Textarea
            placeholder="O que está acontecendo?"
            className="w-full h-24 p-2 bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <Button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
              Postar
            </Button>
          </div>
        </div>
      </div>

      <Post
        postId={"91915"}
        content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et cursus diam. Fusce sed rutrum sapien. Donec ex purus, tincidunt at libero a, lobortis malesuada quam."}
        author={"Nannie Mason"}
        date={"2h ago"}
        userId={"32132131231"}
        likesCount={92}
        commentsCount={37}
        repliesCount={78}
      />
      <Post
        postId={"27025"}
        content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et cursus diam. Fusce sed rutrum sapien. Donec ex purus, tincidunt at libero a, lobortis malesuada quam."}
        author={"Jorge"}
        date={"4d ago"}
        userId={"3123123123"}
        likesCount={78}
        commentsCount={61}
        repliesCount={90}
      />
    </div>
  );
}

export default Home;