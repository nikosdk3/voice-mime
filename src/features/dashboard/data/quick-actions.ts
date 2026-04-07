export interface QuickAction {
  title: string;
  description: string;
  gradient: string;
  href: string;
}

export const quickActions: QuickAction[] = [
  {
    title: "Tell a Dark Tale",
    description: "Spin haunting, cinematic stories with rich narration",
    gradient: "from-yellow-500 to-yellow-100",
    href: "/text-to-speech?text=Deep in the forest where no birds dared sing, a lantern flickered beside an abandoned cabin. They said anyone who entered would hear a voice calling their name — not from outside, but from somewhere deep within.",
  },
  {
    title: "Launch a Product",
    description: "Create bold, high-converting product announcements",
    gradient: "from-amber-600 to-amber-200",
    href: "/text-to-speech?text=Meet EmberCharge — the power bank that keeps up with your life. Ultra-fast, ultra-slim, and built to last. Whether you're traveling or working on the go, EmberCharge makes sure you're never left in the dark.",
  },
  {
    title: "Play a Villain",
    description: "Deliver intense, dramatic antagonist dialogue",
    gradient: "from-orange-500 to-orange-100",
    href: "/text-to-speech?text=You still don't understand, do you? This was never about power. It was about proving that I was right — that the world only changes when someone is willing to break it first.",
  },
  {
    title: "Create a Hero Voice",
    description: "Bring bold, inspiring characters to life",
    gradient: "from-violet-950 to-indigo-200",
    href: "/text-to-speech?text=We don't run from the fire — we walk through it. Because on the other side is everything we've been fighting for. Stand with me, and we finish this together.",
  },
  {
    title: "Start a YouTube Channel",
    description: "Hook viewers instantly with a powerful intro",
    gradient: "from-red-700 to-red-200",
    href: "/text-to-speech?text=What’s up everyone — welcome to the channel where we break down the ideas, tools, and strategies that actually move the needle. If you're serious about leveling up, you're in the right place.",
  },
  {
    title: "Calm the Mind",
    description: "Generate warm, grounding guided meditations",
    gradient: "from-indigo-500 to-violet-100",
    href: "/text-to-speech?text=Take a slow breath in through your nose... and gently out through your mouth. Let your shoulders drop. Let your thoughts drift. In this moment, nothing is urgent. You are safe, steady, and at ease.",
  },
];
