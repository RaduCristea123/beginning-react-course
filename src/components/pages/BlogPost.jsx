import React, { useParams } from 'react-router-dom'

function BlogPost() {
    const params = useParams()

    return (
        <div className="container">
            This is blog post {params.id}.
        </div>
    )
}

export default BlogPost