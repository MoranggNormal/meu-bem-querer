import {useRouter} from "next/router";

const Post = () => {
    const router = useRouter();
    const data = router.query;

    console.log(data);
    return <p>Post: {data.pet}</p>;
};

export default Post;
