import { rest } from 'msw'

export const handlers = [
  rest.get(
    // `https://tasks.googleapis.com/tasks/v1/lists/${params.taskListId}/tasks?maxResults=100&pageToken=${params.nextPageToken}`,
    'https://tasks.googleapis.com/tasks/v1/lists/*/tasks',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
              street: 'Kulas Light',
              suite: 'Apt. 556',
              city: 'Gwenborough',
              zipcode: '92998-3874',
              geo: {
                lat: '-37.3159',
                lng: '81.1496',
              },
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
              name: 'Romaguera-Crona',
              catchPhrase: 'Multi-layered client-server neural-net',
              bs: 'harness real-time e-markets',
            },
          },
        ])
      )
    }
  ),
]
