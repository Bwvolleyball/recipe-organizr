export interface VersionInfo {
  git?: GitInfo;
}

export interface GitInfo {
  build: BuildInfo;
  branch: string;
  commit: CommitInfo;
  dirty: boolean;
  tags: string;
  total: TotalInfo;
}

export interface BuildInfo {
  host: string;
  version: string;
  time: string;
  user: UserInfo;
}

export interface UserInfo {
  name: string;
  email: string;
}

export interface CommitInfo {
  message: CommitMessageInfo;
  id: CommitIdInfo;
  time: string;
  user: UserInfo;
}

export interface CommitMessageInfo {
  short: string;
  full: string;
}

export interface CommitIdInfo {
  describe: string;
  abbrev: string;
  full: string;
}

export interface RemoteInfo {
  origin: OriginInfo;
}

export interface OriginInfo {
  url: string;
}

export interface TotalInfo {
  commit: TotalCommitInfo;
}

export interface TotalCommitInfo {
  count: number;
}
