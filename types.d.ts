type Blog = {
  id: string;
  blogTItle: string;
  blogContent: string;
  userId: string;
  createdBy: User;
};

type User = {
  id: string;
  email: string;
  name: string;
  username: string;
};
