export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
  Upload: any;
};

export type AuthorRequest = {
  __typename?: "AuthorRequest";
  dateClosed?: Maybe<Scalars["DateTime"]>;
  dateOpened: Scalars["DateTime"];
  id: Scalars["ID"];
  status: Scalars["String"];
  user: User;
};

export type AuthorRequestInput = {
  status: Status;
  user: Scalars["ID"];
};

export type AuthorRequestWrapperType = {
  __typename?: "AuthorRequestWrapperType";
  authorRequest?: Maybe<AuthorRequest>;
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
};

export type Category = {
  __typename?: "Category";
  id: Scalars["ID"];
  name: Scalars["String"];
  slug: Scalars["String"];
};

export type CategoryInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name: Scalars["String"];
  slug?: InputMaybe<Scalars["String"]>;
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  owner: User;
  post: Post;
  text: Scalars["String"];
  title: Scalars["String"];
};

export type CommentInput = {
  id?: InputMaybe<Scalars["ID"]>;
  owner?: InputMaybe<Scalars["ID"]>;
  post?: InputMaybe<Scalars["ID"]>;
  text: Scalars["String"];
  title: Scalars["String"];
};

export type CreatePostType = {
  __typename?: "CreatePostType";
  errors?: Maybe<Scalars["JSON"]>;
  post?: Maybe<Post>;
  success: Scalars["Boolean"];
};

export type CreateSubscriptionType = {
  __typename?: "CreateSubscriptionType";
  errors?: Maybe<Scalars["JSON"]>;
  subscription?: Maybe<Subscription>;
  success: Scalars["Boolean"];
};

export type DeleteType = {
  __typename?: "DeleteType";
  deleted: Scalars["Boolean"];
};

export type DetailPost = {
  __typename?: "DetailPost";
  errors?: Maybe<Scalars["JSON"]>;
  notificationRemoved: Scalars["Boolean"];
  post?: Maybe<Post>;
  success: Scalars["Boolean"];
};

export type DjangoImageType = {
  __typename?: "DjangoImageType";
  height: Scalars["Int"];
  name: Scalars["String"];
  path: Scalars["String"];
  size: Scalars["Int"];
  url: Scalars["String"];
  width: Scalars["Int"];
};

export type EmailChangeInput = {
  newEmail1: Scalars["String"];
  newEmail2: Scalars["String"];
  token: Scalars["String"];
};

export type EmailChangeType = {
  __typename?: "EmailChangeType";
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
  user?: Maybe<User>;
};

/** An enumeration. */
export enum Language {
  De = "DE",
  En = "EN",
}

export type PaginationAuthorRequests = {
  __typename?: "PaginationAuthorRequests";
  authorRequests: Array<AuthorRequest>;
  numPages: Scalars["Int"];
};

export type PaginationPosts = {
  __typename?: "PaginationPosts";
  numPostPages: Scalars["Int"];
  posts: Array<Post>;
};

export type PasswordChangeInput = {
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
  oldPassword: Scalars["String"];
};

export type PasswordChangeType = {
  __typename?: "PasswordChangeType";
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
};

export type PasswordResetInput = {
  newPassword1: Scalars["String"];
  newPassword2: Scalars["String"];
  token: Scalars["String"];
};

export type PasswordResetType = {
  __typename?: "PasswordResetType";
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
};

export type PayloadType = {
  __typename?: "PayloadType";
  payload: TokenPayloadType;
};

export type Post = {
  __typename?: "Post";
  category: Category;
  commentCount: Scalars["Int"];
  comments: Array<Comment>;
  dateCreated: Scalars["DateTime"];
  id: Scalars["ID"];
  image?: Maybe<DjangoImageType>;
  isLiked: Scalars["Boolean"];
  isSubscribed: Scalars["Boolean"];
  likeCount: Scalars["Int"];
  owner: User;
  relatedMainPosts: Array<Post>;
  relatedSubPosts: Array<Post>;
  slug: Scalars["String"];
  status: PostStatus;
  /** A comma-separated list of tags. */
  tags: Array<Tag>;
  text: Scalars["String"];
  title: Scalars["String"];
};

export type PostInput = {
  category: Scalars["ID"];
  image?: InputMaybe<Scalars["Upload"]>;
  owner?: InputMaybe<Scalars["ID"]>;
  relatedPosts?: InputMaybe<Array<Scalars["Int"]>>;
  slug?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<PostStatus>;
  tags?: InputMaybe<Scalars["String"]>;
  text: Scalars["String"];
  title: Scalars["String"];
};

export type PostLike = {
  __typename?: "PostLike";
  id: Scalars["ID"];
  post: Post;
  user: User;
};

export type PostLikeInput = {
  post: Scalars["ID"];
  user?: InputMaybe<Scalars["ID"]>;
};

/** An enumeration. */
export enum PostStatus {
  Draft = "DRAFT",
  Published = "PUBLISHED",
}

export type PostTitleType = {
  __typename?: "PostTitleType";
  id: Scalars["ID"];
  title: Scalars["String"];
};

