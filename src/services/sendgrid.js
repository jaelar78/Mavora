const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'
const FROM_EMAIL = 'noreply@dovroyn.com'
const FROM_NAME = 'Dovroyn'

// ── Config ────────────────────────────────────────────────────────────────────

function isConfigured() {
  return !!(
    import.meta.env.VITE_SENDGRID_API_KEY || localStorage.getItem('sendgrid_api_key')
  )
}

function getApiKey() {
  return localStorage.getItem('sendgrid_api_key') || import.meta.env.VITE_SENDGRID_API_KEY
}

export function isSendGridConfigured() {
  return isConfigured()
}

// ── Shared base email template ────────────────────────────────────────────────

function baseTemplate(content) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background: #faf9f7;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background: #fff;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    h1 {
      font-family: Georgia, serif;
      color: #2c2c2c;
      font-size: 24px;
      margin: 0 0 16px;
    }
    p {
      color: #555;
      line-height: 1.6;
      margin: 0 0 16px;
    }
    .btn {
      display: inline-block;
      background: #c9a96e;
      color: #fff;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 500;
    }
    .footer {
      text-align: center;
      margin-top: 24px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div style="text-align:center;margin-bottom:24px">
        <strong style="font-family:Georgia,serif;font-size:20px;color:#2c2c2c;">Dovroyn</strong>
      </div>
      ${content}
    </div>
    <div class="footer">
      <p>Dovroyn — AI Content Automation</p>
      <p><a href="https://www.dovroyn.com" style="color:#c9a96e">www.dovroyn.com</a></p>
    </div>
  </div>
</body>
</html>`
}

// ── Low-level sender ──────────────────────────────────────────────────────────

async function sendEmail({ to, toName, subject, htmlContent, textContent }) {
  const apiKey = getApiKey()
  if (!apiKey) {
    console.log('[SendGrid] Not configured — skipping email to', to)
    return false
  }

  try {
    const response = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to, name: toName }] }],
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject,
        content: [
          ...(textContent ? [{ type: 'text/plain', value: textContent }] : []),
          { type: 'text/html', value: htmlContent },
        ],
      }),
    })

    return response.ok || response.status === 202
  } catch (err) {
    console.error('[SendGrid] Error:', err)
    return false
  }
}

// ── Template emails ───────────────────────────────────────────────────────────

export async function sendWelcomeEmail(email, name) {
  const firstName = name?.split(' ')[0] || 'there'
  return sendEmail({
    to: email,
    toName: name,
    subject: `Welcome to Dovroyn, ${firstName}!`,
    htmlContent: baseTemplate(
      `<h1>Welcome to Dovroyn</h1>
      <p>Hi ${firstName},</p>
      <p>You're in! Dovroyn is your AI-powered content automation platform — ready to manage all your websites and generate content that sounds like you.</p>
      <p style="text-align:center;margin-top:24px">
        <a href="https://www.dovroyn.com/app" class="btn">Go to Dashboard</a>
      </p>`
    ),
    textContent: `Welcome to Dovroyn, ${firstName}! Start at https://www.dovroyn.com/app`,
  })
}

export async function sendPaymentConfirmation(email, name, planName, amount) {
  const firstName = name?.split(' ')[0] || 'there'
  return sendEmail({
    to: email,
    toName: name,
    subject: `Payment confirmed — you're on ${planName}!`,
    htmlContent: baseTemplate(
      `<h1>Payment Confirmed</h1>
      <p>Hi ${firstName},</p>
      <p>Your subscription to <strong>${planName}</strong> ($${(amount / 100).toFixed(2)}/month) is now active.</p>
      <p style="text-align:center;margin-top:24px">
        <a href="https://www.dovroyn.com/app" class="btn">Start Creating</a>
      </p>`
    ),
    textContent: `Payment confirmed! You're on ${planName} ($${(amount / 100).toFixed(2)}/mo).`,
  })
}

export async function sendPaymentFailed(email, name, planName) {
  const firstName = name?.split(' ')[0] || 'there'
  return sendEmail({
    to: email,
    toName: name,
    subject: `Action needed: Payment failed for ${planName}`,
    htmlContent: baseTemplate(
      `<h1>Payment Issue</h1>
      <p>Hi ${firstName},</p>
      <p>We weren't able to process your latest payment for <strong>${planName}</strong>.</p>
      <p style="text-align:center;margin-top:24px">
        <a href="https://www.dovroyn.com/app" class="btn">Update Payment</a>
      </p>`
    ),
    textContent: `Payment failed for ${planName}. Update at https://www.dovroyn.com/app`,
  })
}

export async function sendCalendarReady(email, name, websiteName, month, postCount) {
  const firstName = name?.split(' ')[0] || 'there'
  return sendEmail({
    to: email,
    toName: name,
    subject: `Your ${month} content calendar is ready!`,
    htmlContent: baseTemplate(
      `<h1>Your Calendar is Ready</h1>
      <p>Hi ${firstName},</p>
      <p>Dovroyn generated your <strong>${month}</strong> content calendar for <strong>${websiteName}</strong> — ${postCount} posts ready to go.</p>
      <p style="text-align:center;margin-top:24px">
        <a href="https://www.dovroyn.com/app/content" class="btn">View Calendar</a>
      </p>`
    ),
    textContent: `Your ${month} calendar for ${websiteName} is ready (${postCount} posts).`,
  })
}

export async function sendWeeklyReport(email, name, stats) {
  const firstName = name?.split(' ')[0] || 'there'
  const {
    impressions = 0,
    clicks = 0,
    spend = 0,
    ctr = 0,
    period = 'last week',
  } = stats

  return sendEmail({
    to: email,
    toName: name,
    subject: `Your weekly ad report — ${period}`,
    htmlContent: baseTemplate(
      `<h1>Weekly Ad Report</h1>
      <p>Hi ${firstName},</p>
      <p>Here's how your ads performed ${period}:</p>
      <table style="width:100%;margin:16px 0;border-collapse:collapse">
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:8px 0;color:#555">Impressions</td>
          <td style="padding:8px 0;text-align:right;font-weight:600">${impressions.toLocaleString()}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:8px 0;color:#555">Clicks</td>
          <td style="padding:8px 0;text-align:right;font-weight:600">${clicks.toLocaleString()}</td>
        </tr>
        <tr style="border-bottom:1px solid #eee">
          <td style="padding:8px 0;color:#555">Spend</td>
          <td style="padding:8px 0;text-align:right;font-weight:600">$${spend.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#555">CTR</td>
          <td style="padding:8px 0;text-align:right;font-weight:600">${ctr}%</td>
        </tr>
      </table>
      <p style="text-align:center;margin-top:24px">
        <a href="https://www.dovroyn.com/app/ads" class="btn">View Full Report</a>
      </p>`
    ),
    textContent: `Weekly report: ${impressions} impressions, ${clicks} clicks, $${spend} spend, ${ctr}% CTR.`,
  })
}
