"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { contact } from "@/data/profile";
import { SUBMIT_SUCCESS_DURATION } from "@/lib/constants";
import { icons } from "@/lib/icons";
import {
  isContactConfigured,
  submitContact,
  validateContact,
  type ContactErrors,
} from "@/lib/contact";
import { cn } from "@/utils/cn";

const LoaderIcon = icons.loader;
const CheckIcon = icons.check;
const AlertIcon = icons.alert;
const TITLE_ID = "contact-form-title";

/**
 * The two outcome tones. Success borrows the site accent; failure is the one
 * `--color-danger` family, mixed the same way, so neither is a local colour.
 */
const FEEDBACK_TONE = {
  success: "border-accent-edge bg-accent-subtle text-accent",
  error: "border-danger-edge bg-danger-subtle text-danger",
} as const;

type Status = "idle" | "loading" | "success" | "error" | "not-configured";

const EMPTY_VALUES: Readonly<Record<string, string>> = Object.fromEntries(
  contact.fields.map((field) => [field.name, ""]),
);

const SUBMIT_LABEL: Readonly<Record<Status, string>> = {
  idle: contact.submit.idle,
  loading: contact.submit.loading,
  success: contact.submit.success,
  error: contact.submit.error,
  "not-configured": contact.submit.error,
};

export function ContactForm() {
  const configured = isContactConfigured();

  const [values, setValues] = useState<Record<string, string>>({ ...EMPTY_VALUES });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const successTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (successTimer.current !== undefined) {
        window.clearTimeout(successTimer.current);
      }
    };
  }, []);

  const setValue = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));

    if (errors[name] !== undefined) {
      setErrors(validateContact(contact.fields, { ...values, [name]: value }));
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validateContact(contact.fields, values);
    setErrors(found);
    setTouched(Object.fromEntries(contact.fields.map((f) => [f.name, true])));

    if (Object.keys(found).length > 0) {
      return;
    }

    setStatus("loading");

    const result = await submitContact({
      email: values.email ?? "",
      message: values.message ?? "",
      botcheck: honeypot,
    });

    if (result.ok) {
      setStatus("success");
      setValues({ ...EMPTY_VALUES });
      setTouched({});
      successTimer.current = window.setTimeout(
        () => setStatus("idle"),
        SUBMIT_SUCCESS_DURATION,
      );
      return;
    }

    setStatus(result.reason === "not-configured" ? "not-configured" : "error");
  };

  /*
   * `not-configured` is a failure from the sender's point of view — the message
   * did not go anywhere — so it reads in the danger tone rather than being
   * silently swallowed by the standing notice.
   */
  const feedback =
    status === "success"
      ? { tone: FEEDBACK_TONE.success, Icon: CheckIcon, message: contact.status.success }
      : status === "error"
        ? { tone: FEEDBACK_TONE.error, Icon: AlertIcon, message: contact.status.error }
        : status === "not-configured"
          ? {
              tone: FEEDBACK_TONE.error,
              Icon: AlertIcon,
              message: contact.status.notConfigured,
            }
          : null;

  return (
    <Card padding="lg">
      <form
        onSubmit={onSubmit}
        aria-labelledby={TITLE_ID}
        noValidate
        className="flex flex-col gap-4"
      >
        <h3 id={TITLE_ID} className="text-base font-medium text-primary">
          {contact.formTitle}
        </h3>

        {contact.fields.map((field) => (
          <Field
            key={field.id}
            id={`contact-${field.id}`}
            name={field.name}
            label={field.label}
            value={values[field.name] ?? ""}
            onValueChange={(value) => setValue(field.name, value)}
            onBlur={() => {
              setTouched((current) => ({ ...current, [field.name]: true }));
              setErrors(validateContact(contact.fields, values));
            }}
            placeholder={field.placeholder}
            type={field.type}
            multiline={field.multiline}
            required={field.required}
            maxLength={field.maxLength}
            autoComplete={field.autoComplete}
            disabled={status === "loading"}
            error={touched[field.name] === true ? errors[field.name] : undefined}
          />
        ))}

        <div aria-hidden="true" className="sr-only">
          <label htmlFor="contact-honeypot">{contact.honeypot.label}</label>
          <input
            id="contact-honeypot"
            name={contact.honeypot.name}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          block
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading" ? (
            <LoaderIcon className="size-4 motion-safe:animate-spin" aria-hidden="true" />
          ) : null}
          {status === "success" ? (
            <CheckIcon className="size-4" aria-hidden="true" />
          ) : null}
          {SUBMIT_LABEL[status]}
        </Button>

        {/*
          * Always mounted, never conditionally rendered: a live region has to
          * exist before its text changes or the announcement is missed. When
          * there is no outcome it collapses to `sr-only` rather than unmounting.
          */}
        <div
          role="status"
          aria-live="polite"
          className={cn(feedback === null && "sr-only")}
        >
          {feedback === null ? null : (
            <p
              className={cn(
                "flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm",
                feedback.tone,
              )}
            >
              <feedback.Icon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0"
              />
              <span>{feedback.message}</span>
            </p>
          )}
        </div>

        {/* The standing notice is redundant once the same copy is showing in
            the callout above, so it stands down while that is up. */}
        {configured || status === "not-configured" ? null : (
          <p className="text-xs text-tertiary">{contact.status.notConfigured}</p>
        )}
      </form>
    </Card>
  );
}
