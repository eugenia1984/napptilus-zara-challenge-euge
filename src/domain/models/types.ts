// src/domain/models/types.ts

import type { AppPaths } from "../constants/paths"

export type AppPathValues = typeof AppPaths[keyof typeof AppPaths];