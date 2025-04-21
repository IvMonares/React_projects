import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

export default function Home() {
    const { products } = useProducts("votes", "desc");

    return (
        <Layout>
            <div className="product-list">
                <div className="container">
                    <div className="bg-white">
                        <ul>
                            {products.map((product) => (
                                <ProductDetails
                                    key={product.id}
                                    product={product}
                                ></ProductDetails>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
