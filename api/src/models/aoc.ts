export type AoCChallengeDay = Record<string, {
  star_index: number;
  get_star_ts: number;
}>;

export interface AocMember {
  name: string;
  global_score: number;
  id: number;
  local_score: number;
  last_star_ts: number;
  stars: number;
  completion_day_level: Record<number, AoCChallengeDay>;
}

export interface Challenge {
  day: number;
  part: number;
  rank?: number;
  completed: boolean;
  timestamp?: number;
}

export interface User {
  name: string;
  stars: number;
  last_star_ts: number;
  local_score: number;
  global_score: number;
  id: number;
  peer_score: number;
  challenges: Challenge[];
}

export interface AocLeaderboard {
  "members": Record<string, AocMember>
  "event": string,
  "owner_id": number
}
