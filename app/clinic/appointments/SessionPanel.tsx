"use client";

// app/clinic/appointments/SessionPanel.tsx
// One doctor session: booking window controls, queue buttons and the token lists.

import { useState } from "react";
import { formatTime } from "@/app/clinic/doctors/shared";
import { ui } from "@/app/clinic/doctors/ui";
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

const BOOKING_STYLE: Record<BookingStatus, string> = {
    OPEN: "bg-[#E7F4EE] text-[#1F7A5C]",
    EXTENDED: "bg-[#FFF6DD] text-[#8A5A00]",
    CLOSED: "bg-[#EEF3F1] text-[#5B726C]",
    OVER: "bg-[#FEF3F2] text-[#B42318]",
};

const QUEUE_TEXT: Record<QueueStatus, string> = {
    NOT_STARTED: "Queue not started",
    ACTIVE: "Queue running",
    ENDED: "Session ended",
};

const primaryBtn = `rounded-md bg-[#14302B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C4038] disabled:opacity-60 ${ui.ring}`;
const dangerBtn = `rounded-md border border-[#F0C4C0] bg-white px-3.5 py-2 text-sm font-medium text-[#B42318] hover:bg-[#FEF3F2] disabled:opacity-60 ${ui.ring}`;
const smallDangerBtn = `rounded-md px-2.5 py-1 text-xs font-medium text-[#B42318] hover:bg-[#FEF3F2] disabled:opacity-60 ${ui.ring}`;

