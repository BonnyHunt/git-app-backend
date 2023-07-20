import { Octokit } from 'octokit';
import { Project } from 'src/users/entities/user.entity';

export const findCommits = async (data: Project) => {
  const octokit = new Octokit({
    auth: `${data.key}`,
  });

  try {
    const result = await octokit.request(`GET /repos/{owner}/{repo}/commits`, {
      owner: `${data.username}`,
      repo: `${data.name}`,
    });

    return result?.data?.map((item) => item.commit);

  } catch (error) {
    console.log(error);
  }
}
