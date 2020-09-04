import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "username",
  name: "name",
  profile_image:
    "https://invisiblelightnetwork.com/wp-content/uploads/2014/10/SV_SH06.jpg"
  // profile_image:
  // "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "https://invisiblelightnetwork.com/wp-content/uploads/2014/10/SV_SH06.jpg"
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">LOOK AT THE SKY IM STILL HERE</span>`,
  user: defaultUser,
  media:
    "https://external-preview.redd.it/5jIkhAynRH5tF6NUkZhFOgvlLBG3J_wRzqZCYwaNFco.jpg?auto=webp&s=72ecf1213194f164d16d2ed97de5cf0e950056c5",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">LOOK AT THE SKY IM STILL HERE</span>`,
    user: defaultUser,
    media:
      "https://external-preview.redd.it/5jIkhAynRH5tF6NUkZhFOgvlLBG3J_wRzqZCYwaNFco.jpg?auto=webp&s=72ecf1213194f164d16d2ed97de5cf0e950056c5",
    comments: [],
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "me",
  name: "myself",
  profile_image:
    "https://invisiblelightnetwork.com/wp-content/uploads/2014/10/SV_SH06.jpg",
  email: "me@gmail.com",
  bio: "This is my bio",
  phone_number: "555-555-5555",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
