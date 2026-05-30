export interface PassageCard {
  passageTitle: string;
  passageDescription: string;
  passageAuthor: string;
  publishDate: string;
  filePath: string;
  passageCover?: string;
}

export interface DirectoryModule {
  moduleName: string;
  moduleStyle: "directory";
  inDirectory: SidebarModule[];
}

export interface FileModule {
  moduleName: string;
  moduleStyle: "file";
  dir: string;
}

export interface CardModule {
  moduleName: string;
  moduleStyle: "card";
  inCard: PassageCard[];
}

export type SidebarModule = DirectoryModule | FileModule | CardModule;

export interface BlogConfig {
  websiteTitle: string;
  websiteAuthor: string;
  titleOnTopBar: string;
  faviconPath: string;
  avatarPath: string;
  copyrightInfo: string;
  websiteStyle: "catppuccin" | "oak";
  sidebar: SidebarModule[];
}
