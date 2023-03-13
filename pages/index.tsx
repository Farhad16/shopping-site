import Layout from "../components/Layout";
import Products from "../components/Products";
import { data } from "../utls/staticData";

export default function Home() {
  return (
    <Layout title="Home page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data?.products?.map((product) => (
          <Products key={product.name} product={product} />
        ))}
      </div>
    </Layout>
  );
}
