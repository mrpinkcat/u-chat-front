import axios from 'axios';
import store from '../store/index';

const domain = 'http://localhost:3000';

// @ts-ignore
const register = (username: string, firstName: string, lastName: string, password: string): Promise<string> => new Promise((resolve, reject) => {
  const body = {
    username,
    firstName,
    lastName,
    password,
  };
  console.log({ body });

  axios.post(`${domain}/auth/register`, body)
    .then((res) => {
      console.log(res.data);
      resolve(res.data.token);
    })
    .catch((err) => {
      console.log(err);
    });

  // fetch(`${domain}/auth/register`, {
  //   method: 'POST',
  //   body: JSON.stringify(body),
  // })
  //   .then((res) => {
  //     if (res.status >= 200 && res.status < 300) {
  //       return res.json();
  //     } else {
  //       throw console.error('error pas 200');
  //     }
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     resolve(res.token);
  //   });
});

const login = (username: string, password: string): Promise<{token: string, username: string, firstName: string, lastName: string, lastLogin: Date}> => new Promise((resolve, reject) => {
  axios.post(`${domain}/auth/login`, {
    username,
    password,
  })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const searchUsers = (query: string) => new Promise((resolve, reject) => {
  axios.get(`${domain}/user/search`, {
    params: {
      q: query,
    },
    headers: {
      Authorization: `Bearer ${store.getters.getToken}`,
    },
  })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const addFriend = (friendUsername: string): Promise<{username: String, firstName: String, lastName: String}[]> => new Promise((resolve, reject) => {
  axios.post(`${domain}/user/friend`, {
    friendUsername,
  }, {
    headers: {
      Authorization: `Bearer ${store.getters.getToken}`,
    },
  })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const getConvs = (): Promise<{ _id: String, name: String, topic: String, members: { username: String, firstName: String, lastName: String }[], messages: {}[] }[]> => new Promise((resolve, reject) => {
  axios.get(`${domain}/conversation`, {
    headers: {
      Authorization: `Bearer ${store.getters.getToken}`,
    },
  })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const getFriends = (): Promise<{ username: String, firstName: String, lastName: String }[]> => new Promise((resolve, reject) => {
  axios.get(`${domain}/user/friends`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const createConversation = (name: String, topic: String, members: { username: String, firstName: String, lastName: String }[]): Promise<{ _id: String }> => new Promise((resolve, reject) => {
  axios.post(`${domain}/conversation`, {
    name,
    topic,
    members,
  },
  {
    headers: {
      Authorization: `Bearer ${store.getters.getToken}`,
    },
  })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const getConvInfo = (id: String): Promise<{ name: String, topic: String, members: { username: String, firstName: String, lastName: String }[], messages: { content: String, sender: String, conv: String }[] }> => new Promise((resolve, reject) => {
  axios.get(`${domain}/conversation/${id}`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export {
  login,
  register,

  getConvs,
  getConvInfo,
  createConversation,

  searchUsers,
  addFriend,
  getFriends,
};
