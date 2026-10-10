import Link from "next/link";
import {
  AlarmClockCheck,
  CalendarCheck2,
  TicketX,
  Ticket,
  Clock,
  Users,
  Stethoscope,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

type BookingStatus = "waiting" | "called" | "completed" | "cancelled";

type Booking = {
  id: string;
  clinicName: string;
  doctor: string;
  date: string;
  slot: string;
  tokenNumber: number;
  status: BookingStatus;
  // sirf aaj ki booking ke liye
  nowServing?: number;
  peopleAhead?: number;
  estWaitMin?: number;
};

// TODO: ye data baad mein database / API se aayega
const stats = [
  { label: "Booked Visits", value: 2, icon: AlarmClockCheck },
  { label: "Completed Visits", value: 120, icon: CalendarCheck2 },
  { label: "Cancelled", value: 5, icon: TicketX },
];

const upcomingBookings: Booking[] = [
  {
    id: "b1",
    clinicName: "Meridian Clinic",
    doctor: "Dr. Sharma",
    date: "Today, 10 Oct",
    slot: "10:30 AM",
    tokenNumber: 14,
    status: "waiting",
    nowServing: 9,
    peopleAhead: 5,
    estWaitMin: 25,
  },
  {
    id: "b2",
    clinicName: "City Care Clinic",
    doctor: "Dr. Verma",
    date: "Tomorrow, 11 Oct",
    slot: "05:00 PM",
    tokenNumber: 7,
    status: "waiting",
  },
];

const statusStyles: Record<BookingStatus, string> = {
  waiting: "bg-amber-50 text-amber-700",
  called: "bg-green-50 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-50 text-red-600",
};

const statusLabels: Record<BookingStatus, string> = {
  waiting: "Waiting",
  called: "Called",
  completed: "Completed",
  cancelled: "Cancelled",
};

function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

function ActiveTokenCard({ booking }: { booking: Booking }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <Ticket size={20} className="text-blue-600" />
          Your Active Token
        </h2>
        <StatusBadge status={booking.status} />
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Token number */}
        <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 text-white">
          <span className="text-xs text-blue-100">Token</span>
          <span className="text-4xl font-bold">#{booking.tokenNumber}</span>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-lg font-semibold text-gray-900">{booking.clinicName}</p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <Stethoscope size={14} /> {booking.doctor}
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-500">
              <CalendarDays size={14} /> {booking.date} · {booking.slot}
            </p>
          </div>

          {booking.nowServing !== undefined && (
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-xl font-bold text-gray-900">#{booking.nowServing}</p>
                <p className="text-xs text-gray-500">Abhi chal raha hai</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
                  <Users size={16} /> {booking.peopleAhead}
                </p>
                <p className="text-xs text-gray-500">Aapse pehle</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-gray-900">
                  <Clock size={16} /> ~{booking.estWaitMin}m
                </p>
                <p className="text-xs text-gray-500">Estimated wait</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/my-bookings/${booking.id}`}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
        >
          View Token
        </Link>
        {/* TODO: cancel ke liye client component / server action banana */}
        <button
          type="button"
          className="rounded-lg border border-red-200 px-5 py-2 text-sm font-medium text-red-600"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

function NoActiveToken() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-dashed bg-white p-6 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
          <Ticket size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Koi active token nahi hai</h2>
          <p className="text-sm text-gray-500">Clinic chuno, date select karo aur apna token lo.</p>
        </div>
      </div>
      <Link
        href="/book-clinic"
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
      >
        Book Clinic
      </Link>
    </div>
  );
}

export default function Page() {
  // Active token = aaj ki pehli booking jo abhi waiting / called me hai
  const activeBooking = upcomingBookings.find(
    (b) => b.date.startsWith("Today") && (b.status === "waiting" || b.status === "called")
  );

  const upcomingList = upcomingBookings.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back 👋</h1>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-4 rounded-xl border bg-white p-5">
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Active Token ya Book Clinic CTA */}
      {activeBooking ? <ActiveTokenCard booking={activeBooking} /> : <NoActiveToken />}

      {/* Upcoming Bookings */}
      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Bookings</h2>
          <Link href="/my-bookings" className="flex items-center text-sm font-medium text-blue-600">
            View all <ChevronRight size={16} />
          </Link>
        </div>

        {upcomingList.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            Abhi koi upcoming booking nahi hai.
          </p>
        ) : (
          <ul className="divide-y">
            {upcomingList.map((b) => (
              <li
                key={b.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                    #{b.tokenNumber}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{b.clinicName}</p>
                    <p className="text-sm text-gray-500">
                      {b.doctor} · {b.date} · {b.slot}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <Link
                    href={`/my-bookings/${b.id}`}
                    className="rounded-lg border px-4 py-1.5 text-sm font-medium text-blue-600"
                  >
                    View Token
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clinic owner banner (sabse neeche) */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Clinic chalate ho?</h2>
          <p className="text-sm text-blue-100">
            Apna clinic register karo aur hazaaron patients tak pahuncho.
          </p>
        </div>
        <Link
          href="/create-your-clinic"
          className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-blue-600"
        >
          Create Your Clinic
        </Link>
      </div>
    </div>
  );
}