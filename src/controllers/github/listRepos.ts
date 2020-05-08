import { Request, Response } from 'express';
import { GraphQLClient } from 'graphql-request';

const GitHubApi = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
  },
});
const query = `
{
    viewer {
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], privacy: PUBLIC) {
        nodes {
          name
          description
          url
          owner {
            login
          }
        }
      }
    }
  }
  
      `;
export const listRepos = (req: Request, res: Response) => {
  try {
    GitHubApi.request(query).then(data => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ error: `error on ${error}` });
  }
};
