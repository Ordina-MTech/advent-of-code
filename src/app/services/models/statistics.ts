export interface Statistics {
  rankedUsers: RankedUser[]
}
export interface RankedUser {
  progress: number;
  points: number;
  stars: number;
  localScore: number;
  name: string;
}
