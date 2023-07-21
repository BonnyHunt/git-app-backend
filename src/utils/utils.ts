import { Octokit } from 'octokit';

export const findRepositories = async (data, page, per_page) => {

  const octokit = new Octokit({
    auth: `${data.gitToken}`,
  })

  try {
    const result = await octokit.request(
      `GET /users/{owner}/repos?page=${page}&per_page=${per_page}`,
      {
        owner: `${data.username}`,
      })

    return result?.data;

  } catch (error) {
    console.log(error);
  }
};

export const findRepository = async (data, name) => {

  const octokit = new Octokit({
    auth: `${data.gitToken}`,
  })

  try {
    const result = await octokit.request(`GET /repos/{owner}/{repo}`, {
      owner: `${data.username}`,
      repo: `${name}`,
    })

    return result?.data;

  } catch (error) {
    console.log(error);
  }
};

export const findCommits = async (data, name, page, per_page) => {
  const octokit = new Octokit({
    auth: `${data.gitToken}`,
  });

  try {
    const result = await octokit.request(
      `GET /repos/{owner}/{repo}/commits?page=${page}&per_page=${per_page}`,
      {
        owner: `${data.username}`,
        repo: `${name}`,
      });

    return result?.data?.map((item) => item.commit);

  } catch (error) {
    console.log(error);
  }
};
