import { Response } from 'express';
import { GraphQLClient } from 'graphql-request';

export const listRepos = (_, res: Response) => {
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
  GitHubApi.request(query)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json({ error: `error on ${error}` }));
};
