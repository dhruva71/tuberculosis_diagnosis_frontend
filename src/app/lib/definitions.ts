export type XrayData = {
    id: number;
    class: string;
    timestamp: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
    password: string;
    // sessions: number[];
};