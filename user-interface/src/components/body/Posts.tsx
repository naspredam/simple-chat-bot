import React, { useContext } from 'react';
import { BarsLoader } from 'components/shared/BarsLoader';
import { PostsContext } from 'context/posts';
import { Post } from 'domain/post';
import './posts.less';

interface DialogTextInProgressProps {
    readonly type: string;
    readonly text: string;
}

const DialogTextInProgress = ({type, text}: DialogTextInProgressProps) => (
    <div className={'dialog-text'}>
        <div className={type}>{text}</div>
        <div className={'dialog-text-in-progress'}>
            <BarsLoader/>
        </div>
    </div>
);

interface DialogTextDoneProps {
    readonly type: string;
    readonly text: string;
    readonly response?: string;
}

const DialogTextDone = ({type, text, response}: DialogTextDoneProps) => (
    <div className={'dialog-text'}>
        <div className={type}>{text}</div>
        {response && <div className={'response'}>{response}</div>}
    </div>
);

export const Posts = () => {
    const postsContext = useContext<Post[]>(PostsContext);

    return (
        <ul className={'dialog-content'}>
            {postsContext
                .map((post, idx) => postsContext[postsContext.length - 1 - idx])
                .map((post: Post) => (
                    <li key={ post.id }>
                            { post.isRequestInProgress ?
                                <DialogTextInProgress {...post}/> :
                                <DialogTextDone {...post}/>
                            }
                    </li>)
                )}
        </ul>
    );
}