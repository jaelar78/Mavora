/******  SENDGRID SERVICE — Email campaigns & notifications  ******/

const API_BASE = '/api/sendgrid';

const sendgridService = {
  /**
   * Send a single email
   */
  async sendEmail(params) {
    const { to, subject, html, from = 'noreply@dovroyn.com' } = params;
    try {
      const response = await fetch(`${API_BASE}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html, from }),
      });
      if (!response.ok) throw new Error('Email send failed');
      return { success: true, messageId: `msg_${Date.now()}` };
    } catch (error) {
      console.error('SendGrid error:', error);
      throw error;
    }
  },

  /**
   * Send bulk emails (campaign)
   */
  async sendBulk(params) {
    const { recipients, subject, html, from = 'noreply@dovroyn.com' } = params;
    try {
      const response = await fetch(`${API_BASE}/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipients, subject, html, from }),
      });
      if (!response.ok) throw new Error('Bulk send failed');
      return { success: true, sent: recipients.length };
    } catch (error) {
      console.error('SendGrid bulk error:', error);
      throw error;
    }
  },

  /**
   * Get email templates
   */
  async getTemplates() {
    return [
      { id: 'welcome', name: 'Welcome Email', subject: 'Welcome to Dovroyn!' },
      { id: 'weekly', name: 'Weekly Digest', subject: 'Your Weekly Pod Performance' },
      { id: 'campaign', name: 'Campaign Launch', subject: 'New Campaign Started' },
      { id: 'collab', name: 'Collaboration Request', subject: 'Collaboration Opportunity' },
    ];
  },

  /**
   * Get delivery stats
   */
  async getStats() {
    return {
      sent: 12500,
      delivered: 12200,
      opened: 4850,
      clicked: 1200,
      bounced: 180,
      unsubscribed: 45,
      openRate: '39.8%',
      clickRate: '9.8%',
    };
  },

  /**
   * Add contact to list
   */
  async addContact(params) {
    const { email, firstName, lastName, listId } = params;
    try {
      const response = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, listId }),
      });
      if (!response.ok) throw new Error('Contact add failed');
      return { success: true, contactId: `contact_${Date.now()}` };
    } catch (error) {
      console.error('SendGrid contact error:', error);
      throw error;
    }
  },
};

export default sendgridService;