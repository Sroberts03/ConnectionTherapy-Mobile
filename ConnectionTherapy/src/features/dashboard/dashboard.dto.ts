import { ConnectionPillar } from "./dashboard.types";

export interface GetPillarsRes {
    pillars: Pick<ConnectionPillar, 'id' | 'name' | 'color' | 'icon'>[]
}
