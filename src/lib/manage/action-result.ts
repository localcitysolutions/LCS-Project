import type { ZodError } from "zod";

/** Shared return shape for every /manage Server Action. */
export interface ActionResult {
  error?: string;
  fieldErrors?: Record<string, string>;
}

export const actionOk: ActionResult = {};

export function actionError(error: string, fieldErrors?: Record<string, string>): ActionResult {
  return { error, fieldErrors };
}

/** Flattens a Zod safeParse failure into ActionResult.fieldErrors, keyed by
 * the top-level form field name. Uses `.issues` (stable across zod v3/v4)
 * rather than `.format()`, whose return shape isn't worth fighting for a
 * flat form-field error map. */
export function fieldErrorsFromZod(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) {
      out[key] = issue.message;
    }
  }
  return out;
}
