import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Coffee,
  Clock,
  MapPin,
  Star,
  Phone,
  Instagram,
  Wine,
  Croissant,
} from "lucide-react";

import heroImg from "@/assets/cafe-hero.jpg";
import coffeeImg from "@/assets/cafe-coffee.jpg";
import pastryImg from "@/assets/cafe-pastry.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const reviews = [
  {
    name: "Євген Ністратов",
    text: "Great coffee at a fair price — cosy, pleasant atmosphere and always friendly baristas. Highly recommend.",
    rating: 5,
  },
  {
    name: "Cosmin Stanescu",
    text: "A very charming neighbourhood bar. Great cocktails and a superb atmosphere!",
    rating: 5,
  },
  {
    name: "Lica Pavel",
    text: "A beautifully decorated place, the barista was very kind and genuinely enjoyed working with guests.",
    rating: 5,
  },
];

const hours = [
  { day: "Monday – Friday", time: "08:00 – 21:00" },
  { day: "Saturday", time: "09:00 – 21:00" },
  { day: "Sunday", time: "09:00 – 21:00" },
];

const foodMenu = [
  {
    group: "Toasts",
    items: [
      {
        name: "Toast Egg Me Up",
        desc: "Grana Padano, rucola, roșii, lime, busuioc, baby spanac, muguri pin, muștar Dijon, miere, mix semințe, ouă, pâine, ulei de măsline.",
        grams: "200 gr",
        price: "44",
      },
      {
        name: "Toast Feta Affair",
        desc: "Ciuperci, feta oaie + capră, gălbenuș, unt 82%, lime, sos soia, mix semințe, tabasco, ouă, cimbrișor, sare Maldon, pâine, valeriană.",
        grams: "220 gr",
        price: "44",
      },
      {
        name: "Toast Peach Perfect",
        desc: "Burrata, piersici, prosciutto crudo, rucola, zahăr brun, Grana Padano, miere, busuioc, muguri pin, pâine, ulei de măsline, alune de pădure.",
        grams: "170 gr",
        price: "44",
      },
      {
        name: "Toast The Royal",
        desc: "Cremă de brânză, sfeclă prefiartă, somon afumat, unt 82%, capere, gălbenuș, lime, mărar, ouă, sare Maldon, tarhon uscat, pâine, smântână de gătit.",
        grams: "220 gr",
        price: "44",
      },
    ],
  },
  {
    group: "Sandwiches & Bowls",
    items: [
      {
        name: "Hummus Crunch Me Softly",
        desc: "Năut, usturoi, conopidă, vânătă, zucchini, cartofi, lămâie, ulei de măsline, ceapă roșie, baby spanac, tabasco, miere, mix semințe, Tahini, pâine.",
        grams: "",
        price: "38",
      },
      {
        name: "Sandwich Cheesy Business",
        desc: "Ciuperci, cedar, ceapă roșie, cremă de brânză, emmentaler, usturoi, unt 82%, sos soia, zahăr brun, cimbrișor, sare Maldon, pâine, bere Lager.",
        grams: "280 gr",
        price: "37",
      },
      {
        name: "Sandwich Greek Freak",
        desc: "Halloumi, măsline, vânătă, zucchini, ulei de măsline, lămâie, iaurt, ulei floarea soarelui, mentă, sare, piper, pâine.",
        grams: "280 gr",
        price: "37",
      },
      {
        name: "Sandwich Nuts About Crudo",
        desc: "Burrata, prosciutto crudo, Grana Padano, roșii, rucola, busuioc, alune de pădure, muguri pin, sare Maldon, pâine.",
        grams: "280 gr",
        price: "35",
      },
      {
        name: "Sandwich Kiss My Cotto",
        desc: "Prosciutto cotto, emmentaler, cremă de brânză, baby spanac, usturoi, sare, piper, sare Maldon, pâine.",
        grams: "280 gr",
        price: "35",
      },
    ],
  },
];

