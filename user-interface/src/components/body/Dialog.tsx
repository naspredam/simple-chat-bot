import React, {useCallback, useState} from 'react';
import { InteractionField } from 'components/body/InteractionField';
import { Posts } from 'components/body/Posts';
import { completeRequestPost, createRequestPost, Post } from 'domain/post';
import { PostsContext } from 'context/posts';
import { v4 as uuidv4 } from 'uuid';

const introductionPost: Post = (
    {
        id: uuidv4(),
        type: 'introduction',
        isRequestInProgress: false,
        text: 'Let\'s chat! (type \'quit\' to exit)',
    }
);

interface PostResponse {
    readonly answer: string;
}

export const Dialog = () => {
    const [posts, setPosts] = useState<Post[]>([introductionPost]);
    const fetchPostReply = useCallback((newPostText: string) => {
        const post = createRequestPost(newPostText);
        const postInProgress = posts.concat(post);
        setPosts(postInProgress);
        fetch(`http://localhost:5000?sentence=${newPostText}`)
            .then((response: any) => response.json())
            .then(({ answer }: PostResponse) => {
                const updatedPosts = postInProgress
                    .map((postIter: Post) => postIter.id === post.id ?
                        completeRequestPost(postIter, answer) : postIter);
                setPosts(updatedPosts);
            })
        }, [posts, setPosts]);

    return (
        <React.Fragment>
            <PostsContext.Provider value={ posts }>
                <div className={'dialog-wrapper'}>
                    <Posts />
                </div>
                <div className={'interaction-field-wrapper'}>
                    <InteractionField setNewPostInput={fetchPostReply} />
                </div>
            </PostsContext.Provider>
        </React.Fragment>
    );
}
