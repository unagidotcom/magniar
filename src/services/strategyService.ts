import { Strategy, StrategyObjective, StrategyChannelItem, StrategyExperiment, StrategyRecommendation, StrategyNoteItem } from '../types/strategies';
import { MOCK_STRATEGIES } from '../data/mockStrategiesData';

class StrategyService {
  private strategies: Strategy[] = [...MOCK_STRATEGIES];

  public getStrategies(): Strategy[] {
    return this.strategies;
  }

  public getStrategy(id: string): Strategy | undefined {
    return this.strategies.find((s) => s.id === id);
  }

  public getStrategiesForProject(projectId: string): Strategy[] {
    return this.strategies.filter((s) => s.project_id === projectId);
  }

  public getStrategiesForClient(clientId: string): Strategy[] {
    return this.strategies.filter((s) => s.client_id === clientId);
  }

  public createStrategy(data: Omit<Partial<Strategy>, 'id'> & { name: string; project_id: string; project_name: string; client_id: string; client_business_name: string }): Strategy {
    const year = new Date().getFullYear();
    const count = this.strategies.length + 1;
    const newId = `MG-STR-${year}-${String(count).padStart(3, '0')}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newStrategy: Strategy = {
      id: newId,
      name: data.name,
      strategy_type: data.strategy_type || 'PERFORMANCE MARKETING',
      status: data.status || 'DRAFT',
      health: data.health || 'ON TRACK',
      version: 'v1.0',
      is_current: true,

      client_id: data.client_id,
      client_business_name: data.client_business_name,
      project_id: data.project_id,
      project_name: data.project_name,

      strategy_lead: data.strategy_lead || 'Magniar Strategy Team',
      contributors: data.contributors || ['Magniar Growth Team'],
      approvers: data.approvers || ['Kaelen Voss'],
      client_stakeholders: data.client_stakeholders || ['Client CMO'],

      created_at: today,
      last_updated: today,
      next_review_date: data.next_review_date || '30 days',

      description: data.description || 'New strategy plan created in Magniar OS.',
      executive_summary: data.executive_summary || 'Executive summary outlining strategic direction, key priorities, and targeted outcomes.',

      business_context: data.business_context || {
        business_model: 'Ecommerce',
        industry: 'General',
        primary_market: 'North America',
        secondary_markets: [],
        countries: ['USA'],
        languages: ['English'],
        currency: 'USD',
        product_service: 'DTC Product',
        business_maturity: 'Growth',
        growth_stage: 'Scaling',
        current_situation: 'Current situation description.',
        strategic_problem: 'Primary strategic problem statement.',
        strategic_opportunity: 'Primary strategic opportunity.',
      },

      objectives: data.objectives || [],
      audience: data.audience || {
        primary_audience: {
          name: 'Core Consumer Audience',
          age_range: '25-45',
          geography: 'United States',
          gender: 'All',
          interests: 'Lifestyle, Tech',
          behavior: 'Active online shoppers',
          buying_intent: 'High',
          pain_points: 'Value & Quality',
          needs: 'Reliable service',
          motivations: 'Quality & Speed',
          barriers: 'Price point',
          use_case: 'Daily use',
        },
        customer_problem: 'Customer problem statement',
        primary_motivators: ['Quality', 'Speed', 'Trust'],
        primary_objections: ['Price', 'Unclear benefits'],
      },
      positioning: data.positioning || {
        market_position: 'Mid-Premium',
        core_value_proposition: 'High performance solution with clear ROI.',
        key_differentiators: ['Quality', 'Service'],
        proof_points: ['5-Star Reviews'],
        competitive_advantage: 'Customer service',
        brand_promise: 'Quality guaranteed',
        competitors: [],
      },
      channels: data.channels || [],
      budget: data.budget || {
        client_media_spend_range: '$20,000 – $40,000 / month',
        currency: 'USD',
        flexibility: 'FLEXIBLE',
        note: 'Direct client media spend',
        allocations: [],
      },
      funnel: data.funnel || [],
      messaging: data.messaging || {
        core_message: 'Core brand message.',
        supporting_messages: [],
        proof_points: [],
        offer: 'Standard Welcome Offer',
        cta: 'Get Started →',
        objection_handling: 'Risk-free trial',
      },
      creative: data.creative || {
        themes: [],
        angles: [],
        formats: [],
        testing_approach: 'Bi-weekly sprints',
      },
      experiments: data.experiments || [],
      hypotheses: data.hypotheses || [],
      recommendations: data.recommendations || [],
      roadmap: data.roadmap || [],
      dependencies: data.dependencies || [],
      risks: data.risks || [],
      assumptions: data.assumptions || [],
      measurement_framework: data.measurement_framework || [],
      data_sources: data.data_sources || [
        { name: 'Meta Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
        { name: 'Google Ads API', category: 'Paid Channel', status: 'DEMO / MOCK' },
      ],
      approval: data.approval || {
        status: 'DRAFT',
      },
      version_history: [
        {
          version: 'v1.0',
          is_current: true,
          date: today,
          author: data.strategy_lead || 'Magniar Strategy Team',
          summary: 'Initial strategy created.',
          status: 'DRAFT',
        },
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          title: 'Strategy Created',
          description: `Strategy ${data.name} created for project ${data.project_name}.`,
          timestamp: today,
          author: 'System Admin',
        },
      ],
      notes: [],
    };

    this.strategies.unshift(newStrategy);
    return newStrategy;
  }

  public updateStrategy(id: string, updates: Partial<Strategy>): Strategy | undefined {
    const index = this.strategies.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const existing = this.strategies[index];

    const updatedStrategy: Strategy = {
      ...existing,
      ...updates,
      last_updated: today,
    };

    this.strategies[index] = updatedStrategy;
    return updatedStrategy;
  }

  public createStrategyVersion(id: string, summary: string, author: string = 'Kaelen Voss'): Strategy | undefined {
    const strategy = this.getStrategy(id);
    if (!strategy) return undefined;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    // Parse version e.g. "v1.4" -> 1.5
    const currentVersionStr = strategy.version; // e.g. "v1.4"
    const match = currentVersionStr.match(/v(\d+)\.(\d+)/);
    let newVersionStr = 'v1.1';
    if (match) {
      const major = parseInt(match[1], 10);
      const minor = parseInt(match[2], 10) + 1;
      newVersionStr = `v${major}.${minor}`;
    }

    // Mark previous versions as not current
    const updatedHistory = strategy.version_history.map((v) => ({ ...v, is_current: false }));
    updatedHistory.unshift({
      version: newVersionStr,
      is_current: true,
      date: today,
      author: author,
      summary: summary || `Created strategy version ${newVersionStr}`,
      status: strategy.status,
    });

    const updated = this.updateStrategy(id, {
      version: newVersionStr,
      version_history: updatedHistory,
      activities: [
        {
          id: `act-${Date.now()}`,
          title: `New Version ${newVersionStr} Created`,
          description: summary || `Version ${newVersionStr} published.`,
          timestamp: today,
          author: author,
        },
        ...strategy.activities,
      ],
    });

    return updated;
  }

  public archiveStrategy(id: string): Strategy | undefined {
    const strategy = this.getStrategy(id);
    if (!strategy) return undefined;

    return this.updateStrategy(id, {
      status: 'ARCHIVED',
      is_current: false,
    });
  }

  public duplicateStrategy(id: string): Strategy | undefined {
    const original = this.getStrategy(id);
    if (!original) return undefined;

    const year = new Date().getFullYear();
    const count = this.strategies.length + 1;
    const newId = `MG-STR-${year}-${String(count).padStart(3, '0')}`;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const copy: Strategy = {
      ...JSON.parse(JSON.stringify(original)),
      id: newId,
      name: `${original.name} (Copy)`,
      status: 'DRAFT',
      version: 'v1.0',
      is_current: true,
      created_at: today,
      last_updated: today,
      version_history: [
        {
          version: 'v1.0',
          is_current: true,
          date: today,
          author: 'System Admin',
          summary: `Duplicated from ${original.id} (${original.version})`,
          status: 'DRAFT',
        },
      ],
      activities: [
        {
          id: `act-${Date.now()}`,
          title: 'Strategy Duplicated',
          description: `Duplicated from strategy ${original.id}.`,
          timestamp: today,
          author: 'System Admin',
        },
      ],
    };

    this.strategies.unshift(copy);
    return copy;
  }

  public submitStrategyForReview(id: string): Strategy | undefined {
    const strategy = this.getStrategy(id);
    if (!strategy) return undefined;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    return this.updateStrategy(id, {
      status: 'IN REVIEW',
      approval: {
        ...strategy.approval,
        status: 'INTERNAL REVIEW',
        internal_review: {
          reviewer: 'Kaelen Voss (Strategy Director)',
          date: today,
          comment: 'Submitted for internal review.',
          status: 'IN REVIEW',
        },
      },
      activities: [
        {
          id: `act-${Date.now()}`,
          title: 'Submitted for Review',
          description: 'Strategy submitted for internal review.',
          timestamp: today,
          author: strategy.strategy_lead,
        },
        ...strategy.activities,
      ],
    });
  }

  public approveStrategy(id: string): Strategy | undefined {
    const strategy = this.getStrategy(id);
    if (!strategy) return undefined;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    return this.updateStrategy(id, {
      status: 'APPROVED',
      approval: {
        status: 'APPROVED',
        internal_review: {
          reviewer: 'Kaelen Voss',
          date: today,
          comment: 'Approved strategy.',
          status: 'APPROVED',
        },
        client_review: {
          status: 'APPROVED',
          sent_date: today,
          comment: 'Client approved strategy.',
        },
      },
      activities: [
        {
          id: `act-${Date.now()}`,
          title: 'Strategy Approved',
          description: 'Strategy marked as APPROVED.',
          timestamp: today,
          author: 'Kaelen Voss',
        },
        ...strategy.activities,
      ],
    });
  }

  public addObjective(strategyId: string, objective: Omit<StrategyObjective, 'id'>): Strategy | undefined {
    const strategy = this.getStrategy(strategyId);
    if (!strategy) return undefined;

    const newObj: StrategyObjective = {
      ...objective,
      id: `obj-${Date.now()}`,
    };

    return this.updateStrategy(strategyId, {
      objectives: [...strategy.objectives, newObj],
    });
  }

  public addChannel(strategyId: string, channel: Omit<StrategyChannelItem, 'id'>): Strategy | undefined {
    const strategy = this.getStrategy(strategyId);
    if (!strategy) return undefined;

    const newChan: StrategyChannelItem = {
      ...channel,
      id: `chan-${Date.now()}`,
    };

    return this.updateStrategy(strategyId, {
      channels: [...strategy.channels, newChan],
    });
  }

  public addExperiment(strategyId: string, experiment: Omit<StrategyExperiment, 'id'>): Strategy | undefined {
    const strategy = this.getStrategy(strategyId);
    if (!strategy) return undefined;

    const newExp: StrategyExperiment = {
      ...experiment,
      id: `exp-${Date.now()}`,
    };

    return this.updateStrategy(strategyId, {
      experiments: [...strategy.experiments, newExp],
    });
  }

  public addRecommendation(strategyId: string, recommendation: Omit<StrategyRecommendation, 'id'>): Strategy | undefined {
    const strategy = this.getStrategy(strategyId);
    if (!strategy) return undefined;

    const newRec: StrategyRecommendation = {
      ...recommendation,
      id: `rec-${Date.now()}`,
    };

    return this.updateStrategy(strategyId, {
      recommendations: [...strategy.recommendations, newRec],
    });
  }

  public addNote(strategyId: string, text: string, author: string = 'Internal User'): Strategy | undefined {
    const strategy = this.getStrategy(strategyId);
    if (!strategy) return undefined;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const newNote: StrategyNoteItem = {
      id: `note-${Date.now()}`,
      author,
      text,
      created_at: today,
    };

    return this.updateStrategy(strategyId, {
      notes: [newNote, ...strategy.notes],
    });
  }
}

export const strategyService = new StrategyService();
