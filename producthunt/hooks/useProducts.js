import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

function useProducts(field, order) {
    const [products, setProducts] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const getProducts = () => {
                firebase.db
                    .collection("products")
                    .orderBy(field, order)
                    .onSnapshot(manageSnapshot);
            };
            getProducts();
        }
        return () => (mounted = false);
    }, []);

    function manageSnapshot(snapshot) {
        const products = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        setProducts(products);
    }

    return {
        products,
    };
}

export default useProducts;
