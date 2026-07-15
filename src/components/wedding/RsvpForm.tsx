import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { User, Users } from "lucide-react";

export function RsvpForm() {
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [submitted, setSubmitted] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rsvp = {
      name: String(fd.get("name") ?? ""),
      guests: String(fd.get("guests") ?? "1"),
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
      <Reveal className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-gold/15 bg-white/60 p-10 text-center backdrop-blur-md shadow-luxury">
        <div className="absolute inset-3 pointer-events-none rounded-[1.25rem] border border-gold/10" />
        <div className="font-script text-5xl text-gold-gradient py-1">Thank you</div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          {attending === "yes" 
            ? "Your response has been recorded. We look forward to sharing this blessed day with you."
            : "Thank you for letting us know. You will be missed!"}
        </p>
      </Reveal>
    );
  }

  return (
    <form onSubmit={submit} className="relative mx-auto grid max-w-sm gap-6 rounded-3xl border border-gold/15 bg-white/60 p-8 text-center backdrop-blur-md shadow-luxury">
      {/* Delicate inner decorative border */}
      <div className="absolute inset-3 pointer-events-none rounded-[1.25rem] border border-gold/10" />
      
      {/* Subtle gold corner accent ornaments */}
      <div className="absolute top-4 left-4 h-3 w-3 border-t border-l border-gold/30" />
      <div className="absolute top-4 right-4 h-3 w-3 border-t border-r border-gold/30" />
      <div className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-gold/30" />
      <div className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-gold/30" />

      <div className="relative z-10 grid gap-6 text-left">
        <Field label="Name" name="name" icon={<User size={13} />} required />
        
        <div>
          <div className="mb-4 text-[10px] tracking-luxury text-gold uppercase font-medium">
            Will you attend?
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {(["yes", "no"] as const).map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => setAttending(v)}
                className={`rounded-full border px-3 py-3 text-[9px] font-semibold tracking-luxury uppercase transition duration-300 ${
                  attending === v
                    ? "border-gold bg-gold/10 text-gold shadow-sm"
                    : "border-gold/20 bg-white/20 text-muted-foreground hover:border-gold/45 hover:text-gold"
                }`}
              >
                {v === "yes" ? "Joyfully Attend" : "Decline"}
              </button>
            ))}
          </div>
        </div>

        {attending === "yes" && (
          <Field label="Number of Guests" name="guests" type="number" defaultValue="1" min="1" icon={<Users size={13} />} />
        )}
      </div>
      
      <button
        type="submit"
        className="relative z-10 mt-2 overflow-hidden rounded-full bg-gradient-to-r from-gold to-gold-soft px-8 py-4 text-xs font-semibold tracking-luxury text-white uppercase shadow-soft transition-all duration-300 hover:shadow-luxury hover:-translate-y-0.5"
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
  icon,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-[10px] tracking-luxury text-gold uppercase font-medium">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="absolute left-0 text-gold/60 pb-1">
          {icon}
        </span>
        <input
          name={name}
          type={type}
          className="w-full border-b border-gold/20 bg-transparent pl-6 pr-1 py-1 text-sm text-ink outline-none transition-all duration-300 focus:border-gold focus:bg-gold/[0.02]"
          {...rest}
        />
      </div>
    </div>
  );
}
