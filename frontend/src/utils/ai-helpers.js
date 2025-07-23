export const rateLimiter = {
  tokens: 10,
  refillRate: 1, // tokens per second
  lastRefill: Date.now(),
  maxTokens: 10,

  async checkLimit() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.maxTokens,
      this.tokens + timePassed * this.refillRate
    );
    this.lastRefill = now;

    if (this.tokens < 1) {
      throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
    }

    this.tokens -= 1;
    return true;
  }
}; 