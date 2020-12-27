import React from 'react';
import { Post } from 'domain/post';

export const PostsContext = React.createContext<Post[]>([]);
