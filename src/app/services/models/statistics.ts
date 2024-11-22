export interface Statistics {
  rankedUsers: RankedUser[]
}
export interface RankedUser {
  progress: number;
  points: number;
  name: string;
}
