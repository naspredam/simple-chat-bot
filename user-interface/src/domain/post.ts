import {v4 as uuidv4} from "uuid";

export interface Post {
    id: string;
    type: 'input' | 'introduction';
    isRequestInProgress: boolean;
    text: string;
    response?: string;
}

export const createRequestPost = (newPostText: string): Post => (
    {
        id: uuidv4(),
        type: 'input',
        isRequestInProgress: true,
        text: newPostText,
    }
);

export const completeRequestPost = (post: Post, responseText: string): Post => (
    {
        ...post,
        response: responseText,
        isRequestInProgress: false,
    }
);