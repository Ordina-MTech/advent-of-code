import {AoCChallengeDay, AocMember, Challenge, User} from '../models/aoc';

export class RankingService {
  public static getAsRankedUsers(members: AocMember[]): User[] {
    let users: User[] = members.map((member) => ({
      name: member.name,
      stars: member.stars,
      last_star_ts: member.last_star_ts,
      local_score: member.local_score,
      global_score: member.global_score,
      id: member.id,
      peer_score: 0,
      challenges: this.getChallengesFromCompletionDayLevel(member.completion_day_level)
    }))

    for (let day = 1; day <= 25; day++) {
      for (let part = 1; part <= 2; part++) {
        users.sort(this.sortByCompletionTime(day, part))
        users.forEach((user, index) => {
          RankingService.getChallenge(user, day, part).rank = index + 1
        })
      }
    }

    for (let stars = 0; stars <= 50; stars++) {
      let peers = users.filter((user) => user.stars === stars)

      for (let day = 1; day <= 25; day++) {
        for (let part = 1; part <= 2; part++) {
          peers.sort(this.sortByCompletionTime(day, part))
          for (let i = 0; i < peers.length; i++) {
            if (RankingService.getChallenge(peers[i], day, part).completed) {
              peers[i].peer_score += peers.length - i
            }
          }
        }
      }
    }

    users.sort(RankingService.compareUsersByStarsAndPeerScore)
    return users
  }

  public static compareUsersByStarsAndPeerScore(user1: User, user2: User): number {
    const starDifference = user2.stars - user1.stars
    const peerScoreDifference = user2.peer_score - user1.peer_score
    return starDifference !== 0 ? starDifference : peerScoreDifference
  }

  private static sortByCompletionTime(day: number, part: number) {
    return (userA: User, userB: User) => {
      const timeA = RankingService.getChallenge(userA, day, part).timestamp || Infinity
      const timeB = RankingService.getChallenge(userB, day, part).timestamp || Infinity
      return timeA - timeB
    }
  }

  private static getChallengesFromCompletionDayLevel(completion_day_level: Record<number, AoCChallengeDay>): Challenge[] {
    const challenges: Challenge[] = [...Array(50).keys()].map((index) => ({
      day: Math.ceil(index / 2),
      part: (index % 2) + 1,
      completed: false
    }))
    if (!!completion_day_level) {
      Object.entries(completion_day_level).forEach(([day, challengeDay]) => {
        challenges[(parseInt(day, 10) - 1) * 2] = {
          ...challenges[(parseInt(day, 10) - 1) * 2],
          completed: true,
          timestamp: challengeDay['1'].get_star_ts
        };
        challenges[parseInt(day, 10) * 2 - 1] = {
          ...challenges[parseInt(day, 10) * 2 - 1],
          completed: !!challengeDay['2']?.get_star_ts,
          timestamp: challengeDay['2']?.get_star_ts
        }
      })
    }
    return challenges;
  }

  private static getChallenge(user: User, day: number, part: number): Challenge {
    return user.challenges[(day - 1) * 2 + part - 1]
  }
}
