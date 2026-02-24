import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/products';
import ProductPageClient from '@/components/ProductPageClient';

export async function generateStaticParams() {
    return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: 'Product Not Found' };
    return {
        title: `${product.name} — KapiDhwaj Dynamics`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();
    return <ProductPageClient product={product} />;
}
