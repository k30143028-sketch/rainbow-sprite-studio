import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

import couple1 from "@/assets/couple-1.jpg.asset.json";
import couple2 from "@/assets/couple-2.jpg.asset.json";
import couple3 from "@/assets/couple-3.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Костя & Ксю — наша история любви" },
      {
        name: "description",
        content:
          "Маленький сайт о нас двоих: сколько дней мы вместе, наши фотографии, наша история и всё, за что я тебя люблю.",
      },
      { property: "og:title", content: "Костя & Ксю — наша история любви" },
      {
        property: "og:description",
        content: "Сколько дней мы вместе, наши фото и наша история любви.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: couple1.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: couple1.url },
    ],
  }),
  component: LovePage,
});

// День, когда всё началось
const START_DATE = new Date("2024-12-23T00:00:00");

type Elapsed = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function useElapsed(from: Date): Elapsed {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, now - from.getTime());
    const seconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
  }, [now, from]);
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const photos = [
  { src: couple2.url, alt: "Костя и Ксю, нос к носу", tall: true },
  { src: couple1.url, alt: "Костя и Ксю у зеркала" },
  { src: couple3.url, alt: "Костя и Ксю дурачатся" },
];

const story = [
  {
    date: "23 декабря 2024",
    title: "Наш первый день",
    text: "День, с которого всё началось. С тех пор я считаю каждый рассвет вместе с тобой.",
  },
  {
    date: "Каждое утро",
    title: "Доброе утро",
    text: "Просыпаться рядом с тобой — лучшее, что случилось со мной.",
  },
  {
    date: "Каждый вечер",
    title: "Спокойной ночи",
    text: "И засыпать, зная, что завтра снова будешь ты.",
  },
  {
    date: "Сегодня",
    title: "И дальше",
    text: "Столько дней позади, а впереди — вся жизнь. Я выбираю тебя снова и снова.",
  },
];

const reasons = [
  "Твоя улыбка делает любой день светлее",
  "Рядом с тобой я чувствую себя дома",
  "Ты смеёшься над моими глупыми шутками",
  "Мы можем молчать вместе — и это не неловко",
  "Ты обнимаешь так, что весь мир замирает",
  "С тобой даже обычный вторник — праздник",
];

function LovePage() {
  const t = useElapsed(START_DATE);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-soft)" }}
        />
        <FloatingHearts />
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-warm)]"
            style={{ background: "var(--gradient-warm)" }}
          >
            <Heart className="h-8 w-8 fill-current" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.35em] text-muted-foreground"
          >
            наша маленькая вселенная
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 font-display text-6xl font-semibold leading-none sm:text-7xl md:text-8xl"
          >
            Костя
            <span className="mx-3 text-primary">&amp;</span>
            Ксю
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-md text-lg text-muted-foreground"
          >
            Два человека, одна история. И она становится длиннее с каждой секундой.
          </motion.p>

          <CounterCard t={t} />
        </div>
      </section>

      {/* GALLERY */}
      <Section title="Мы" kicker="галерея">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p, i) => (
            <motion.figure
              key={p.src}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl shadow-[var(--shadow-soft)] ${
                p.tall ? "sm:row-span-2" : ""
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  p.tall ? "aspect-[3/4] sm:h-full" : "aspect-square"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.figure>
          ))}
        </div>
      </Section>

      {/* STORY TIMELINE */}
      <Section title="Наша история" kicker="как всё было">
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-1/2" />
          <div className="space-y-10">
            {story.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span
                  className={`absolute top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background left-[9px] sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-2" : "sm:-left-2"
                  }`}
                  style={{ background: "var(--gradient-warm)" }}
                />
                <p className="text-xs uppercase tracking-widest text-primary">
                  {s.date}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* REASONS */}
      <Section title="За что я тебя люблю" kicker="а причин много">
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <motion.div
              key={r}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <Heart className="mt-0.5 h-5 w-5 shrink-0 fill-primary text-primary" />
              <p className="text-card-foreground">{r}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FOOTER LOVE NOTE */}
      <footer className="relative px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: "var(--gradient-soft)" }}
        />
        <div className="relative z-10 mx-auto max-w-xl">
          <Heart className="mx-auto h-10 w-10 fill-primary text-primary" />
          <p className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
            Я люблю тебя, Ксю
          </p>
          <p className="mt-4 text-muted-foreground">
            Спасибо, что ты есть. За {t.days} дней ты стала моим самым любимым
            человеком — и это только начало.
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            навсегда твой, Костя
          </p>
        </div>
      </footer>
    </main>
  );
}

function CounterCard({ t }: { t: Elapsed }) {
  const units = [
    { label: "дней", value: t.days },
    { label: "часов", value: t.hours },
    { label: "минут", value: t.minutes },
    { label: "секунд", value: t.seconds },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="mt-10 rounded-3xl border border-border bg-card/80 p-6 shadow-[var(--shadow-warm)] backdrop-blur"
    >
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
        вместе уже
      </p>
      <div className="flex items-stretch gap-3 sm:gap-5">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3 sm:gap-5">
            <div className="flex min-w-[60px] flex-col items-center sm:min-w-[76px]">
              <span className="font-display text-4xl font-semibold tabular-nums text-primary sm:text-5xl">
                {String(u.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="font-display text-3xl text-border sm:text-4xl">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Section({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-primary">
          {kicker}
        </p>
        <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
          {title}
        </h2>
      </motion.div>
      {children}
    </section>
  );
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${(i * 8.3 + 4) % 100}%`,
        delay: (i % 6) * 0.8,
        duration: 8 + (i % 5),
        size: 12 + (i % 4) * 6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-primary/30"
          style={{ left: h.left, bottom: -40 }}
          animate={{ y: [-20, -640], opacity: [0, 0.8, 0] }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="fill-current" style={{ width: h.size, height: h.size }} />
        </motion.div>
      ))}
    </div>
  );
}
