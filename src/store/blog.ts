import { defineStore } from "pinia";
import { apolloClient } from "../api/client";
import {
  AuthorRequestInput,
  Category,
  PaginationAuthorRequests,
  PaginationPosts,
  Post,
  PostInput,
  PostTitleType,
  Tag,
  UpdatePostStatusInput,
} from "../api/models";
import Posts from "../graphql/getPosts.gql";
import UserPosts from "../graphql/getUserPosts.gql";
import NotificationPosts from "../graphql/getNotificationPosts.gql";
import UserSubscriptions from "../graphql/getUserSubscriptions.gql";
import PostBySlug from "../graphql/getPost.gql";
import CreatePost from "../graphql/createPost.gql";
import UpdatePost from "../graphql/updatePost.gql";
import PostTitles from "../graphql/getPostTitles.gql";
import Tags from "../graphql/getTags.gql";
import Categories from "../graphql/categories.gql";
import UsedTags from "../graphql/getUsedTags.gql";
import AuthorRequests from "../graphql/getAuthorRequests.gql";
import CreateSubscription from "../graphql/createSubscription.gql";
import DeleteSubscription from "../graphql/deleteSubscription.gql";
import CreateComment from "../graphql/createComment.gql";
import DeleteComment from "../graphql/deleteComment.gql";
import CreatePostLike from "../graphql/createPostLike.gql";
import UpdatePostStatus from "../graphql/updatePostStatus.gql";
import DeletePostLike from "../graphql/deletePostLike.gql";
import UpdateAuthorRequest from "../graphql/updateAuthorRequest.gql";

export type PostState = {
  paginatedPosts: PaginationPosts | null;
  paginatedUserPosts: PaginationPosts | null;
  post: Post | null;
  postTitles: PostTitleType[];
  tags: Tag[];
  categories: Category[];
  usedTags: Tag[];
  paginatedAuthorRequests: PaginationAuthorRequests | null;
};

export const usePostStore = defineStore("blog", {
  state: () =>
    ({
      paginatedPosts: null,
      paginatedUserPosts: null,
      post: null,
      postTitles: [],
      tags: [],
      categories: [],
      usedTags: [],
      paginatedAuthorRequests: null,
    } as PostState),
  actions: {
    async fetchPosts(
      tagSlugsParam: string | undefined,
      categorySlugParam: string | undefined,
      activePage: number
    ) {
      const response = await apolloClient.query({
        query: Posts,
        variables: {
          tagSlugs: tagSlugsParam,
          categorySlug: categorySlugParam,
          activePage: activePage,
        },
      });
      this.paginatedPosts = response.data.paginatedPosts;
    },
    async fetchPost(postSlug: string | undefined, reload: boolean) {
      if (reload) this.post = null;
      const response = await apolloClient.query({
        query: PostBySlug,
        variables: {
          slug: postSlug,
        },
      });
      this.post = response.data.postBySlug.post;
    },
    async createPost(postInput: PostInput) {
      const response = await apolloClient.mutate({
        mutation: CreatePost,
        variables: {
          postInput,
        },
      });
      this.post = response.data.createPost.post;
      return response.data.createPost.success;
    },
    async updatePost(postInput: PostInput) {
      const response = await apolloClient.mutate({
        mutation: UpdatePost,
        variables: {
          postInput,
        },
      });
      return response.data.updatePost.success;
    },
    async updatePostStatus(updatePostStatusInput: UpdatePostStatusInput) {
      const response = await apolloClient.query({
        query: UpdatePostStatus,
        variables: {
          updatePostStatusInput,
        },
      });
      return response.data.updatePostStatus.success;
    },
    async fetchUserPosts(activePage: number) {
      const response = await apolloClient.query({
        query: UserPosts,
        variables: {
          activePage,
        },
      });
      this.paginatedUserPosts = response.data.paginatedUserPosts;
    },
    async fetchPostTitles() {
      const response = await apolloClient.query({
        query: PostTitles,
      });
      this.postTitles = response.data.postTitles.map((obj: any) => ({
        value: obj.id,
        label: obj.title,
      }));
    },
    async fetchCategories() {
      if (this.categories.length === 0) {
        const response = await apolloClient.query({
          query: Categories,
        });
        this.categories = response.data.categories;
      }
    },
    async fetchTags() {
      if (this.tags.length === 0) {
        const response = await apolloClient.query({
          query: Tags,
        });
        this.tags = response.data.tags;
      }
    },
    async fetchUsedTags(category: string | undefined) {
      const response = await apolloClient.query({
        query: UsedTags,
        variables: {
          categorySlug: category,
        },
      });
      this.usedTags = response.data.usedTags;
    },
    async fetchAuthorRequests(
      status: string | undefined,
      sort: string | undefined,
      activePage: number | undefined
    ) {
      const response = await apolloClient.query({
        query: AuthorRequests,
        variables: {
          status,
          sort,
          activePage,
        },
      });
      this.paginatedAuthorRequests = response.data.paginatedAuthorRequests;
    },
    async updateAuthorRequest(authorRequestInput: AuthorRequestInput) {
      const response = await apolloClient.query({
        query: UpdateAuthorRequest,
        variables: {
          authorRequestInput,
        },
      });
      return response.data.updateAuthorRequest.success;
    },
    async createComment(commentInput: any) {
      if (this.post) {
        await apolloClient.mutate({
          mutation: CreateComment,
          variables: {
            commentInput: commentInput,
          },
        });
        await this.fetchPost(this.post.slug, false);
      }
    },
    async deleteComment(commentId: number) {
      await apolloClient.mutate({
        mutation: DeleteComment,
        variables: {
          commentId: commentId,
        },
      });
      await this.fetchPost(this.post?.slug, false);
    },
    async createPostLike() {
      if (this.post) {
        const response = await apolloClient.mutate({
          mutation: CreatePostLike,
          variables: {
            postLikeInput: {
              post: this.post.id,
            },
          },
        });
        if (response.data.createPostLike) {
          await this.fetchPost(this.post.slug, false);
        }
      }
    },
    async deletePostLike() {
      if (this.post) {
        await apolloClient.mutate({
          mutation: DeletePostLike,
          variables: {
            postLikeInput: {
              post: this.post.id,
            },
          },
        });
        await this.fetchPost(this.post.slug, false);
      }
    },
  },
});
