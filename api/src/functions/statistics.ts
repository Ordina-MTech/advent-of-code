import {app, HttpRequest, HttpResponseInit, InvocationContext} from "@azure/functions";
import {AocLeaderboard} from '../models/aoc-leaderboard';


export async function statistics(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const sessionCookieValue = process.env.AUTH_SESSION_COOKIE_VALUE;

  const response = await fetch('https://adventofcode.com/2024/leaderboard/private/view/2299315.json', {
    headers: {
      'Cookie': `session=${sessionCookieValue}`
    }
  });
  const leaderboard = await response.json() as AocLeaderboard;

  const rankedUsers = Object.values(leaderboard.members).map(member => ({
    progress: member.local_score, points: member.local_score, name: member.name
  }));

  return {jsonBody: {rankedUsers: rankedUsers}};
}

app.http('statistics', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: statistics
});
