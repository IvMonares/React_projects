import { useEffect } from "react";
import router from "next/router";

const Home = () => {
    useEffect(() => {
        router.push("/upload");
    }, []);

    return null;
};

export default Home;
