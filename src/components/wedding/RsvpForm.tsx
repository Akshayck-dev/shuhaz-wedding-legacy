import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";

export function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [submitted, setSubmitted] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rsvp = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      guests: String(fd.get("guests") ?? "1"),
      message: String(fd.get("message") ?? ""),
      attending,
      ts: Date.now(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem("rsvps") ?? "[]");
      localStorage.setItem("rsvps", JSON.stringify([...prev, rsvp]));
    } catch {
      // ignore
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Reveal className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
        <div className="font-script text-5xl text-gold">Thank you</div>
        <p className="mt-4 text-sm text-muted-foreground">
          Your response has been recorded. We look forward to sharing this blessed day with you.
        </p>
      </Reveal>
    );
  }

  return (
    <form onSubmit={submit} className="glass mx-auto grid max-w-2xl gap-5 rounded-3xl p-6 sm:p-10">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
      </div>
      <Field label="Number of Guests" name="guests" type="number" defaultValue="1" min="1" />
      <div>
        <label className="mb-2 block text-[10px] tracking-luxury text-muted-foreground uppercase">
          Message
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-ink outline-none focus:border-gold"
        />
      </div>
      <div>
        <div className="mb-3 text-[10px] tracking-luxury text-muted-foreground uppercase">
          Will you attend?
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(["yes", "no"] as const).map((v) => (
            <button
              type="button"
              key={v}
              onClick={() => setAttending(v)}
              className={`rounded-xl border px-4 py-3 text-sm font-medium tracking-wide transition ${
                attending === v
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border bg-white/50 text-muted-foreground hover:border-gold/50"
              }`}
            >
              {v === "yes" ? "Joyfully Attending" : "Regretfully Declining"}
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold px-8 py-4 text-xs font-medium tracking-luxury text-white uppercase shadow-luxury transition hover:shadow-[0_20px_60px_-10px_oklch(0.62_0.11_70/0.5)]"
      >
        Send Blessing
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-[10px] tracking-luxury text-muted-foreground uppercase">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full rounded-xl border border-border bg-white/60 px-4 py-3 text-sm text-ink outline-none focus:border-gold"
        {...rest}
      />
    </div>
  );
}
