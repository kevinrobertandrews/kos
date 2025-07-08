import { LifeState } from "../state";

export type CommandHandler = (state: LifeState, args: string[]) => void;