function Index() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Please fill in your name, phone, date and time.");
      return;
    }
    toast.success(
      `Thanks, ${form.name}! Your table for ${form.guests} on ${form.date} at ${form.time} is requested. We'll call to confirm.`,
    );
    setForm({ name: "", phone: "", date: "", time: "", guests: "2", notes: "" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-display text-xl font-semibold">
            <Coffee className="h-5 w-5 text-primary" />
            Freya &amp; Friends
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#menu" className="transition-colors hover:text-foreground">Menu</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
            <a href="#visit" className="transition-colors hover:text-foreground">Visit</a>
          </nav>
          <Button asChild size="sm">
            <a href="#book">Book a table</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative">
        <img
          src={heroImg}
          alt="Warm, cosy interior of Freya & Friends café"
          width={1600}
          height={1100}
          className="h-[78vh] min-h-[460px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-5">
            <div className="max-w-xl text-primary-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                <MapPin className="h-3.5 w-3.5" /> Brașov · My Corner
              </span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
                A cosy corner for coffee &amp; good company
              </h1>
              <p className="mt-4 text-base text-primary-foreground/85 sm:text-lg">
                Specialty coffee, evening cocktails and fresh pastries in a warm,
                welcoming space. Come in, slow down, and stay a while.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#book">Reserve a table</a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href="#menu">See the menu</a>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/90">
                <span className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </span>
                <span className="font-semibold">4.8</span>
                <span className="text-primary-foreground/70">· 20 Google reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our story
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              More than a café — a neighbourhood favourite
            </h2>
            <p className="mt-5 text-muted-foreground">
              Tucked into a quiet corner of Brașov, Freya &amp; Friends is where
              locals gather over democratic-priced coffee, thoughtful cocktails
              and a genuinely warm welcome. Our baristas love what they do — and
              it shows in every cup.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you're here for a morning flat white, an afternoon of work,
              or an evening drink with friends, there's always a seat waiting.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <Stat value="4.8" label="Avg. rating" />
              <Stat value="40–60 L" label="Per person" />
              <Stat value="No wait" label="Walk right in" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={coffeeImg}
              alt="Latte art coffee cup on a wooden table"
              width={800}
              height={800}
              loading="lazy"
              className="aspect-square w-full rounded-2xl object-cover shadow-lg"
            />
            <img
              src={pastryImg}
              alt="Fresh pastries and desserts at the café"
              width={800}
              height={800}
              loading="lazy"
              className="mt-8 aspect-square w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section id="menu" className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What we serve
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Menu highlights</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <MenuCard
              icon={<Coffee className="h-6 w-6" />}
              title="Specialty Coffee"
              desc="Espresso, flat whites, pour-overs and seasonal specials, roasted with care."
            />
            <MenuCard
              icon={<Wine className="h-6 w-6" />}
              title="Cocktails & Bar"
              desc="Well-crafted cocktails and a curated selection of drinks for the evening."
            />
            <MenuCard
              icon={<Croissant className="h-6 w-6" />}
              title="Fresh Pastries"
              desc="Croissants, cakes and sweet treats baked to pair with your drink."
            />
          </div>
        </div>
      </section>

      {/* Food menu */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            The kitchen
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Food menu</h2>
          <p className="mt-3 text-muted-foreground">Prices in Lei (L)</p>
        </div>
        <div className="mt-12 space-y-12">
          {foodMenu.map((section) => (
            <div key={section.group}>
              <h3 className="border-b border-border pb-3 text-xl font-semibold text-primary">
                {section.group}
              </h3>
              <ul className="mt-5 space-y-6">
                {section.items.map((item) => (
                  <li key={item.name} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-lg font-semibold">
                        {item.name}
                      </span>
                      <span className="flex shrink-0 items-baseline gap-3 text-sm">
                        {item.grams && (
                          <span className="text-muted-foreground">{item.grams}</span>
                        )}
                        <span className="font-semibold text-primary">{item.price} L</span>
                      </span>
                    </div>
                    <p className="max-w-2xl text-sm text-muted-foreground">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Kind words
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">What guests say</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="flex text-accent">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <p className="mt-4 flex-1 text-muted-foreground">"{r.text}"</p>
              <p className="mt-5 font-semibold">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visit + Booking */}
      <section id="visit" className="bg-secondary/50 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
          {/* Info */}
          <div id="book" className="scroll-mt-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Visit us
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Reserve your table
            </h2>
            <p className="mt-4 text-muted-foreground">
              We usually welcome walk-ins, but reserving ahead means the perfect
              seat is ready for you. Fill in the form and we'll call to confirm.
            </p>

            <div className="mt-8 space-y-5">
              <InfoRow icon={<MapPin className="h-5 w-5" />} title="Address">
                Strada Nicolae Labiș 33, 500171 Brașov
              </InfoRow>
              <InfoRow icon={<Clock className="h-5 w-5" />} title="Opening hours">
                <ul className="space-y-1">
                  {hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-6">
                      <span>{h.day}</span>
                      <span className="text-foreground">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </InfoRow>
              <InfoRow icon={<Phone className="h-5 w-5" />} title="Phone">
                <a href="tel:+40747963332" className="transition-colors hover:text-foreground">
                  0747 963 332
                </a>
              </InfoRow>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-md sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  maxLength={80}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+40 ..."
                  maxLength={30}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <Select
                  value={form.guests}
                  onValueChange={(v) => setForm({ ...form, guests: v })}
                >
                  <SelectTrigger id="guests">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </SelectItem>
                    ))}
                    <SelectItem value="9+">9+ (large group)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Special requests (optional)</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Window seat, birthday, dietary needs..."
                  maxLength={500}
                  rows={3}
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Request reservation
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
            <Coffee className="h-5 w-5 text-primary" /> Freya &amp; Friends
          </div>
          <p>Strada Nicolae Labiș 33, Brașov · Open daily till late</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4" /> @freyaandfriends
          </a>
        </div>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold text-primary">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function MenuCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{desc}</p>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
