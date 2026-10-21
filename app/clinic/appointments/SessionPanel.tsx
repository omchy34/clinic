"use client";

// app/clinic/appointments/SessionPanel.tsx
// One doctor session: booking window controls, queue buttons and the token lists.

import { useState, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { formatTime } from "@/app/clinic/doctors/shared";
import type { BookingStatus, QueueStatus, SessionView } from "@/lib/booking";

export type SessionActionName =
    | "start"
    | "callNext"
    | "end"
    | "closeBooking"
    | "reopenBooking"
    | "extend";
export type TokenActionName = "complete" | "skip" | "cancel";

const tokenLabel = (n: number) => `T-${n}`;

// Glassmorphism tokens (same family as DashboardShell)
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";
const glass =
    "rounded-2xl border border-white/60 bg-white/50 shadow-lg shadow-indigo-900/5 backdrop-blur-xl";
const inner = "rounded-xl border border-white/70 bg-white/50 backdrop-blur-md";
const gradient = "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30";

const outlineBtn = `rounded-xl border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white disabled:opacity-50 ${ring}`;
const primaryBtn = `rounded-xl px-4 py-2 text-sm font-semibold transition hover:opacity-90 disabled:opacity-60 ${gradient} ${ring}`;
const dangerBtn = `rounded-xl border border-rose-200 bg-white/70 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 ${ring}`;
const smallDangerBtn = `rounded-full px-2.5 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 ${ring}`;

const BOOKING_STYLE: Record<BookingStatus, string> = {
    OPEN: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    EXTENDED: "bg-amber-50 text-amber-700 ring-amber-200",
    CLOSED: "bg-slate-100 text-slate-500 ring-slate-200",
    OVER: "bg-rose-50 text-rose-600 ring-rose-200",
};

const QUEUE_TEXT: Record<QueueStatus, string> = {
    NOT_STARTED: "Queue not started",
    ACTIVE: "Queue running",
    ENDED: "Session ended",
};

function Spinner() {
    return <Loader2 size={14} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />;
}

// A button that shows a spinner and `loadingText` while its action waits for the server.
// Other buttons are `disabled` meanwhile, but the loading one stays fully visible.
function Btn({
    loading = false,
    loadingText,
    disabled,
    className,
    children,
    ...rest
}: { loading?: boolean; loadingText?: string; className: string } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className"
>) {
    return (
        <button
            type="button"
            {...rest}
            disabled={disabled && !loading}
            aria-disabled={loading || undefined}
            aria-busy={loading}
            className={`inline-flex items-center justify-center gap-2 ${loading ? "pointer-events-none" : ""} ${className}`}
        >
            {loading && <Spinner />}
            {loading ? loadingText ?? children : children}
        </button>
    );
}

// First click asks "Sure?", second click does it
function ConfirmButton({
    label,
    question,
    onConfirm,
    disabled,
    loading,
    loadingText,
    className,
}: {
    label: string;
    question: string;
    onConfirm: () => void;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    className: string;
}) {
    const [asking, setAsking] = useState(false);

    if (!asking) {
        return (
            <Btn
                disabled={disabled}
                loading={loading}
                loadingText={loadingText}
                onClick={() => setAsking(true)}
                className={className}
            >
                {label}
            </Btn>
        );
    }
    return (
        <span role="group" aria-label={question} className="inline-flex items-center gap-2 text-sm">
            <span className="font-medium">{question}</span>
            <button
                type="button"
                onClick={() => {
                    setAsking(false);
                    onConfirm();
                }}
                className={`rounded-xl bg-rose-600 px-3 py-1.5 font-semibold text-white shadow-md shadow-rose-500/30 hover:bg-rose-700 ${ring}`}
            >
                Yes
            </button>
            <button
                type="button"
                onClick={() => setAsking(false)}
                className={`rounded-xl px-3 py-1.5 font-medium hover:bg-white/70 ${ring}`}
            >
                No
            </button>
        </span>
    );
}

export default function SessionPanel({
    session,
    readOnly,
    pending,
    onSession,
    onToken,
}: {
    session: SessionView;
    readOnly: boolean;
    pending: string | null; // "<id>:<action>" of the button waiting for the server
    onSession: (action: SessionActionName, closesAt?: string) => Promise<boolean>;
    onToken: (tokenId: string, action: TokenActionName) => Promise<boolean>;
}) {
    const { booking, counts, queueStatus } = session;
    const ended = queueStatus === "ENDED";

    const busy = pending !== null; // any action running, so every button waits
    const isPending = (id: string, action: string) => pending === `${id}:${action}`;

    const serving =
        session.tokens.find((t) => t.id === session.servingTokenId) ??
        session.tokens.find((t) => t.status === "SERVING");
    const waiting = session.tokens
        .filter((t) => t.status === "CONFIRMED")
        .sort((a, b) => a.queuePosition - b.queuePosition);
    const done = session.tokens.filter((t) => t.status === "COMPLETED" || t.status === "CANCELLED");

    const [extending, setExtending] = useState(false);
    const [extendTo, setExtendTo] = useState(booking.closesAtTime);
    const [extendError, setExtendError] = useState<string | null>(null);

    function openExtend() {
        setExtendTo(booking.closesAtTime);
        setExtendError(null);
        setExtending(true);
    }

    async function saveExtend() {
        if (!extendTo || extendTo <= booking.closesAtTime) {
            return setExtendError(`Pick a time later than ${formatTime(booking.closesAtTime)}.`);
        }
        // the panel stays open with a spinner, and closes only if it worked
        const ok = await onSession("extend", extendTo);
        if (ok) setExtending(false);
    }

    return (
        <section className={`${glass} p-5`}>
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                        {formatTime(session.startTime)} to {formatTime(session.endTime)}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                        {QUEUE_TEXT[queueStatus]}. {counts.total} {counts.total === 1 ? "token" : "tokens"}:{" "}
                        {counts.waiting} waiting, {counts.completed} done
                        {counts.cancelled > 0 && `, ${counts.cancelled} cancelled`}.
                    </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${BOOKING_STYLE[booking.status]}`}>
                    {booking.label}
                </span>
            </div>

            {/* Booking window controls */}
            {!readOnly && !ended && (
                <div className={`mt-4 p-3.5 ${inner}`}>
                    <p className="text-sm text-slate-700">
                        Booking closes at <strong>{formatTime(booking.closesAtTime)}</strong>
                        {booking.manuallyClosed && <span className="text-rose-600"> (you closed it)</span>}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {booking.manuallyClosed ? (
                            <Btn
                                disabled={busy}
                                loading={isPending(session.id, "reopenBooking")}
                                loadingText="Reopening..."
                                onClick={() => void onSession("reopenBooking")}
                                className={outlineBtn}
                            >
                                Reopen booking
                            </Btn>
                        ) : (
                            <ConfirmButton
                                label="Close booking"
                                question="Stop new tokens?"
                                disabled={busy}
                                loading={isPending(session.id, "closeBooking")}
                                loadingText="Closing..."
                                onConfirm={() => void onSession("closeBooking")}
                                className={outlineBtn}
                            />
                        )}
                        {!extending && (
                            <Btn disabled={busy} onClick={openExtend} className={outlineBtn}>
                                Extend booking
                            </Btn>
                        )}
                    </div>

                    {extending && (
                        <div className="mt-3">
                            <label htmlFor={`extend-${session.id}`} className="mb-1.5 block text-sm font-medium text-slate-700">
                                New closing time
                            </label>
                            <div className="flex flex-wrap items-center gap-2">
                                <input
                                    id={`extend-${session.id}`}
                                    type="time"
                                    value={extendTo}
                                    onChange={(e) => setExtendTo(e.target.value)}
                                    disabled={busy}
                                    className={`w-auto! rounded-xl border border-white/80 bg-white/70 px-3.5 py-2 text-sm text-slate-800 disabled:opacity-60 ${ring}`}
                                />
                                <Btn
                                    disabled={busy}
                                    loading={isPending(session.id, "extend")}
                                    loadingText="Extending..."
                                    onClick={() => void saveExtend()}
                                    className={primaryBtn}
                                >
                                    Extend
                                </Btn>
                                <Btn disabled={busy} onClick={() => setExtending(false)} className={outlineBtn}>
                                    Cancel
                                </Btn>
                            </div>
                            <p className="mt-1.5 text-xs text-slate-500">
                                Existing tokens keep their numbers. New tokens are added at the end.
                            </p>
                            {extendError && (
                                <p role="alert" className="mt-1.5 text-xs text-rose-600">
                                    {extendError}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Queue */}
            <div className="mt-5">
                {serving ? (
                    <div className="overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                        <div className="flex items-end justify-between gap-4 p-5">
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-blue-100">Now serving</p>
                                <p className="mt-1 truncate text-lg font-semibold">{serving.patientName}</p>
                                {serving.skipCount > 0 && (
                                    <p className="text-sm text-blue-100">
                                        Skipped {serving.skipCount} {serving.skipCount === 1 ? "time" : "times"} before
                                    </p>
                                )}
                            </div>
                            <p className="text-5xl font-bold leading-none tabular-nums">{tokenLabel(serving.tokenNumber)}</p>
                        </div>
                        {!readOnly && !ended && (
                            <div className="flex flex-wrap items-center gap-2 border-t border-dashed border-white/40 bg-white/85 p-3 text-slate-800 backdrop-blur-md">
                                <Btn
                                    disabled={busy}
                                    loading={isPending(serving.id, "complete")}
                                    loadingText="Completing..."
                                    onClick={() => void onToken(serving.id, "complete")}
                                    className={primaryBtn}
                                >
                                    Complete
                                </Btn>
                                <Btn
                                    disabled={busy}
                                    loading={isPending(serving.id, "skip")}
                                    loadingText="Skipping..."
                                    onClick={() => void onToken(serving.id, "skip")}
                                    className={outlineBtn}
                                >
                                    Skip
                                </Btn>
                                <ConfirmButton
                                    label="Cancel"
                                    question="Cancel this token?"
                                    disabled={busy}
                                    loading={isPending(serving.id, "cancel")}
                                    loadingText="Cancelling..."
                                    onConfirm={() => void onToken(serving.id, "cancel")}
                                    className={dangerBtn}
                                />
                                <p className="basis-full text-xs text-slate-500">The next token is called automatically.</p>
                            </div>
                        )}
                    </div>
                ) : ended ? (
                    <p className={`px-4 py-3 text-sm text-slate-500 ${inner}`}>This session has ended.</p>
                ) : queueStatus === "NOT_STARTED" ? (
                    <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-5 text-center backdrop-blur-md">
                        <p className="text-sm text-slate-500">
                            {readOnly
                                ? "The queue was not started on this day."
                                : "Patients can see their token. Start when the doctor is ready."}
                        </p>
                        {!readOnly && (
                            <Btn
                                disabled={busy}
                                loading={isPending(session.id, "start")}
                                loadingText="Starting..."
                                onClick={() => void onSession("start")}
                                className={`mt-3 ${primaryBtn}`}
                            >
                                Start token
                            </Btn>
                        )}
                    </div>
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 p-5 text-center backdrop-blur-md">
                        <p className="text-sm text-slate-500">
                            {waiting.length > 0 ? "Nobody is being served right now." : "No one is waiting right now."}
                        </p>
                        {!readOnly && waiting.length > 0 && (
                            <Btn
                                disabled={busy}
                                loading={isPending(session.id, "callNext")}
                                loadingText="Calling..."
                                onClick={() => void onSession("callNext")}
                                className={`mt-3 ${primaryBtn}`}
                            >
                                Call next
                            </Btn>
                        )}
                    </div>
                )}
            </div>

            {/* Waiting list */}
            {waiting.length > 0 && (
                <div className="mt-5">
                    <h4 className="mb-2 text-sm font-semibold text-slate-800">Waiting ({waiting.length})</h4>
                    <ol className={`divide-y divide-white/70 ${inner}`}>
                        {waiting.map((t, i) => (
                            <li key={t.id} className="flex items-center gap-3 px-3.5 py-2.5">
                                <span className="w-12 shrink-0 text-sm font-semibold tabular-nums text-slate-800">
                                    {tokenLabel(t.tokenNumber)}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-slate-800">{t.patientName}</p>
                                    {t.bookedBy !== t.patientName && (
                                        <p className="truncate text-xs text-slate-500">Booked by {t.bookedBy}</p>
                                    )}
                                </div>
                                {i === 0 && (
                                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
                                        Next
                                    </span>
                                )}
                                {t.skipCount > 0 && (
                                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                                        Skipped {t.skipCount}x
                                    </span>
                                )}
                                {!readOnly && !ended && (
                                    <ConfirmButton
                                        label="Cancel"
                                        question="Cancel?"
                                        disabled={busy}
                                        loading={isPending(t.id, "cancel")}
                                        loadingText="Cancelling..."
                                        onConfirm={() => void onToken(t.id, "cancel")}
                                        className={smallDangerBtn}
                                    />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Finished tokens */}
            {done.length > 0 && (
                <details className="mt-4">
                    <summary className={`cursor-pointer rounded text-sm font-medium text-slate-700 ${ring}`}>
                        Completed and cancelled ({done.length})
                    </summary>
                    <ul className={`mt-2 divide-y divide-white/70 ${inner}`}>
                        {done.map((t) => (
                            <li key={t.id} className="flex items-center gap-3 px-3.5 py-2 text-sm">
                                <span className="w-12 shrink-0 font-semibold tabular-nums text-slate-800">
                                    {tokenLabel(t.tokenNumber)}
                                </span>
                                <span className="min-w-0 flex-1 truncate text-slate-700">{t.patientName}</span>
                                <span className={t.status === "COMPLETED" ? "text-emerald-600" : "text-rose-600"}>
                                    {t.status === "COMPLETED" ? "Completed" : "Cancelled"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </details>
            )}

            {/* End session */}
            {!readOnly && queueStatus === "ACTIVE" && (
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/60 pt-4">
                    <ConfirmButton
                        label="End session"
                        question="End this session?"
                        disabled={busy || !!serving}
                        loading={isPending(session.id, "end")}
                        loadingText="Ending..."
                        onConfirm={() => void onSession("end")}
                        className={outlineBtn}
                    />
                    {serving && <p className="text-xs text-slate-500">Finish the current token first.</p>}
                </div>
            )}
        </section>
    );
}