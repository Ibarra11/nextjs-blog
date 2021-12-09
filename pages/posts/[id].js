import Head from "next/head";
import Layout from '../../components/layout'
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{ postData.title}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
        </Layout>
    )
}


/* 
    This is responsible for listing the possible dynamic routes for this component.
    Paths, also has to be an array.  The way it works is when a url is entered.
    /posts/ssg-ssr
    paths = [
        {
            params: {
                id: "ssg-ssr"
            }
        }, {
            params: {
                id: "pre-rendering"
            }
        }
    ]
*/
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}