import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MapPin, Utensils, Bike, Sparkles, CalendarHeart } from "lucide-react";

import couple1 from "@/assets/couple-1.jpg.asset.json";
import couple2 from "@/assets/0164300D-0198-4184-98AF-273CD9A9376D.jpeg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ксю приглашает тебя на свидание" },
      {
        name: "description",
        content: "Костя, у меня к тебе один вопрос...",
      },
      { property: "og:title", content: "Ксю приглашает тебя на свидание" },
      {
        property: "og:description",
        content: "Костя, у меня к тебе один вопрос...",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: couple1.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: couple1.url },
    ],
  }),
  component: InvitePage,
});

type Step = "ask" | "activity" | "schedule" | "done";

const activities = [
  {
    id: "walk",
    label: "Погулять",
    desc: "Просто пройтись вдвоём, куда глаза глядят.",
    icon: MapPin,
  },
  {
    id: "venue",
    label: "Заведение",
    desc: "Кафе, ресторан или бар — выберем вместе.",
    icon: Utensils,
  },
  {
    id: "active",
    label: "Активный отдых",
    desc: "Что-то энергичное и весёлое.",
    icon: Bike,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

function InvitePage() {
  const [step, setStep] = useState<Step>("ask");
  const [activity, setActivity] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const chosenActivity = activities.find((a) => a.id === activity);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "var(--gradient-soft)" }}
      />
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {step === "ask" && (
            <AskStep key="ask" onYes={() => setStep("activity")} />
          )}

          {step === "activity" && (
            <motion.div
              key="activity"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Kicker>шаг 1 из 2</Kicker>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Чем займёмся?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Выбери, что тебе больше по душе.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {activities.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setActivity(a.id);
                      setStep("schedule");
                    }}
                    className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-warm)]"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground"
                      style={{ background: "var(--gradient-warm)" }}
                    >
                      <a.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-lg font-semibold">
                      {a.label}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {a.desc}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "schedule" && (
            <motion.div
              key="schedule"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Kicker>шаг 2 из 2</Kicker>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Когда тебе удобно?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Выбрал(а): <span className="text-primary">{chosenActivity?.label}</span>.
                Напиши дату и время.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("done");
                }}
                className="mt-10 mx-auto flex max-w-sm flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
              >
                <label className="flex flex-col gap-2 text-left">
                  <span className="text-sm font-medium text-muted-foreground">
                    Дата
                  </span>
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <label className="flex flex-col gap-2 text-left">
                  <span className="text-sm font-medium text-muted-foreground">
                    Время
                  </span>
                  <input
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:scale-105"
                  style={{ background: "var(--gradient-warm)" }}
                >
                  <CalendarHeart className="h-5 w-5" />
                  Подтвердить
                </button>
              </form>
            </motion.div>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.figure
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mx-auto w-56 overflow-hidden rounded-3xl shadow-[var(--shadow-warm)] sm:w-64"
              >
               <img
  src={couple2}
  alt="Костя и Ксю"
  className="aspect-[3/4] w-full object-cover"
/>
/>
                />
              </motion.figure>

              <Heart className="mx-auto mt-8 h-8 w-8 fill-primary text-primary" />
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Ура, договорились!
              </h2>
              <p className="mt-4 text-muted-foreground">
                {chosenActivity?.label} — {formatDate(date)} в {time}.
                <br />
                Жду не дождусь.
              </p>
              <p className="mt-8 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                с любовью, Ксю
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function AskStep({ onYes }: { onYes: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  const dodge = () => {
    const bounds = containerRef.current?.getBoundingClientRect();
    const rangeX = bounds ? Math.min(bounds.width / 2 - 40, 140) : 120;
    const rangeY = bounds ? Math.min(bounds.height / 2 - 30, 90) : 70;
    const x = (Math.random() * 2 - 1) * rangeX;
    const y = (Math.random() * 2 - 1) * rangeY;
    setNoPos({ x, y });
    setDodges((d) => d + 1);
  };

  const noHints = [
    "Не, серьёзно?",
    "Ты уверен?",
    "Точно-точно?",
    "Даже не думай)",
    "Так не пойдёт",
    "Ладно, я поняла — да",
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-warm)]"
        style={{ background: "var(--gradient-warm)" }}
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>

      <Kicker>Костя, у меня к тебе вопрос</Kicker>
      <h1 className="mt-4 font-display text-5xl font-semibold leading-tight sm:text-6xl">
        Свидание?
      </h1>

      <div
        ref={containerRef}
        className="relative mx-auto mt-12 flex h-40 max-w-md items-center justify-center gap-6"
      >
        <button
          onClick={onYes}
          className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-primary-foreground shadow-[var(--shadow-warm)] transition-transform hover:scale-105"
          style={{ background: "var(--gradient-warm)" }}
        >
          <Heart className="h-5 w-5 fill-current" />
          Да
        </button>

        <motion.button
          type="button"
          onMouseEnter={dodge}
          onClick={dodge}
          animate={{ x: noPos.x, y: noPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="rounded-full border border-border bg-card px-8 py-4 font-semibold text-card-foreground shadow-[var(--shadow-soft)]"
        >
          {dodges === 0 ? "Нет" : noHints[Math.min(dodges - 1, noHints.length - 1)]}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm uppercase tracking-[0.35em] text-primary">
      {children}
    </p>
  );
}

function formatDate(value: string) {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${(i * 9.7 + 4) % 100}%`,
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
          className="absolute text-primary/25"
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
