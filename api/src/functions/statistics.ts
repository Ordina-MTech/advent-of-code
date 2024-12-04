import {app, HttpRequest, HttpResponseInit, InvocationContext} from "@azure/functions";
import {RankingService} from '../services/ranking-service';
import {AocLeaderboard} from '../models/aoc';

export async function statistics(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const sessionCookieValue = process.env.AUTH_SESSION_COOKIE_VALUE;

  const response = await fetch('https://adventofcode.com/2024/leaderboard/private/view/2299315.json', {
    headers: {
      'Cookie': `session=${sessionCookieValue}`
    }
  });
  const leaderboard = await response.json() as AocLeaderboard;

  const rankedUsers = RankingService.getAsRankedUsers(Object.values(leaderboard.members))

  const maxPeerScore = Math.max(...rankedUsers.map(m => m.peer_score));

  const rankedUsersStatistics = rankedUsers.map(member => ({
    progress: member.peer_score/maxPeerScore*100, points: member.peer_score, name: member.name, stars: member.stars, local_score: member.local_score
  }));

  return {jsonBody: {rankedUsers: rankedUsersStatistics}};
}

app.http('statistics', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: statistics
});
