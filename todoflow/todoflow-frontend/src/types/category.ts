export interface CategoryMemberUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string | null;
}

export interface CategoryMember {
  id: string;
  role: "EDITOR";
  user: CategoryMemberUser;
}

export interface CategoryWithMembers {
  id: string;
  name: string;
  color: string;
  userId: string;
  user?: { id: string; fullName: string; email: string };
  members?: CategoryMember[];
}