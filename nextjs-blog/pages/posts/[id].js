import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/post";

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}


//「export default」って架かれてるコンポネントが
//ブラウザに描画されるコンポネントで
//引数になっているpostDataはpropsの値の一つで
//上のgetStaticProps()でreturnされるpostDataのことを指す
export default function Post({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
    )
}