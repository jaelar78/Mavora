export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const CHAT_LIMITS = {
  maxMessagesPerRequest: 24,
  maxMessageLength: 1200,
  requestsPerMinute: 8,
} as const;
