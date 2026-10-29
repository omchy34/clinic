// user/settings/page.tsx
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  CircleHelp,
  CreditCard,
  MessageCircle,
  ReceiptText,
} from "lucide-react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

const FAQS_URL = "https://sites.google.com/view/dtfaqs/home";
const REFUND_URL = "https://sites.google.com/view/dt-refund-policy/home";

const whatsappNumber = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP;
const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hi Doctor Token, I need help with my account."
    )}`
  : null;

type SupportItem = {
  title: string;
  description: string;
  href: string | null;
  icon: ReactNode;
};

const items: SupportItem[] = [
  {
    title: "FAQs",
    description: "Answers to the most common questions about Doctor Token.",
    href: FAQS_URL,
    icon: <CircleHelp size={20} />,
  },
  {
    title: "Payment Issues",
    description: "Payment failed or money got deducted? Find out what to do.",
    href: FAQS_URL,
    icon: <CreditCard size={20} />,
  },
  {
    title: "Cancellation & Refunds",
    description: "Read how cancellations work and when you get a refund.",
    href: REFUND_URL,
    icon: <ReceiptText size={20} />,
  },
  {
    title: "WhatsApp Chat",
    description: "Chat with our support team directly on WhatsApp.",
    href: whatsappHref,
    icon: <MessageCircle size={20} />,
  },
];

const cardBase =
  "group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-colors sm:p-5";

function Card({ item }: { item: SupportItem }) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        {item.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold text-slate-900">
          {item.title}
        </span>
        <span className="mt-0.5 block text-sm text-slate-600">
          {item.href ? item.description : "Support chat is not available right now."}
        </span>
      </span>
      {item.href && (
        <ArrowUpRight
          size={18}
          aria-hidden
          className="shrink-0 text-slate-400 transition-colors group-hover:text-emerald-600"
        />
      )}
    </>
  );

  // No link available (e.g. env var missing): render a disabled card
  if (!item.href) {
    return (
      <div className={`${cardBase} cursor-not-allowed opacity-60`}>{content}</div>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardBase} hover:border-emerald-300 hover:bg-emerald-50/50 ${focusRing}`}
    >
      {content}
    </a>
  );
}

const SettingsPage = () => {
  return (
    <main className="mx-auto max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Settings
      </h1>

      <section aria-labelledby="help-heading" className="mt-8">
        <h2
          id="help-heading"
          className="text-sm font-semibold uppercase tracking-wide text-slate-500"
        >
          Help & Support
        </h2>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <Card key={item.title} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default SettingsPage;