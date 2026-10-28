import test from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "http://localhost:3000/api/contact";

let ipCounter = 1;
// Helper for making test requests with mocked external services
async function sendRequest({ body, headers = {}, rawBody = null }) {
  const defaultIp = `198.18.${Math.floor(ipCounter / 250)}.${(ipCounter++ % 250) + 1}`;
  const reqHeaders = {
    "Content-Type": "application/json",
    "x-mock-test": "true", // ensures WP forward is bypassed
    "x-forwarded-for": defaultIp,
    ...headers,
  };

  const options = {
    method: "POST",
    headers: reqHeaders,
  };

  if (rawBody !== null) {
    options.body = rawBody;
  } else if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(BASE_URL, options);
  let json = null;
  try {
    json = await res.json();
  } catch (err) {
    // If not JSON
  }
  return { status: res.status, data: json, headers: res.headers };
}

test("1. Valid contact submission is handled correctly", async () => {
  const payload = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1 555-0199",
    company: "Example Ventures",
    services: "AI & Automation",
    budget: "$25,000 - $50,000",
    message: "We would like to explore AI automation workflows for our client services team.",
  };

  const response = await sendRequest({
    body: payload,
    headers: { "x-forwarded-for": "192.0.2.1" },
  });

  assert.equal(response.status, 200, "Should return HTTP 200 for valid submission");
  assert.equal(response.data?.success, true, "Response success must be true");
  assert.match(
    response.data?.message,
    /received your inquiry/i,
    "Response message should confirm inquiry receipt"
  );
});

test("2. Empty or invalid required fields are rejected with HTTP 400", async (t) => {
  await t.test("Missing name is rejected", async () => {
    const res = await sendRequest({
      body: {
        email: "test@example.com",
        message: "This is a valid inquiry message with sufficient length.",
      },
      headers: { "x-forwarded-for": "192.0.2.21" },
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.match(res.data?.message, /name/i);
  });

  await t.test("Whitespace-only name is rejected", async () => {
    const res = await sendRequest({
      body: {
        name: "   ",
        email: "test@example.com",
        message: "This is a valid inquiry message with sufficient length.",
      },
      headers: { "x-forwarded-for": "192.0.2.22" },
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
  });

  await t.test("Missing email is rejected", async () => {
    const res = await sendRequest({
      body: {
        name: "Test User",
        message: "This is a valid inquiry message with sufficient length.",
      },
      headers: { "x-forwarded-for": "192.0.2.23" },
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.match(res.data?.message, /email/i);
  });

  await t.test("Malformed email format is rejected", async () => {
    const res = await sendRequest({
      body: {
        name: "Test User",
        email: "invalid-email-address",
        message: "This is a valid inquiry message with sufficient length.",
      },
      headers: { "x-forwarded-for": "192.0.2.24" },
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.match(res.data?.message, /valid business email/i);
  });

  await t.test("Missing message is rejected", async () => {
    const res = await sendRequest({
      body: {
        name: "Test User",
        email: "user@example.com",
      },
      headers: { "x-forwarded-for": "192.0.2.25" },
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.match(res.data?.message, /describe your project/i);
  });

  await t.test("Message under 10 characters is rejected", async () => {
    const res = await sendRequest({
      body: {
        name: "Test User",
        email: "user@example.com",
        message: "Too short",
      },
      headers: { "x-forwarded-for": "192.0.2.26" },
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.match(res.data?.message, /at least 10 characters/i);
  });
});

test("3. Honeypot anti-spam detection silently returns success without error", async (t) => {
  await t.test("honeypot field triggers silent acceptance", async () => {
    const res = await sendRequest({
      body: {
        name: "Automated Bot",
        email: "bot@example.com",
        message: "Automated message description here.",
        honeypot: "http://spam-link.example",
      },
    });
    assert.equal(res.status, 200, "Should return 200 to deceive spam bots");
    assert.equal(res.data?.success, true);
  });

  await t.test("bi_hp_contact field triggers silent acceptance", async () => {
    const res = await sendRequest({
      body: {
        name: "Automated Bot",
        email: "bot@example.com",
        message: "Automated message description here.",
        bi_hp_contact: "some_bot_input",
      },
    });
    assert.equal(res.status, 200);
    assert.equal(res.data?.success, true);
  });
});

test("4. Rate limiting permits allowed burst and blocks excessive submissions with HTTP 429", async () => {
  const randomSuffix = Math.floor(Math.random() * 200) + 1;
  const testIp = `198.51.100.${randomSuffix}`;
  const validPayload = {
    name: "Rate Test User",
    email: "rate.test@example.com",
    message: "Valid project enquiry message testing the rate limiter thresholds.",
  };

  // First 5 requests should succeed
  for (let i = 1; i <= 5; i++) {
    const res = await sendRequest({
      body: validPayload,
      headers: { "x-forwarded-for": testIp },
    });
    assert.equal(
      res.status,
      200,
      `Request #${i} within rate limit should succeed with 200 (got ${res.status})`
    );
  }

  // 6th request from same IP must be rate-limited
  const blockedRes = await sendRequest({
    body: validPayload,
    headers: { "x-forwarded-for": testIp },
  });

  assert.equal(blockedRes.status, 429, "6th request must return HTTP 429 (Too Many Requests)");
  assert.equal(blockedRes.data?.success, false);
  assert.match(blockedRes.data?.message, /too many requests/i);
  assert.equal(blockedRes.headers.get("retry-after"), "60", "Must include Retry-After header");
});

test("5. Invalid JSON and unexpected input formats are handled safely", async (t) => {
  await t.test("Malformed JSON string returns 400 Bad Request", async () => {
    const res = await sendRequest({
      rawBody: '{"name": "Broken JSON, invalid syntax',
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
    assert.match(res.data?.message, /invalid json/i);
  });

  await t.test("Non-object JSON (array) returns 400", async () => {
    const res = await sendRequest({
      rawBody: JSON.stringify(["unexpected", "array"]),
    });
    assert.equal(res.status, 400);
    assert.equal(res.data?.success, false);
  });

  await t.test("HTML tags in inputs are safely stripped", async () => {
    const res = await sendRequest({
      body: {
        name: "Jane <script>alert(1)</script>Doe",
        email: "jane.doe@example.com",
        message: "Inquiry with <b>html formatting</b> inside the message description.",
      },
    });
    assert.equal(res.status, 200);
    assert.equal(res.data?.success, true);
  });
});
