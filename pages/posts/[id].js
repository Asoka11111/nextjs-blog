import Head from 'next/head';

import Layout from '../../components/layout';
import Date from '../../components/date';

import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css';

export const getStaticPaths = async () => {
    // Return a list of possible value for id

    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
};

export const getStaticProps = async ({ params }) => {
    // Fetch necessary data for the blog post using params.id

    const postData =  await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
};

const Post = ({ postData }) => (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXL}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
);

export default Post;