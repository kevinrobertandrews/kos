export const capture = (pattern: string) => `(${pattern})`;
export const optional = (pattern: string) => `(?:${pattern})?`;
export const repeat = (pattern: string) => `(?:${pattern})+`;
export const boundary = (pattern: string) => `\\b${pattern}\\b`;
export const or = (...patterns: string[]) => `(?:${patterns.join("|")})`;
export const any = ".*";
