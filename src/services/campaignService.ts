import { Campaign, CampaignStatus, CampaignAdGroup, CampaignAd, CampaignExperiment, LaunchChecklistItem } from '../types/campaigns';
import { MOCK_CAMPAIGNS } from '../data/mockCampaigns';

class CampaignService {
  private campaigns: Campaign[] = [...MOCK_CAMPAIGNS];

  public getCampaigns(): Campaign[] {
    return [...this.campaigns];
  }

  public getCampaign(id: string): Campaign | undefined {
    return this.campaigns.find((c) => c.id === id);
  }

  public getCampaignsForProject(projectId: string): Campaign[] {
    return this.campaigns.filter((c) => c.project_id === projectId);
  }

  public getCampaignsForStrategy(strategyId: string): Campaign[] {
    return this.campaigns.filter((c) => c.strategy_id === strategyId);
  }

  public getCampaignsForClient(clientId: string): Campaign[] {
    return this.campaigns.filter((c) => c.client_id === clientId);
  }

  public createCampaign(data: Partial<Campaign>): Campaign {
    const nextSeq = this.campaigns.length + 14;
    const newId = `MG-CMP-2026-${String(nextSeq).padStart(3, '0')}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newCampaign: Campaign = {
      id: newId,
      name: data.name || 'UNTITLED CAMPAIGN',
      campaign_type: data.campaign_type || 'PROSPECTING',
      channel: data.channel || 'META ADS',
      objective: data.objective || 'CONVERSIONS',
      status: data.status || 'DRAFT',
      priority: data.priority || 'NORMAL',
      health: data.health || 'ON TRACK',
      health_reason: data.health_reason || 'Initial campaign setup.',
      current_phase: data.current_phase || 'PLANNING',

      client_id: data.client_id || 'CLI-2026-001',
      client_business_name: data.client_business_name || 'Northstar Commerce',
      project_id: data.project_id || 'PRJ-2026-001',
      project_name: data.project_name || 'Q3 Paid Acquisition System',
      strategy_id: data.strategy_id || 'MG-STR-2026-001',
      strategy_name: data.strategy_name || 'Q3 Growth Acquisition Strategy',
      strategic_role: data.strategic_role || 'Campaign execution engine for strategic goal.',
      strategic_objective_link: data.strategic_objective_link || 'OBJ-1: Primary Customer Acquisition',

      start_date: data.start_date || new Date().toISOString().split('T')[0],
      end_date: data.end_date || '2026-12-31',
      next_review_date: data.next_review_date || '2026-08-30',
      last_updated: now,
      created_at: now,

      campaign_objective_description: data.campaign_objective_description || 'Operational campaign to drive growth objectives.',

      next_action: data.next_action || {
        title: 'Complete initial campaign launch setup checklist',
        owner: 'Marcus Vance',
        due_date: '2026-08-20',
      },
      blockers: data.blockers || [],

      audience: data.audience || {
        name: 'Broad Prospecting Target',
        type: 'BROAD',
        geography: 'United States',
        intent_level: 'Prospecting / Consideration',
        exclusions: ['Existing customers'],
      },

      budget: data.budget || {
        type: 'MONTHLY',
        monthly_amount: '$10,000 / mo',
        daily_amount: '$333 / day',
        currency: 'USD',
        pacing: 'EVEN',
        budget_owner: 'Magniar Performance Team',
        project_media_budget_context: '$30,000 / mo Project Media Spend',
        strategy_allocation_context: '50% Strategy Allocation',
        channel_allocation_context: '100% Channel Allocation',
      },

      team: data.team || {
        campaign_owner: 'Marcus Vance',
        strategy_lead: 'Alexander Wright',
        performance_lead: 'Elena Rostova',
        creative_lead: 'Sophia Chen',
        contributors: [],
        reviewers: ['Alexander Wright'],
        client_stakeholders: ['Sarah Jenkins'],
      },

      ad_groups: data.ad_groups || [],
      ads: data.ads || [],
      creative_matrix: data.creative_matrix || [],
      landing_page: data.landing_page || {
        id: `LP-${newId}-01`,
        campaign_id: newId,
        url: 'https://example.com/landing',
        page_type: 'PRODUCT',
        owner: 'Liam Brody',
        status: 'PLANNED',
        quality_checks: {
          message_match: 'NOT REVIEWED',
          mobile_readiness: 'NOT REVIEWED',
          speed_check: 'NOT REVIEWED',
          tracking_verified: 'NOT REVIEWED',
          conversion_path: 'NOT REVIEWED',
        },
      },

      tracking: data.tracking || {
        status: 'NOT CONFIGURED',
        utm_source: (data.channel || 'meta').toLowerCase().replace(' ', '_'),
        utm_medium: 'cpc',
        utm_campaign: `${newId}_campaign`,
        utm_content: '{{ad.id}}',
        utm_term: '{{adset.id}}',
        conversion_event: 'Purchase',
        conversion_event_status: 'NOT CONNECTED',
        pixel_capi_status: 'Tracking not yet verified',
      },

      experiments: data.experiments || [],
      checklist: data.checklist || [
        { id: 'CHK-01', title: 'Strategy approved by client', status: 'CHECKED' },
        { id: 'CHK-02', title: 'Audience & exclusions configured', status: 'PENDING' },
        { id: 'CHK-03', title: 'Campaign budget approved', status: 'PENDING' },
        { id: 'CHK-04', title: 'Tracking & UTMs verified', status: 'PENDING' },
        { id: 'CHK-05', title: 'Landing page verified', status: 'PENDING' },
        { id: 'CHK-06', title: 'Creative assets approved', status: 'PENDING' },
      ],

      documents: data.documents || [],
      activities: [
        {
          id: `ACT-${Date.now()}`,
          title: 'Campaign Created',
          description: `Campaign ${newId} initialized in ${data.status || 'DRAFT'} status.`,
          timestamp: now,
          author: 'Marcus Vance',
        },
      ],
      notes: data.notes || [],
    };

    this.campaigns.unshift(newCampaign);
    return newCampaign;
  }

  public updateCampaign(id: string, updates: Partial<Campaign>): Campaign | undefined {
    const index = this.campaigns.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const updated: Campaign = {
      ...this.campaigns[index],
      ...updates,
      last_updated: now,
    };

    // Add activity log
    updated.activities = [
      {
        id: `ACT-${Date.now()}`,
        title: 'Campaign Updated',
        description: 'Updated campaign specifications & operational state.',
        timestamp: now,
        author: 'Marcus Vance',
      },
      ...(updated.activities || []),
    ];

    this.campaigns[index] = updated;
    return updated;
  }

  public pauseCampaign(id: string, reason: string, expectedResumeDate?: string): Campaign | undefined {
    const campaign = this.getCampaign(id);
    if (!campaign) return undefined;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    return this.updateCampaign(id, {
      status: 'PAUSED',
      pause_reason: reason,
      expected_resume_date: expectedResumeDate,
      health: 'ATTENTION',
      health_reason: `Campaign paused: ${reason}`,
      activities: [
        {
          id: `ACT-${Date.now()}`,
          title: 'Campaign Paused',
          description: `Reason: ${reason}${expectedResumeDate ? `. Expected resume: ${expectedResumeDate}` : ''}`,
          timestamp: now,
          author: 'Marcus Vance',
        },
        ...(campaign.activities || []),
      ],
    });
  }

  public resumeCampaign(id: string): Campaign | undefined {
    const campaign = this.getCampaign(id);
    if (!campaign) return undefined;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    return this.updateCampaign(id, {
      status: 'ACTIVE',
      pause_reason: undefined,
      expected_resume_date: undefined,
      health: 'ON TRACK',
      health_reason: 'Campaign resumed and operational.',
      activities: [
        {
          id: `ACT-${Date.now()}`,
          title: 'Campaign Resumed',
          description: 'Campaign status transitioned to ACTIVE.',
          timestamp: now,
          author: 'Marcus Vance',
        },
        ...(campaign.activities || []),
      ],
    });
  }

  public duplicateCampaign(id: string): Campaign | undefined {
    const original = this.getCampaign(id);
    if (!original) return undefined;

    const duplicated = this.createCampaign({
      ...original,
      name: `${original.name} (COPY)`,
      status: 'DRAFT',
      current_phase: 'PLANNING',
    });

    return duplicated;
  }

  public archiveCampaign(id: string): Campaign | undefined {
    return this.updateCampaign(id, { status: 'ARCHIVED' });
  }

  public addAdGroup(campaignId: string, adGroup: Partial<CampaignAdGroup>): Campaign | undefined {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return undefined;

    const newAdGroup: CampaignAdGroup = {
      id: `ADG-${Date.now().toString().slice(-4)}`,
      name: adGroup.name || 'New Ad Group',
      campaign_id: campaignId,
      audience_name: adGroup.audience_name || 'Target Segment',
      audience_type: adGroup.audience_type || 'BROAD',
      placement: adGroup.placement || 'AUTOMATIC',
      optimization_event: adGroup.optimization_event || 'PURCHASE',
      budget_allocation: adGroup.budget_allocation || '$100 / day',
      status: adGroup.status || 'ACTIVE',
      start_date: new Date().toISOString().split('T')[0],
      owner: 'Elena Rostova',
      notes: adGroup.notes,
    };

    const updatedAdGroups = [...campaign.ad_groups, newAdGroup];
    return this.updateCampaign(campaignId, { ad_groups: updatedAdGroups });
  }

  public addAd(campaignId: string, ad: Partial<CampaignAd>): Campaign | undefined {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return undefined;

    const newAd: CampaignAd = {
      id: `AD-${Date.now().toString().slice(-4)}`,
      name: ad.name || 'New Creative Ad',
      campaign_id: campaignId,
      ad_group_id: ad.ad_group_id || (campaign.ad_groups[0]?.id ?? 'ADG-DEFAULT'),
      creative_type: ad.creative_type || 'STATIC IMAGE',
      angle: ad.angle || 'PROBLEM / SOLUTION',
      primary_message: ad.primary_message || 'Ad message copy line.',
      headline: ad.headline || 'Headline Callout',
      cta: ad.cta || 'SHOP NOW',
      destination_url: ad.destination_url || 'https://example.com',
      status: ad.status || 'DRAFT',
      review_status: ad.review_status || 'IN REVIEW',
      owner: 'Sophia Chen',
    };

    const updatedAds = [...campaign.ads, newAd];
    return this.updateCampaign(campaignId, { ads: updatedAds });
  }

  public addExperiment(campaignId: string, exp: Partial<CampaignExperiment>): Campaign | undefined {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return undefined;

    const newExp: CampaignExperiment = {
      id: `EXP-${Date.now().toString().slice(-4)}`,
      campaign_id: campaignId,
      strategy_id: campaign.strategy_id,
      name: exp.name || 'New A/B Experiment',
      hypothesis: exp.hypothesis || 'Testing performance impact.',
      variable: exp.variable || 'Creative / Hook',
      control_group: exp.control_group || 'Control Concept A',
      variant_group: exp.variant_group || 'Variant Concept B',
      channel: campaign.channel,
      status: exp.status || 'PLANNED',
      start_date: new Date().toISOString().split('T')[0],
      owner: 'Sophia Chen',
    };

    const updatedExps = [...campaign.experiments, newExp];
    return this.updateCampaign(campaignId, { experiments: updatedExps });
  }

  public addNote(campaignId: string, text: string, author: string = 'Marcus Vance'): Campaign | undefined {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return undefined;

    const newNote = {
      id: `NTE-${Date.now()}`,
      author,
      text,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };

    return this.updateCampaign(campaignId, { notes: [newNote, ...campaign.notes] });
  }

  public updateChecklist(
    campaignId: string,
    itemId: string,
    status: LaunchChecklistItem['status'],
    blockerReason?: string
  ): Campaign | undefined {
    const campaign = this.getCampaign(campaignId);
    if (!campaign) return undefined;

    const updatedChecklist = campaign.checklist.map((item) =>
      item.id === itemId ? { ...item, status, blocker_reason: blockerReason } : item
    );

    return this.updateCampaign(campaignId, { checklist: updatedChecklist });
  }
}

export const campaignService = new CampaignService();
