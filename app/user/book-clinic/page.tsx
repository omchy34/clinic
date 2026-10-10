import Link from "next/link";
import { Search, MapPin, Star, Stethoscope, Ticket, IndianRupee } from "lucide-react";

type Clinic = {
  id: string;
  name: string;
  speciality: string;
  area: string;
  city: string;
  rating: number;
  fee: number;
  isOpen: boolean;
  tokensLeft: number;
  totalTokens: number;
  timing: string;
};

// TODO: ye data baad mein database se aayega (sirf approved clinics)
const clinics: Clinic[] = [
  {
    id: "meridian-clinic",
    name: "Meridian Clinic",
    speciality: "General Physician",
    area: "Boring Road",
    city: "Patna",
    rating: 4.6,
    fee: 300,
    isOpen: true,
    tokensLeft: 12,
    totalTokens: 30,
    timing: "9:00 AM - 2:00 PM",
  },
  {
    id: "city-care-clinic",
    name: "City Care Clinic",
    speciality: "Child Specialist",
    area: "Kankarbagh",
    city: "Patna",
    rating: 4.4,
    fee: 400,
        isOpen: true,
    tokensLeft: 3,
    totalTokens: 25,
    timing: "10:00 AM - 6:00 PM",
  },
  {
    id: "sunrise-dental",
    name: "Sunrise Dental Care",
    speciality: "Dentist",
    area: "Rajendra Nagar",
    city: "Patna",
    rating: 4.8,
    fee: 500,
    isOpen: false,
    tokensLeft: 0,
    totalTokens: 20,
    timing: "4:00 PM - 8:00 PM",
  },
  {
    id: "shree-skin-clinic",
    name: "Shree Skin & Hair Clinic",
    speciality: "Dermatologist",
    area: "Patliputra",
    city: "Patna",
    rating: 4.3,
    fee: 600,
    isOpen: true,
    tokensLeft: 0,
    totalTokens: 15,
    timing: "11:00 AM - 5:00 PM",
  },
];

type SearchParams = Promise<{ q?: string; open?: string }>;

export default async function BookClinicPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Next 14 use kar rahe ho to: searchParams ko Promise na banao aur await hata do
  const { q = "", open } = await searchParams;
  const query = q.trim().toLowerCase();
  const onlyOpen = open === "1";

  const filtered = clinics.filter((c) => {
    const matchesQuery =
      !query ||
      [c.name, c.speciality, c.area, c.city].some((field) =>
        field.toLowerCase().includes(query)
      );
    const matchesOpen = !onlyOpen || c.isOpen;
    return matchesQuery && matchesOpen;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Book Clinic</h1>
        <p className="text-sm text-gray-500">Clinic chuno, details dekho aur apna token book karo.</p>
      </div>

      {/* Search + filter (URL query se kaam karta hai, JS ki zarurat nahi) */}
      <form method="GET" className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Clinic, doctor type ya area search karo"
            className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-blue-600"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="open"
            value="1"
            defaultChecked={onlyOpen}
            className="h-4 w-4 accent-blue-600"
          />
          Sirf open clinics
        </label>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
        >
          Search
        </button>
      </form>

      <p className="text-sm text-gray-500">
        {filtered.length} clinic{filtered.length === 1 ? "" : "s"} mile
      </p>

      {/* Clinic list */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
          <p className="font-medium text-gray-800">Koi clinic nahi mila</p>
          <p className="mt-1 text-sm text-gray-500">
            Dusra naam ya area try karo, ya filter hata do.
          </p>
          <Link
            href="/book-clinic"
            className="mt-4 inline-block rounded-lg border px-4 py-2 text-sm font-medium text-blue-600"
          >
            Filters hatao
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => {
            const isFull = c.tokensLeft === 0;
            const canBook = c.isOpen && !isFull;
            const filledPercent = ((c.totalTokens - c.tokensLeft) / c.totalTokens) * 100;

            return (
              <div key={c.id} className="flex flex-col rounded-xl border bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                      <Stethoscope size={22} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">{c.name}</h2>
                      <p className="text-sm text-gray-500">{c.speciality}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      c.isOpen ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {c.isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" /> {c.area}, {c.city}
                  </p>
                  <p className="flex items-center gap-2">
                    <Star size={14} className="text-amber-500" /> {c.rating.toFixed(1)}
                  </p>
                  <p className="flex items-center gap-2">
                    <IndianRupee size={14} className="text-gray-400" /> {c.fee} consultation fee
                  </p>
                  <p className="text-gray-500">{c.timing}</p>
                </div>

                {/* Tokens left */}
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Ticket size={14} /> Tokens left
                    </span>
                    <span
                      className={`font-semibold ${
                        isFull ? "text-red-600" : c.tokensLeft <= 5 ? "text-amber-600" : "text-gray-900"
                      }`}
                    >
                      {isFull ? "Full" : `${c.tokensLeft}/${c.totalTokens}`}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${isFull ? "bg-red-500" : "bg-blue-600"}`}
                      style={{ width: `${filledPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/book-clinic/${c.id}`}
                    className="flex-1 rounded-lg border px-4 py-2 text-center text-sm font-medium text-blue-600"
                  >
                    View Details
                  </Link>
                  {canBook ? (
                    <Link
                      href={`/book-clinic/${c.id}?book=1`}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
                    >
                      Book Now
                    </Link>
                  ) : (
                    <span className="flex-1 cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-400">
                      {isFull ? "Full" : "Closed"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}