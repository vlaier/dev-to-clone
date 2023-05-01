import Head from 'next/head';
interface MetatagsProps {
  title: string;
  description: string;
  image?: string;
}
const Metatags = ({ title, description, image }: MetatagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Head>
  );
};

export default Metatags;
