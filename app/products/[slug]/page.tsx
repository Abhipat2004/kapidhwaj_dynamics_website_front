import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/products';
import ProductPageClient from '@/components/ProductPageClient';
import SentinelPage3D from '@/components/SentinelPage3D';
import ViperPage3D from '@/components/ViperPage3D';
import EagleEyePage3D from '@/components/EagleEyePage3D';
import Prox50Page3D from '@/components/Prox50Page3D';

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
    
    if (slug === 'kd-sentinel') {
        return <SentinelPage3D product={product} />;
    }
    
    if (slug === 'kd-viper') {
        return <ViperPage3D product={product} />;
    }

    if (slug === 'kd-eagle-eye') {
        return <EagleEyePage3D product={product} />;
    }

    if (slug === 'kd-prox50') {
        return <Prox50Page3D product={product} />;
    }
    
    return <ProductPageClient product={product} />;
}
