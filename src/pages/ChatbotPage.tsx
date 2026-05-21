import { useState, useRef, useEffect } from 'react'

type Message = {
  id: number
  role: 'bot' | 'user'
  text: string
  time: string
}

function now() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: 'bot', text: 'Welcome! You can check a bank account or report a suspicious one.', time: now() },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  function sendMessage() {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), role: 'user', text, time: now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setThinking(true)

    setTimeout(() => {
      const reply = generateReply(text)
      setThinking(false)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: reply, time: now() }])
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Welcome header */}
      <div
        className="px-4 md:px-8 py-8 text-center"
        style={{ background: 'linear-gradient(to bottom, rgba(0,112,235,0.08), transparent)' }}
      >
        <h2 className="text-3xl font-semibold leading-10 mb-2" style={{ color: 'var(--color-primary)' }}>
          Welcome to the Mule Bank Account Reporting System.
        </h2>
        <p className="text-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
          How can we help you today?
        </p>
      </div>

      {/* Chat window */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 md:px-8 pb-44">
        <div className="max-w-3xl mx-auto space-y-6 py-4">
          {messages.map((msg) =>
            msg.role === 'bot' ? (
              <BotMessage key={msg.id} text={msg.text} time={msg.time} />
            ) : (
              <UserMessage key={msg.id} text={msg.text} time={msg.time} />
            )
          )}
          {thinking && <ThinkingBubble />}
        </div>
      </div>

      {/* Floating input area */}
      <div
        className="absolute bottom-0 left-0 w-full px-4 md:px-8 py-4 border-t"
        style={{
          background: 'rgba(247,249,252,0.85)',
          backdropFilter: 'blur(12px)',
          borderColor: 'var(--color-outline-variant)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Disclaimer */}
          <p className="text-center text-xs mb-3" style={{ color: 'var(--color-outline)' }}>
            <span className="material-symbols-outlined align-middle mr-1" style={{ fontSize: '14px' }}>info</span>
            All information is user-reported and does not constitute legal confirmation of wrongdoing.
          </p>

          {/* Input row */}
          <div
            className="flex items-center gap-2 px-2 py-1 rounded-full border shadow-sm transition-all"
            style={{
              backgroundColor: 'var(--color-surface-container-highest)',
              borderColor: 'var(--color-outline-variant)',
            }}
            onFocus={() => {}}
          >
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ color: 'var(--color-outline)' }}
            >
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <input
              className="flex-1 bg-transparent border-none outline-none text-sm py-2"
              placeholder="Type account number or ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ color: 'var(--color-on-surface)' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || thinking}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Atmospheric background icon */}
      <div className="fixed top-24 right-8 pointer-events-none select-none hidden lg:block" style={{ opacity: 0.03 }}>
        <span className="material-symbols-outlined" style={{ fontSize: '320px', fontVariationSettings: '"wght" 200' }}>
          verified_user
        </span>
      </div>
    </div>
  )
}

// ── Message bubble components ────────────────────────────────────────────────

function BotMessage({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
      >
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
      </div>
      <div
        className="p-4 rounded-xl max-w-[80%] border"
        style={{
          backgroundColor: 'var(--color-surface-container)',
          borderColor: 'rgba(193,198,215,0.3)',
          borderBottomLeftRadius: '2px',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--color-on-surface)' }}>{text}</p>
        <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-outline)' }}>System • {time}</span>
      </div>
    </div>
  )
}

function UserMessage({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 flex-row-reverse">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)' }}
      >
        <span className="material-symbols-outlined text-sm">person</span>
      </div>
      <div
        className="p-4 rounded-xl max-w-[80%]"
        style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-on-primary)', borderBottomRightRadius: '2px' }}
      >
        <p className="text-sm">{text}</p>
        <span className="text-[10px] mt-1 block text-right" style={{ color: 'rgba(255,255,255,0.6)' }}>You • {time}</span>
      </div>
    </div>
  )
}

function ThinkingBubble() {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: 'var(--color-secondary-container)', color: 'var(--color-primary)' }}
      >
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>smart_toy</span>
      </div>
      <div
        className="p-4 rounded-xl border flex items-center gap-3"
        style={{ backgroundColor: 'var(--color-surface-container)', borderColor: 'rgba(193,198,215,0.3)', borderBottomLeftRadius: '2px' }}
      >
        <span
          className="material-symbols-outlined animate-spin"
          style={{ color: 'var(--color-primary)', fontVariationSettings: '"FILL" 1' }}
        >
          progress_activity
        </span>
        <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>Thinking...</p>
      </div>
    </div>
  )
}

// ── Simple reply generator ───────────────────────────────────────────────────

function generateReply(input: string): string {
  const lower = input.toLowerCase()
  if (/\d{6,}/.test(input)) {
    const num = input.match(/\d+/)?.[0] ?? input
    return `I am checking account ${num} for suspicious activity. Please note that I am an AI assistant and results are indicative only.`
  }
  if (lower.includes('report')) return 'To file a formal report, please navigate to the Report Form page using the sidebar.'
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('สวัสดี')) return 'Hello! How can I assist you today? You can provide a bank account number or describe the suspicious activity.'
  if (lower.includes('help')) return 'I can help you check a suspicious bank account number or guide you to the Report Form. What would you like to do?'
  return 'Please provide a bank account number to check, or describe the suspicious activity and I will assist you.'
}
