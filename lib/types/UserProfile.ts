export type UserProfile = {
    userPK: string,
    username: string | null,
    online: boolean,
    email: string,
    roleFK: number | null,
    teamFK: number | null
}