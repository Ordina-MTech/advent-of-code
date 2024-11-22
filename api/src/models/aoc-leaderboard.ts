export interface MemberRanking {
  "global_score": number,
  "name": string,
  "id": number,
  "completion_day_level": {

  },
  "last_star_ts": number,
  "local_score": number,
  "stars": number
}

export interface AocLeaderboard {
  "members": Record<string, MemberRanking>
  "event": string,
  "owner_id": number
}
