const getAIBaseUrl = () =>
  import.meta.env.VITE_AI_BASE_URL || "http://localhost:3001";

/**
 * Gửi message sang AI-service
 * @param {Object} payload
 * @param {string} payload.message - nội dung user nhập
 * @param {number|string|null} payload.tourId - id tour (nếu có)
 * @param {Object|null} payload.context - context tour (optional)
 */
export async function chatWithAI({ message, tourId = null, context = null }) {
  const body = { message, tourId };
  if (context) body.context = context;

  const resp = await fetch(`${getAIBaseUrl()}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(data?.error || "AI service request failed");
  }

  return data; 
}
