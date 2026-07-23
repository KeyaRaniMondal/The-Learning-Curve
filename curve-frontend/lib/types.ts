export type IPost = {
    id: string;
    title: string;
    content: string;
    thumbnail: string | null;
    isFeatured: boolean;
    // status: IPostStatus;
    tags: string[];
    views: number;
    isPremium: boolean;
    authorId: string;
    // author?: IAuthor;
    // comments?: IComment[];
    _count?: {
        comments: number;
    };
    createdAt: string;
    updatedAt: string;
};