// First click asks "Sure?", second click does it
function ConfirmButton({
    label,
    question,
    onConfirm,
    disabled,
    className,
}: {
    label: string;
    question: string;
    onConfirm: () => void;
    disabled?: boolean;
    className: string;
}) {
    const [asking, setAsking] = useState(false);

    if (!asking) {
        return (
            <button type="button" disabled={disabled} onClick={() => setAsking(true)} className={className}>
                {label}
            </button>
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
                className={`rounded-md bg-[#B42318] px-3 py-1.5 font-semibold text-white hover:bg-[#8F1C13] ${ui.ring}`}
            >
                Yes
            </button>
            <button
                type="button"
                onClick={() => setAsking(false)}
                className={`rounded-md px-3 py-1.5 font-medium hover:bg-black/5 ${ui.ring}`}
            >
                No
            </button>
        </span>
    );
}

export default function SessionPanel({
    session,
    readOnly,
    busy,
    onSession,
    onToken,
}: {
    session: SessionView;
    readOnly: boolean;
    busy: boolean;
    onSession: (action: SessionActionName, closesAt?: string) => void;
    onToken: (tokenId: string, action: TokenActionName) => void;
}) {
    const { booking, counts, queueStatus } = session;
    const ended = queueStatus === "ENDED";

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

    function saveExtend() {
        if (!extendTo || extendTo <= booking.closesAtTime) {
            return setExtendError(`Pick a time later than ${formatTime(booking.closesAtTime)}.`);
        }
        setExtending(false);
        onSession("extend", extendTo);
    }

    return (
        <section className={`${ui.card} p-5`}>
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h3 className="text-lg font-semibold text-[#14302B]">
                        {formatTime(session.startTime)} to {formatTime(session.endTime)}
                    </h3>
                    <p className="mt-0.5 text-sm text-[#5B726C]">
                        {QUEUE_TEXT[queueStatus]}. {counts.total} {counts.total === 1 ? "token" : "tokens"}:{" "}
                        {counts.waiting} waiting, {counts.completed} done
                        {counts.cancelled > 0 && `, ${counts.cancelled} cancelled`}.
                    </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${BOOKING_STYLE[booking.status]}`}>
                    {booking.label}
                </span>
            </div>

            {/* Booking window controls */}
            {!readOnly && !ended && (
                <div className="mt-4 rounded-lg bg-[#F7FAF9] p-3.5">
                    <p className="text-sm text-[#14302B]">
                        Booking closes at <strong>{formatTime(booking.closesAtTime)}</strong>
                        {booking.manuallyClosed && <span className="text-[#B42318]"> (you closed it)</span>}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {booking.manuallyClosed ? (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => onSession("reopenBooking")}
                                className={ui.outlineBtn}
                            >
                                Reopen booking
                            </button>
                        ) : (
                            <ConfirmButton
                                label="Close booking"
                                question="Stop new tokens?"
                                disabled={busy}
                                onConfirm={() => onSession("closeBooking")}
                                className={ui.outlineBtn}
                            />
                        )}
                        {!extending && (
                            <button type="button" disabled={busy} onClick={openExtend} className={ui.outlineBtn}>
                                Extend booking
                            </button>
                        )}
                    </div>

                    {extending && (
                        <div className="mt-3">
                            <label htmlFor={`extend-${session.id}`} className={ui.label}>
                                New closing time
                            </label>
                            <div className="flex flex-wrap items-center gap-2">
                                <input
                                    id={`extend-${session.id}`}
                                    type="time"
                                    value={extendTo}
                                    onChange={(e) => setExtendTo(e.target.value)}
                                    className={`${ui.input} w-auto!`}
                                />
                                <button type="button" disabled={busy} onClick={saveExtend} className={primaryBtn}>
                                    Extend
                                </button>
                                <button type="button" onClick={() => setExtending(false)} className={ui.outlineBtn}>
                                    Cancel
                                </button>
                            </div>
                            <p className={ui.hint}>Existing tokens keep their numbers. New tokens are added at the end.</p>
                            {extendError && (
                                <p role="alert" className={ui.error}>
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
                    <div className="overflow-hidden rounded-lg bg-[#F5B82E] text-[#14302B]">
                        <div className="flex items-end justify-between gap-4 p-5">
                            <div className="min-w-0">
                                <p className="text-sm font-medium">Now serving</p>
                                <p className="mt-1 truncate text-lg font-semibold">{serving.patientName}</p>
                                {serving.skipCount > 0 && (
                                    <p className="text-sm">
                                        Skipped {serving.skipCount} {serving.skipCount === 1 ? "time" : "times"} before
                                    </p>
                                )}
                            </div>
                            <p className="text-5xl font-bold leading-none tabular-nums">{tokenLabel(serving.tokenNumber)}</p>
                        </div>
                        {!readOnly && !ended && (
                            <div className="flex flex-wrap items-center gap-2 border-t-2 border-dashed border-[#14302B]/30 bg-[#FFF6DD] p-3">
                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => onToken(serving.id, "complete")}
                                    className={primaryBtn}
                                >
                                    Complete
                                </button>
                                <button
                                    type="button"
                                    disabled={busy}
                                    onClick={() => onToken(serving.id, "skip")}
                                    className={ui.outlineBtn}
                                >
                                    Skip
                                </button>
                                <ConfirmButton
                                    label="Cancel"
                                    question="Cancel this token?"
                                    disabled={busy}
                                    onConfirm={() => onToken(serving.id, "cancel")}
                                    className={dangerBtn}
                                />
                                <p className="basis-full text-xs text-[#5B726C]">The next token is called automatically.</p>
                            </div>
                        )}
                    </div>
                ) : ended ? (
                    <p className="rounded-lg bg-[#F7FAF9] px-4 py-3 text-sm text-[#5B726C]">This session has ended.</p>
                ) : queueStatus === "NOT_STARTED" ? (
                    <div className="rounded-lg border-2 border-dashed border-[#C9D6D2] p-5 text-center">
                        <p className="text-sm text-[#5B726C]">
                            {readOnly
                                ? "The queue was not started on this day."
                                : "Patients can see their token. Start when the doctor is ready."}
                        </p>
                        {!readOnly && (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => onSession("start")}
                                className={`mt-3 ${ui.primaryBtn}`}
                            >
                                Start token
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="rounded-lg border-2 border-dashed border-[#C9D6D2] p-5 text-center">
                        <p className="text-sm text-[#5B726C]">
                            {waiting.length > 0 ? "Nobody is being served right now." : "No one is waiting right now."}
                        </p>
                        {!readOnly && waiting.length > 0 && (
                            <button
                                type="button"
                                disabled={busy}
                                onClick={() => onSession("callNext")}
                                className={`mt-3 ${ui.primaryBtn}`}
                            >
                                Call next
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Waiting list */}
            {waiting.length > 0 && (
                <div className="mt-5">
                    <h4 className="mb-2 text-sm font-semibold text-[#14302B]">Waiting ({waiting.length})</h4>
                    <ol className="divide-y divide-[#EEF3F1] rounded-lg border border-[#DCE6E3]">
                        {waiting.map((t, i) => (
                            <li key={t.id} className="flex items-center gap-3 px-3.5 py-2.5">
                                <span className="w-12 shrink-0 text-sm font-semibold tabular-nums text-[#14302B]">
                                    {tokenLabel(t.tokenNumber)}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-[#14302B]">{t.patientName}</p>
                                    {t.bookedBy !== t.patientName && (
                                        <p className="truncate text-xs text-[#5B726C]">Booked by {t.bookedBy}</p>
                                    )}
                                </div>
                                {i === 0 && (
                                    <span className="rounded bg-[#E8EFED] px-2 py-0.5 text-xs font-medium text-[#14302B]">Next</span>
                                )}
                                {t.skipCount > 0 && (
                                    <span className="rounded bg-[#FFF6DD] px-2 py-0.5 text-xs font-medium text-[#8A5A00]">
                                        Skipped {t.skipCount}x
                                    </span>
                                )}
                                {!readOnly && !ended && (
                                    <ConfirmButton
                                        label="Cancel"
                                        question="Cancel?"
                                        disabled={busy}
                                        onConfirm={() => onToken(t.id, "cancel")}
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
                    <summary className={`cursor-pointer rounded text-sm font-medium text-[#14302B] ${ui.ring}`}>
                        Completed and cancelled ({done.length})
                    </summary>
                    <ul className="mt-2 divide-y divide-[#EEF3F1] rounded-lg border border-[#DCE6E3]">
                        {done.map((t) => (
                            <li key={t.id} className="flex items-center gap-3 px-3.5 py-2 text-sm">
                                <span className="w-12 shrink-0 font-semibold tabular-nums text-[#14302B]">
                                    {tokenLabel(t.tokenNumber)}
                                </span>
                                <span className="min-w-0 flex-1 truncate text-[#14302B]">{t.patientName}</span>
                                <span className={t.status === "COMPLETED" ? "text-[#1F7A5C]" : "text-[#B42318]"}>
                                    {t.status === "COMPLETED" ? "Completed" : "Cancelled"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </details>
            )}

            {/* End session */}
            {!readOnly && queueStatus === "ACTIVE" && (
                <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#EEF3F1] pt-4">
                    <ConfirmButton
                        label="End session"
                        question="End this session?"
                        disabled={busy || !!serving}
                        onConfirm={() => onSession("end")}
                        className={ui.outlineBtn}
                    />
                    {serving && <p className="text-xs text-[#5B726C]">Finish the current token first.</p>}
                </div>
            )}
        </section>
    );
}