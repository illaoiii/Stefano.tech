import { MessageCircle } from "lucide-react";

// Disabled placeholder. No free, keyless way to run a real AI chatbot entirely
// client-side exists — any real model call needs a backend to hold the API key
// (never put OpenAI/Anthropic/Gemini keys in frontend JS). Wire this up later
// by pointing it at your own backend/serverless function once you have one.
//
// Planned FAQ this would eventually answer:
// - Who is this?
// - What skills does he have?
// - What projects has he worked on?
// - What technologies does he use?
// - How can I contact him?
export default function ChatbotWidget() {
  return (
    <button
      type="button"
      disabled
      aria-label="Chat assistant — coming soon"
      title="Chat assistant — coming soon"
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full border border-border bg-card text-muted opacity-70"
    >
      <MessageCircle size={20} strokeWidth={1.5} />
    </button>
  );
}
