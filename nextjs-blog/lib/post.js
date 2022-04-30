import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'


const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map((fileName) => {
        // remove ".md" from file name in order to get id
        const id = fileName.replace(/\.md$/, '')

        //read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        //conbine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    //sort posts by date
    return allPostsData.sort(({ data: a }, { data: b }) => {
        if (a < b) {
            return 1
        }
        else if (a > b) {
            return -1
        }
        else {
            return 0
        }
    })

}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  export async function getPostData(id){
      const fullPath = path.join(postsDirectory,`${id}.md`)
      const fileContents = fs.readFileSync(fullPath,'utf8')

      //use gray-matter to parse post metadata section
      const matterResult = matter(fileContents)

      //use remark to convert markdown into HTML string
      const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
      const contentHtml = processedContent.toString()
      //conbine the data with the id
      return{
          id,
          contentHtml,
          ...matterResult.data
      }
  }