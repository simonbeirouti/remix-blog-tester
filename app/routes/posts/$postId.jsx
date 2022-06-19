import { useParams } from "@remix-run/react"

export default function Post() {
    const params = useParams()
  
    return (
        <div>
            <h1>Post bro {params.postId}</h1>
        </div>
    )
}