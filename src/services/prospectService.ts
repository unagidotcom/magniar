import { Prospect, ProspectStage, LostReason, ProspectActivity, ProspectTask } from '../types/prospects';
import { MOCK_PROSPECTS_DETAILED } from '../data/mockProspectsData';

class ProspectService {
  private prospects: Prospect[] = [...MOCK_PROSPECTS_DETAILED];

  public getProspects(): Prospect[] {
    return [...this.prospects];
  }

  public getProspect(id: string): Prospect | undefined {
    return this.prospects.find((p) => p.id === id || p.id.toLowerCase() === id.toLowerCase());
  }

  public createProspect(newProspectData: Partial<Prospect>): Prospect {
    const nextNum = this.prospects.length + 14;
    const newId = `MG-PR-2026-${String(nextNum).padStart(3, '0')}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const created: Prospect = {
      id: newId,
      request_id: newProspectData.request_id || undefined,
      source_request_code: newProspectData.source_request_code || undefined,
      source_request_date: newProspectData.source_request_date || undefined,
      business_name: newProspectData.business_name || 'New Business Prospect',
      contact_name: newProspectData.contact_name || 'Primary Contact',
      contact_title: newProspectData.contact_title || 'Decision Maker',
      email: newProspectData.email || 'contact@example.com',
      phone: newProspectData.phone || '',
      website: newProspectData.website || '',
      industry: newProspectData.industry || 'E-COMMERCE',
      business_model: newProspectData.business_model || 'DTC',
      company_size: newProspectData.company_size || '10-50 employees',
      primary_market: newProspectData.primary_market || 'North America',
      markets_served: newProspectData.markets_served || 'US',
      current_technology: newProspectData.current_technology || 'Shopify, Google Analytics',
      current_marketing_channels: newProspectData.current_marketing_channels || ['Meta Ads'],
      stage: newProspectData.stage || 'QUALIFIED',
      priority: newProspectData.priority || 'NORMAL',
      owner: newProspectData.owner || 'Strategy Team',
      lead_source: newProspectData.lead_source || 'WEBSITE',
      services: newProspectData.services || ['Meta Ads', 'Google Ads'],
      opportunity: newProspectData.opportunity || {
        media_budget: '$10,000 - $25,000 / month',
        media_budget_val: 15000,
        service_fee: '$5,000 / month',
        service_fee_val: 5000,
        estimated_monthly_value: '$5,000 / month',
        estimated_monthly_value_num: 5000,
        estimated_contract_value: '$60,000',
        estimated_contract_value_num: 60000,
        currency: 'USD ($)',
        probability: 25,
        expected_close_date: '2026-09-30',
      },
      next_action: newProspectData.next_action || {
        id: `act-${Date.now()}`,
        title: 'Initial Discovery Schedule',
        due_date: 'Next Week',
        owner: newProspectData.owner || 'Strategy Team',
        completed: false,
      },
      discovery: newProspectData.discovery || {
        primary_objective: 'Scale online performance acquisition',
        current_challenge: 'High cost per acquisition across main channels',
        desired_outcome: 'Predictable return on ad spend',
        current_acquisition_channels: ['Meta Ads'],
        current_monthly_spend: '$15,000 / month',
        current_revenue_range: '$1M - $3M ARR',
        target_market: 'DTC Consumers',
        timeline: 'Q3 Onboarding',
        decision_maker: newProspectData.contact_name || 'Founder',
        internal_constraints: 'None noted',
        success_criteria: 'Scale monthly revenue profitably',
      },
      qualification: newProspectData.qualification || {
        budget_fit: 'CONFIRMED',
        service_fit: 'CONFIRMED',
        timeline_fit: 'LIKELY',
        decision_maker_fit: 'CONFIRMED',
        strategic_fit: 'CONFIRMED',
        why_magniar: 'Good fit for Magniar performance media & growth services.',
      },
      internal_notes: newProspectData.internal_notes || 'Manually entered prospect record.',
      created_at: now,
      updated_at: now,
      activities: [
        {
          id: `act-${Date.now()}`,
          type: 'STATUS_CHANGE',
          title: 'Prospect Created',
          description: `Prospect record ${newId} created manually in Prospects CRM.`,
          timestamp: now,
          author: newProspectData.owner || 'Super Admin',
        },
      ],
      tasks: [],
      documents: [],
    };

    this.prospects.unshift(created);
    return created;
  }

  public updateProspect(id: string, updates: Partial<Prospect>): Prospect | undefined {
    const prospect = this.getProspect(id);
    if (!prospect) return undefined;

    Object.assign(prospect, updates, {
      updated_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
    });
    return prospect;
  }

  public updateStage(id: string, newStage: ProspectStage): Prospect | undefined {
    const prospect = this.getProspect(id);
    if (!prospect) return undefined;

    const oldStage = prospect.stage;
    prospect.stage = newStage;
    prospect.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);

    // Probability update according to Stage
    const probMap: Record<ProspectStage, number> = {
      QUALIFIED: 25,
      DISCOVERY: 40,
      PROPOSAL: 65,
      NEGOTIATION: 80,
      WON: 100,
      LOST: 0,
      NOT_A_FIT: 0,
    };
    prospect.opportunity.probability = probMap[newStage] ?? prospect.opportunity.probability;

    prospect.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'STATUS_CHANGE',
      title: `Stage Changed: ${oldStage} → ${newStage}`,
      description: `Prospect moved to stage ${newStage}. Internal probability updated to ${probMap[newStage]}%.`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Kaelen Voss',
    });

    return prospect;
  }

  public convertToClient(id: string): { prospect: Prospect; clientId: string } | undefined {
    const prospect = this.getProspect(id);
    if (!prospect) return undefined;

    const clientId = `MG-CL-2026-${String(Math.floor(Math.random() * 900) + 100)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    prospect.stage = 'WON';
    prospect.opportunity.probability = 100;
    prospect.converted_client_id = clientId;
    prospect.converted_at = now;
    prospect.updated_at = now;

    prospect.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'STATUS_CHANGE',
      title: 'CLIENT CREATED',
      description: `Prospect converted to active client record ${clientId}. Lineage preserved: Request (${prospect.source_request_code || 'N/A'}) → Prospect (${prospect.id}) → Client (${clientId}).`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Kaelen Voss',
    });

