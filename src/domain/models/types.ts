// src/domain/models/types.ts

import type { AppPaths } from "../constants/paths"

/**
 * Type representing the available path values in the application.
 */
export type AppPathValues = typeof AppPaths[keyof typeof AppPaths];