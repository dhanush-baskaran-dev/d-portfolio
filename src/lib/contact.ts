import { contactConfig } from "@/data/profile";
import { CONTACT_TIMEOUT, MESSAGE_MIN_LENGTH } from "@/lib/constants";
import type { FormFieldContent } from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactErrors = Readonly<Record<string, string>>;

/**
 * Validates against the field definitions in `data/`, so the rules and the
 * messages stay in one place and no component re-implements either.
 */
export function validateContact(
  fields: readonly FormFieldContent[],
  values: Readonly<Record<string, string>>,
): ContactErrors {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const value = (values[field.name] ?? "").trim();

    if (field.required && value === "") {
      errors[field.name] = field.requiredError;
      continue;
    }

    if (value === "") {
      continue;
    }

    if (field.type === "email" && !EMAIL_PATTERN.test(value)) {
      errors[field.name] = field.invalidError ?? field.requiredError;
      continue;
    }

    if (field.multiline === true && value.length < MESSAGE_MIN_LENGTH) {
      errors[field.name] = field.invalidError ?? field.requiredError;
    }
  }

  return errors;
}

export interface ContactPayload {
  readonly email: string;
  readonly message: string;
  /** Honeypot. Web3Forms rejects the submission when it carries a value. */
  readonly botcheck: string;
}

export type ContactFailure = "not-configured" | "network" | "rejected";

export type ContactResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: ContactFailure };

export function isContactConfigured(): boolean {
  return contactConfig.accessKey.length > 0;
}

function isSuccessBody(body: unknown): boolean {
  return (
    typeof body === "object" &&
    body !== null &&
    "success" in body &&
    body.success === true
  );
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  if (!isContactConfigured()) {
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch(contactConfig.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: contactConfig.accessKey,
        ...payload,
      }),
      signal: AbortSignal.timeout(CONTACT_TIMEOUT),
    });

    if (!response.ok) {
      return { ok: false, reason: "rejected" };
    }

    return isSuccessBody(await response.json())
      ? { ok: true }
      : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
