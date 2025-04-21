import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

export default function Search() {
    const router = useRouter();
    const query = router.query.q;

    const { products } = useProducts("creationDate", "desc");

    const filtered = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
    });

    return (
        <Layout>
            <div className="product-list">
                <div className="container">
                    <div className="bg-white">
                        {filtered.length == 0 ? (
                            <p>No hay productos. Intente con otra busqueda.</p>
                        ) : (
                            <ul>
                                {filtered.map((product) => (
                                    <ProductDetails
                                        key={product.id}
                                        product={product}
                                    ></ProductDetails>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