export type RefreshedTokenType = {
  __typename?: "RefreshedTokenType";
  payload: TokenPayloadType;
  refreshExpiresIn: Scalars["Int"];
  refreshToken: Scalars["String"];
  token: Scalars["String"];
};

export type RegisterAccountType = {
  __typename?: "RegisterAccountType";
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
};

export type ResendActivationEmailType = {
  __typename?: "ResendActivationEmailType";
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
};

export type RootMutation = {
  __typename?: "RootMutation";
  createAuthorRequest: AuthorRequestWrapperType;
  createCategory?: Maybe<Category>;
  createComment?: Maybe<Comment>;
  createPost: CreatePostType;
  createPostLike?: Maybe<PostLike>;
  createSubscription: CreateSubscriptionType;
  deleteComment: Scalars["Boolean"];
  deletePostLike: Scalars["Boolean"];
  deleteRefreshTokenCookie: DeleteType;
  deleteSubscription: Scalars["Boolean"];
  deleteTokenCookie: DeleteType;
  emailChange: EmailChangeType;
  passwordChange: PasswordChangeType;
  passwordReset: PasswordResetType;
  refreshToken: RefreshedTokenType;
  register: RegisterAccountType;
  resendActivationEmail: ResendActivationEmailType;
  sendEmailChangeEmail: SendEmailChangeEmailType;
  sendPasswordResetEmail: SendPasswordResetEmailType;
  tokenAuth: TokenDataType;
  updateAccount: UpdateAccountType;
  updateAuthorRequest: AuthorRequestWrapperType;
  updateCategory?: Maybe<Category>;
  updateComment?: Maybe<Comment>;
  updatePost?: Maybe<UpdatePostType>;
  updatePostStatus: UpdatePostStatusType;
  updateUserProfile: UpdateUserProfileType;
  verifyAccount: VerifyAccountType;
  verifyToken: PayloadType;
};

export type RootMutationCreateCategoryArgs = {
  categoryInput: CategoryInput;
};

export type RootMutationCreateCommentArgs = {
  commentInput: CommentInput;
};

export type RootMutationCreatePostArgs = {
  postInput: PostInput;
};

export type RootMutationCreatePostLikeArgs = {
  postLikeInput: PostLikeInput;
};

export type RootMutationCreateSubscriptionArgs = {
  subscriptionInput: SubscriptionInput;
};

export type RootMutationDeleteCommentArgs = {
  commentId: Scalars["ID"];
};

export type RootMutationDeletePostLikeArgs = {
  postLikeInput: PostLikeInput;
};

export type RootMutationDeleteSubscriptionArgs = {
  subscriptionInput: SubscriptionInput;
};

export type RootMutationEmailChangeArgs = {
  emailChangeInput: EmailChangeInput;
};

export type RootMutationPasswordChangeArgs = {
  passwordChangeInput: PasswordChangeInput;
};

export type RootMutationPasswordResetArgs = {
  passwordResetInput: PasswordResetInput;
};

export type RootMutationRefreshTokenArgs = {
  refreshToken?: InputMaybe<Scalars["String"]>;
  token?: InputMaybe<Scalars["String"]>;
};

export type RootMutationRegisterArgs = {
  userRegistrationInput: UserRegistrationInput;
};

export type RootMutationResendActivationEmailArgs = {
  email: Scalars["String"];
};

export type RootMutationSendEmailChangeEmailArgs = {
  email: Scalars["String"];
};

export type RootMutationSendPasswordResetEmailArgs = {
  email: Scalars["String"];
};

