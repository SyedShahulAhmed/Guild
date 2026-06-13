import Membership from "@/models/Membership";


export async function getCommunityRole(
  userId: string,
  communityId: string
) {
  const membership = await Membership.findOne({
    user: userId,
    community: communityId,
  });

  return membership?.role ?? null;
}

export function canManageMembers(
  role: string
) {
  return ["OWNER", "ADMIN"].includes(role);
}

export function canModerate(
  role: string
) {
  return [
    "OWNER",
    "ADMIN",
    "MODERATOR",
  ].includes(role);
}

export function canDeleteCommunity(
  role: string
) {
  return role === "OWNER";
}