    return { prospect, clientId };
  }

  public markLost(id: string, reason: LostReason, note?: string): Prospect | undefined {
    const prospect = this.getProspect(id);
    if (!prospect) return undefined;

    const isNotFit = reason === 'NOT_A_FIT';
    prospect.stage = isNotFit ? 'NOT_A_FIT' : 'LOST';
    prospect.opportunity.probability = 0;
    prospect.lost_reason = reason;
    prospect.lost_note = note || 'Closed as lost opportunity.';
    prospect.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);

    prospect.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'STATUS_CHANGE',
      title: isNotFit ? 'Marked as Not a Fit' : `Marked as Lost (${reason})`,
      description: note || `Opportunity marked as ${prospect.stage}. Reason: ${reason}`,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: 'Kaelen Voss',
    });

    return prospect;
  }

  public addNote(id: string, noteText: string, author: string = 'Kaelen Voss', visibility: 'INTERNAL' | 'PUBLIC' = 'INTERNAL'): ProspectActivity | undefined {
    const prospect = this.getProspect(id);
    if (!prospect) return undefined;

    const newActivity: ProspectActivity = {
      id: `act-${Date.now()}`,
      type: 'NOTE',
      title: 'Note Added',
      description: noteText,
      timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      author,
      visibility,
    };

    prospect.activities.unshift(newActivity);
    prospect.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);
    return newActivity;
  }

  public addTask(id: string, title: string, dueDate: string, assignedTo: string): ProspectTask | undefined {
    const prospect = this.getProspect(id);
    if (!prospect) return undefined;

    const newTask: ProspectTask = {
      id: `task-${Date.now()}`,
      title,
      due_date: dueDate,
      status: 'OPEN',
      assigned_to: assignedTo,
    };

    prospect.tasks.unshift(newTask);
    prospect.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);
    return newTask;
  }

  public toggleTask(prospectId: string, taskId: string): boolean {
    const prospect = this.getProspect(prospectId);
    if (!prospect) return false;

    const task = prospect.tasks.find((t) => t.id === taskId);
    if (!task) return false;

    task.status = task.status === 'OPEN' ? 'DONE' : 'OPEN';
    prospect.updated_at = new Date().toISOString().replace('T', ' ').substring(0, 16);
    return true;
  }
}

export const prospectService = new ProspectService();