export type RootMutationTokenAuthArgs = {
  password: Scalars["String"];
  refreshToken?: InputMaybe<Scalars["String"]>;
  token?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type RootMutationUpdateAccountArgs = {
  updateAccountInput: UpdateAccountInput;
};

export type RootMutationUpdateAuthorRequestArgs = {
  authorRequestInput: AuthorRequestInput;
};

export type RootMutationUpdateCategoryArgs = {
  categoryInput: CategoryInput;
};

export type RootMutationUpdateCommentArgs = {
  commentInput: CommentInput;
};

export type RootMutationUpdatePostArgs = {
  postInput: PostInput;
};

export type RootMutationUpdatePostStatusArgs = {
  updatePostStatusInput: UpdatePostStatusInput;
};

export type RootMutationUpdateUserProfileArgs = {
  userProfileInput: UserProfileInput;
};

export type RootMutationVerifyAccountArgs = {
  token: Scalars["String"];
};

export type RootMutationVerifyTokenArgs = {
  token: Scalars["String"];
};

export type RootQuery = {
  __typename?: "RootQuery";
  authorRequestByUser?: Maybe<AuthorRequest>;
  categories: Array<Category>;
  categoryById: Category;
  me?: Maybe<User>;
  paginatedAuthorRequests: PaginationAuthorRequests;
  paginatedNotificationPosts: PaginationPosts;
  paginatedPosts: PaginationPosts;
  paginatedUserPosts: PaginationPosts;
  postBySlug?: Maybe<DetailPost>;
  postTitles: Array<PostTitleType>;
  tags: Array<Tag>;
  usedTags: Array<Tag>;
  user?: Maybe<User>;
  userByUsername?: Maybe<User>;
  userSubscriptions: Array<Subscription>;
  users: Array<User>;
};

export type RootQueryCategoryByIdArgs = {
  id: Scalars["ID"];
};

export type RootQueryPaginatedAuthorRequestsArgs = {
  activePage?: InputMaybe<Scalars["Int"]>;
  sort?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type RootQueryPaginatedNotificationPostsArgs = {
  activePage?: InputMaybe<Scalars["Int"]>;
};

export type RootQueryPaginatedPostsArgs = {
  activePage?: InputMaybe<Scalars["Int"]>;
  categorySlug?: InputMaybe<Scalars["String"]>;
  tagSlugs?: InputMaybe<Scalars["String"]>;
};

export type RootQueryPaginatedUserPostsArgs = {
  activePage?: InputMaybe<Scalars["Int"]>;
};

export type RootQueryPostBySlugArgs = {
  slug: Scalars["String"];
};

export type RootQueryUsedTagsArgs = {
  categorySlug?: InputMaybe<Scalars["String"]>;
};

export type RootQueryUserByUsernameArgs = {
  username: Scalars["String"];
};

export type RootQueryUserSubscriptionsArgs = {
  sort?: InputMaybe<Scalars["String"]>;
};

export type SendEmailChangeEmailType = {
  __typename?: "SendEmailChangeEmailType";
  success: Scalars["Boolean"];
};

export type SendPasswordResetEmailType = {
  __typename?: "SendPasswordResetEmailType";
  success: Scalars["Boolean"];
};

/** An enumeration. */
export enum Status {
  Accepted = "ACCEPTED",
  Pending = "PENDING",
  Rejected = "REJECTED",
}

export type Subscription = {
  __typename?: "Subscription";
  author: User;
  dateCreated: Scalars["DateTime"];
  id: Scalars["ID"];
  subscriber: User;
};

export type SubscriptionInput = {
  author: Scalars["ID"];
  subscriber: Scalars["ID"];
};

export type Tag = {
  __typename?: "Tag";
  name: Scalars["String"];
  slug: Scalars["String"];
};

export type TokenDataType = {
  __typename?: "TokenDataType";
  payload: TokenPayloadType;
  refreshExpiresIn?: Maybe<Scalars["Int"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  token: Scalars["String"];
};

export type TokenPayloadType = {
  __typename?: "TokenPayloadType";
  exp: Scalars["Int"];
  origIat: Scalars["Int"];
  username: Scalars["String"];
};

export type UpdateAccountInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
};

export type UpdateAccountType = {
  __typename?: "UpdateAccountType";
  errors?: Maybe<Scalars["JSON"]>;
  success: Scalars["Boolean"];
};

export type UpdatePostStatusInput = {
  postSlug: Scalars["String"];
  status: PostStatus;
};

export type UpdatePostStatusType = {
  __typename?: "UpdatePostStatusType";
  errors?: Maybe<Scalars["JSON"]>;
  post?: Maybe<Post>;
  success: Scalars["Boolean"];
};

export type UpdatePostType = {
  __typename?: "UpdatePostType";
  errors?: Maybe<Scalars["JSON"]>;
  post?: Maybe<Post>;
  success: Scalars["Boolean"];
};

export type UpdateUserProfileType = {
  __typename?: "UpdateUserProfileType";
  errors?: Maybe<Scalars["JSON"]>;
  profile?: Maybe<UserProfile>;
  success: Scalars["Boolean"];
};

export type User = {
  __typename?: "User";
  avatar?: Maybe<DjangoImageType>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["ID"];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars["Boolean"];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars["Boolean"];
  isSubscribed: Scalars["Boolean"];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars["Boolean"];
  lastName: Scalars["String"];
  notificationCount: Scalars["Int"];
  password: Scalars["String"];
  posts: Array<Post>;
  profile: UserProfile;
  userStatus: UserStatus;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars["String"];
};

export type UserProfile = {
  __typename?: "UserProfile";
  commentSectionCollapsed: Scalars["Boolean"];
  darkThemeActive: Scalars["Boolean"];
  id: Scalars["ID"];
  language: Language;
  relatedPostsCollapsed: Scalars["Boolean"];
  user: User;
};

export type UserProfileInput = {
  commentSectionCollapsed: Scalars["Boolean"];
  darkThemeActive: Scalars["Boolean"];
  language: Language;
  relatedPostsCollapsed: Scalars["Boolean"];
};

export type UserRegistrationInput = {
  avatar?: InputMaybe<Scalars["Upload"]>;
  email: Scalars["String"];
  password1: Scalars["String"];
  password2: Scalars["String"];
  username: Scalars["String"];
};

export type UserStatus = {
  __typename?: "UserStatus";
  archived: Scalars["Boolean"];
  id: Scalars["ID"];
  isAuthor: Scalars["Boolean"];
  secondaryEmail?: Maybe<Scalars["String"]>;
  user: User;
  verified: Scalars["Boolean"];
};

export type VerifyAccountType = {
  __typename?: "VerifyAccountType";
  success: Scalars["Boolean"];
};
