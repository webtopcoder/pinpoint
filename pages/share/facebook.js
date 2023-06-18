import React, { useEffect, useState } from "react";

const Facebook = () => {

    let obj = {}
    let params = window.location.href.split('?')[1]
    if (params && params.length <= 4) {
        let queries = params.split('&')
        queries.forEach((query) => {
            let [key, value] = query.split('=')
            obj[key] = value
        })
        obj.image = obj.image.split('_').join('/')    
    }

    
    const [title, setTitle] = useState(obj.title)
    const [description, setDescription] = useState(obj.description)
    const [redirect, setDirect] = useState(obj.description)
    const [image, setImage] = useState(obj.image)

    return (
        <>
            <head>
                <title>{title}</title>
                <meta property="og:url"
                    content={redirect} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image"
                    content={image.split('/').join('_')} />
            </head>

            <h1> mx </h1>
        </>
    );
};

export default Facebook;

