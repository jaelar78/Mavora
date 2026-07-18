const META_API_BASE = 'https://graph.facebook.com/v21.0'

// ── Config ────────────────────────────────────────────────────────────────────

function getConfig() {
  const accessToken =
    localStorage.getItem('meta_access_token') || import.meta.env.VITE_META_ACCESS_TOKEN
  const adAccountId =
    localStorage.getItem('meta_ad_account_id') || import.meta.env.VITE_META_AD_ACCOUNT_ID

  if (!accessToken || !adAccountId) return null
  return { accessToken, adAccountId }
}

export function isMetaAdsConfigured() {
  return !!getConfig()
}

export function getMetaConfig() {
  return getConfig()
}

// ── Low-level API client ──────────────────────────────────────────────────────

async function metaApiCall(endpoint, method = 'GET', body = null) {
  const config = getConfig()
  if (!config) throw new Error('Meta Ads not configured. Add credentials in Settings.')

  const url = new URL(`${META_API_BASE}${endpoint}`)

  if (method === 'GET') {
    url.searchParams.set('access_token', config.accessToken)
    if (body) {
      Object.entries(body).forEach(([k, v]) => {
        url.searchParams.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v))
      })
    }
  }

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify({ ...body, access_token: config.accessToken })
  }

  const response = await fetch(url.toString(), options)

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Meta API Error (${response.status}): ${text}`)
  }

  return response.json()
}

// ── Connection & account helpers ──────────────────────────────────────────────

/**
 * Verifies that the stored Meta credentials are valid.
 * Returns { connected, accountName } — safe to call on mount.
 */
export async function verifyMetaConnection() {
  try {
    const config = getConfig()
    if (!config) return { connected: false }

    const result = await metaApiCall(`/act_${config.adAccountId}`, 'GET', {
      fields: 'id,name,account_status,currency,timezone_name',
    })
    return {
      connected: result.account_status === 1,
      accountName: result.name,
      currency: result.currency,
      timezone: result.timezone_name,
    }
  } catch (err) {
    return { connected: false, error: err.message }
  }
}

// ── Campaign management ───────────────────────────────────────────────────────

/**
 * Lists campaigns for the configured ad account.
 * @param {string} [status]  — optional filter, e.g. 'ACTIVE', 'PAUSED'
 */
export async function listMetaCampaigns(status) {
  const config = getConfig()
  const params = {
    fields: 'id,name,status,objective,daily_budget,lifetime_budget,created_time,effective_status',
  }
  if (status) params.effective_status = JSON.stringify([status])

  return metaApiCall(`/act_${config.adAccountId}/campaigns`, 'GET', params)
}

/**
 * Creates a new Meta campaign.
 * @param {string} name
 * @param {string} [objective='OUTCOME_AWARENESS']
 * @param {string} [status='PAUSED'] — PAUSED or ACTIVE
 */
export async function createMetaCampaign(name, objective = 'OUTCOME_AWARENESS', status = 'PAUSED') {
  const config = getConfig()
  return metaApiCall(`/act_${config.adAccountId}/campaigns`, 'POST', {
    name,
    objective,
    status,
    special_ad_categories: [],
  })
}

/**
 * Updates a campaign (e.g. toggle status).
 */
export async function updateMetaCampaign(campaignId, updates) {
  return metaApiCall(`/${campaignId}`, 'POST', updates)
}

// ── Ad set management ─────────────────────────────────────────────────────────

/**
 * Lists ad sets under a campaign.
 */
export async function listMetaAdSets(campaignId) {
  return metaApiCall(`/${campaignId}/adsets`, 'GET', {
    fields: 'id,name,targeting,daily_budget,bid_amount,status,optimization_goal',
  })
}

/**
 * Creates an ad set.
 * @param {string} campaignId
 * @param {string} name
 * @param {Object} targeting — { geo_locations, interests, age_min, age_max, genders }
 * @param {number} dailyBudget — in account currency cents
 * @param {string} [optimizationGoal='REACH']
 */
export async function createMetaAdSet(campaignId, name, targeting, dailyBudget, optimizationGoal = 'REACH') {
  const config = getConfig()
  return metaApiCall(`/act_${config.adAccountId}/adsets`, 'POST', {
    campaign_id: campaignId,
    name,
    targeting,
    daily_budget: dailyBudget,
    optimization_goal: optimizationGoal,
    billing_event: 'IMPRESSIONS',
    status: 'PAUSED',
  })
}

// ── Ad (creative) management ──────────────────────────────────────────────────

/**
 * Lists ads under an ad set.
 */
export async function listMetaAds(adSetId) {
  return metaApiCall(`/${adSetId}/ads`, 'GET', {
    fields: 'id,name,creative{object_story_spec},status,effective_status',
  })
}

/**
 * Creates a new ad with creative.
 * @param {string} adSetId
 * @param {string} name
 * @param {string} message — ad body text
 * @param {string} linkUrl — destination URL
 * @param {string} headline — headline text
 * @param {string} [imageHash] — optional uploaded image hash
 */
export async function createMetaAd(adSetId, name, message, linkUrl, headline, imageHash) {
  const config = getConfig()

  // Build creative spec
  const creativeSpec = {
    name: `${name} Creative`,
    object_story_spec: {
      page_id: config.pageId,
      link_data: {
        message,
        link: linkUrl,
        name: headline,
        ...(imageHash ? { image_hash: imageHash } : {}),
      },
    },
    degrees_of_freedom_spec: {
      creative_features_spec: { quote_card: true },
    },
  }

  const { id: creativeId } = await metaApiCall(`/act_${config.adAccountId}/adcreatives`, 'POST', creativeSpec)

  return metaApiCall(`/act_${config.adAccountId}/ads`, 'POST', {
    name,
    adset_id: adSetId,
    creative: { creative_id: creativeId },
    status: 'PAUSED',
  })
}

// ── Insights / analytics ──────────────────────────────────────────────────────

/**
 * Retrieves campaign-level insights.
 * @param {string} [campaignId] — if omitted, account-level
 * @param {string} [datePreset='last_7d'] — e.g. 'today', 'yesterday', 'last_7d', 'last_30d'
 */
export async function getMetaInsights(campaignId, datePreset = 'last_7d') {
  const config = getConfig()
  const target = campaignId || `act_${config.adAccountId}`

  return metaApiCall(`/${target}/insights`, 'GET', {
    fields: 'campaign_name,impressions,clicks,spend,cpm,cpc,ctr,reach,frequency,actions,conversions',
    level: 'campaign',
    date_preset: datePreset,
  })
}

/**
 * Gets ad-level insights (more granular than campaign).
 */
export async function getMetaAdInsights(adId, datePreset = 'last_7d') {
  return metaApiCall(`/${adId}/insights`, 'GET', {
    fields: 'ad_name,impressions,clicks,spend,cpm,cpc,ctr,reach',
    level: 'ad',
    date_preset: datePreset,
  })
}

// ── Audience / targeting helpers ──────────────────────────────────────────────

/**
 * Searches for interest targeting options.
 */
export async function searchMetaInterests(query) {
  return metaApiCall('/search', 'GET', {
    type: 'adinterest',
    q: query,
    limit: 25,
  })
}

/**
 * Gets ad account's custom audiences.
 */
export async function listCustomAudiences() {
  const config = getConfig()
  return metaApiCall(`/act_${config.adAccountId}/customaudiences`, 'GET', {
    fields: 'id,name,approximate_count,delivery_status',
  })
}

// ── Automated rules (budget optimization) ─────────────────────────────────────

/**
 * Lists existing automated rules for the ad account.
 */
export async function listAutomatedRules() {
  const config = getConfig()
  return metaApiCall(`/act_${config.adAccountId}/adrules_library`, 'GET', {
    fields: 'id,name,status,execution_options,schedule',
  })
}

/**
 * Creates a simple automated rule to adjust budget based on ROAS.
 */
export async function createBudgetRule(name, campaignId, conditions, action) {
  const config = getConfig()
  return metaApiCall(`/act_${config.adAccountId}/adrules_library`, 'POST', {
    name,
    status: 'ENABLED',
    evaluation_spec: {
      evaluation_type: 'SCHEDULED',
      filters: [
        { field: 'entity_type', value: 'CAMPAIGN' },
        { field: 'entity_id', value: campaignId },
        ...conditions,
      ],
    },
    execution_spec: action,
    schedule: { type: 'DAILY' },
  })
}

// ── Deployment helper (create full funnel from AI content) ────────────────────

/**
 * Deploys a campaign from AI-generated content in one call.
 * Creates campaign → ad set → ad with creative.
 */
export async function deployCampaignFromContent({
  campaignName,
  objective = 'OUTCOME_AWARENESS',
  targeting,
  dailyBudget,
  adMessage,
  adLink,
  adHeadline,
  imageHash,
}) {
  // 1. Campaign
  const { id: campaignId } = await createMetaCampaign(campaignName, objective, 'PAUSED')

  // 2. Ad Set
  const adSetName = `${campaignName} - Ad Set`
  const { id: adSetId } = await createMetaAdSet(campaignId, adSetName, targeting, dailyBudget)

  // 3. Ad
  const adName = `${campaignName} - Ad`
  const ad = await createMetaAd(adSetId, adName, adMessage, adLink, adHeadline, imageHash)

  return { campaignId, adSetId, adId: ad.id }
}
