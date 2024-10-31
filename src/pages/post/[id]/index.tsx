import { Avatar } from "@/components/ui/avatar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import HomeButton from "@/components/homeButton";
import { toast } from "sonner";
import { PostService } from "@/services/post";
import { LoadingSpinner } from "@/components/ui/loading";
import ProfilePicture from "@/components/profilePicture";
import { formatPostDate } from "@/components/helpers/formatDate";
import { PostType } from "@/models/Post";

const PostPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [post, setPost] = useState<PostType>();
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const dataService = new PostService();
    const { id: postId } = router.query;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const returnData = await dataService.getPostById(postId as string);
                console.log(returnData)
                setPost(returnData);
                setLiked(returnData.isLiked)
                setLikes(returnData.likes.length)
            } catch (error) {
                toast.error("Erro ao carregar dados");
                console.error('Erro ao carregar dados do post:', error);
            }
            setLoading(false);
        };

        fetchPost();
    }, [postId]);

    const handleLike = () => {
        setLiked(!liked);
        setLikes((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <>
            {loading || !post ? (
                <LoadingSpinner label="Carregando dados do usuário..." />
            ) : (
                <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg border border-gray-700">
                    <HomeButton />
                    <div className="flex flex-row items-start gap-4 mt-6">
                        <Link href={`/profile/${post.author}`} passHref>
                            <Avatar className="cursor-pointer">
                                <ProfilePicture handler={post.author || ""} />
                            </Avatar>
                        </Link>

                        <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 hover:underline">
                                    <Link href={`/profile/${post.author}`} passHref>
                                        <span className="text-sm text-gray-400">@{post.author}</span>
                                    </Link>
                                </div>
                                <span className="text-sm text-gray-400">{formatPostDate(post.date)}</span>
                            </div>

                            <p className="mt-4 text-gray-200">{post.content}</p>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-6">
                                    <button
                                        className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                                        onClick={handleLike}
                                    >
                                        {liked ? (
                                            <FaHeart className={`transition-transform duration-200 transform text-red-500`} />
                                        ) : (
                                            <FaRegHeart className={`transition-transform duration-200 ${liked ? "text-red-500" : ""} transform scale-100`} />
                                        )}
                                        <span>{likes}</span>
                                    </button>

                                    {/* <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                                        <FaShareAlt />
                                        <span>Compartilhar</span>
                                    </button> */}
                                </div>

                                <div className="text-gray-400">
                                    <span>{post.comments.length} respostas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl text-white">Comentários</h2>
                        {post.comments.length > 0 ? (
                            // post.comments.map((comment: any) => (
                            //     <div key={comment._id} className="flex items-start gap-4 mt-4 bg-gray-800 p-4 rounded-lg">
                            //         <Link href={`/profile/${comment.author}`} passHref>
                            //             <Avatar>
                            //                 <AvatarImage
                            //                     className="w-10 h-10 rounded-full"
                            //                     src="https://github.com/shadcn.png"
                            //                     alt="User avatar"
                            //                 />
                            //                 <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                            //             </Avatar>
                            //         </Link>
                            //         <div className="flex flex-col w-full">
                            //             <div className="flex items-center justify-between">
                            //                 <div className="flex items-center gap-2">
                            //                     <Link href={`/profile/${comment.author}`} passHref>
                            //                         <span className="font-semibold text-white cursor-pointer hover:underline">
                            //                             {comment.author}
                            //                         </span>
                            //                     </Link>
                            //                     <span className="text-sm text-gray-400">{new Date(comment.date).toLocaleString()}</span>
                            //                 </div>
                            //             </div>
                            //             <p className="mt-1 text-gray-200">{comment.content}</p>
                            //         </div>
                            //     </div>
                            // ))
                            <p>oi</p>
                        ) : (
                            <p className="text-gray-400">Nenhum comentário ainda.</p>
                        )}
                    </div>
                </div >
            )}
        </>
    );
};

export default PostPage;
