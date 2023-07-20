import { Octokit } from 'octokit';
import { repos } from 'src/database/usersDb';

export const findRepos = async (data, page, perPage) => {

  const octokit = new Octokit({
    auth: `${data.gitToken}`,
  })

  try {
    const result = await octokit.request(
      `GET /users/{owner}/repos?page=${page}&per_page=${perPage}`,
      {
        owner: `${data.username}`,
      })

    return result?.data;

  } catch (error) {
    console.log(error);
  }
};
/*

export const findCommits = async (data) => {
  const octokit = new Octokit({
    auth: `${data.gitToken}`,
  });

  try {
    const result = await octokit.request(`GET /repos/{owner}/{repo}/commits`, {
      owner: `${data.user}`,
      repo: `${data.rep}`,
    });

    return result?.data?.map((item) => item.commit);

  } catch (error) {
    console.log(error);
  }
}; */
