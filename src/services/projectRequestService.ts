import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ProjectRequestFormData, RequestStatus } from '../types/startProject';

export interface ProjectRequestSubmissionResult {
  id: string;
  request_number: string;
  status: RequestStatus;
  created_at: string;
}

export interface AdminProjectRequest {
  id: string;
  request_number: string;
  status: RequestStatus;
  source: string;
  created_at: string;
  updated_at: string;
  opening_goal?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  country?: string | null;
  role?: string | null;
  company_name: string;
  website: string;
  industry?: string | null;
  business_model?: string | null;
  primary_market?: string | null;
  target_market?: string | null;
  business_size?: string | null;
  performance_services: string[];
  commerce_platforms: string[];
  development_services: string[];
  intelligence_services: string[];
  is_not_sure_needs: boolean;
  current_platforms: string[];
  current_marketing_channels: string[];
  current_team?: string | null;
  current_challenges: string[];
  tell_us_more: string;
  primary_goals: string[];
  monthly_media_ad_spend?: string | null;
  project_service_budget?: string | null;
  timeline?: string | null;
  engagement_type?: string | null;
  referral_source?: string | null;
  anything_else?: string | null;
  attachment_name?: string | null;
  raw_form_data: Record<string, unknown>;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  internal_notes?: string | null;
}

const asStringArray = (value: string[] | undefined) => value ?? [];

export async function submitProjectRequest(
  formData: ProjectRequestFormData
): Promise<ProjectRequestSubmissionResult> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Project request submission is not configured yet.');
  }

  const { data, error } = await supabase.rpc('submit_project_request', {
    p_opening_goal: formData.openingGoal ?? null,
    p_first_name: formData.firstName,
    p_last_name: formData.lastName,
    p_email: formData.email,
    p_phone: formData.phone ?? null,
    p_country: formData.country,
    p_role: formData.role,
    p_company_name: formData.companyName,
    p_website: formData.website,
    p_industry: formData.industry,
    p_business_model: formData.businessModel,
    p_primary_market: formData.primaryMarket,
    p_target_market: formData.targetMarket ?? null,
    p_business_size: formData.businessSize,
    p_performance_services: asStringArray(formData.performanceServices),
    p_commerce_platforms: asStringArray(formData.commercePlatforms),
    p_development_services: asStringArray(formData.developmentServices),
    p_intelligence_services: asStringArray(formData.intelligenceServices),
    p_is_not_sure_needs: formData.isNotSureNeeds,
    p_current_platforms: asStringArray(formData.currentPlatforms),
    p_current_marketing_channels: asStringArray(formData.currentMarketingChannels),
    p_current_team: formData.currentTeam,
    p_current_challenges: asStringArray(formData.currentChallenges),
    p_tell_us_more: formData.tellUsMore,
    p_primary_goals: asStringArray(formData.primaryGoals),
    p_monthly_media_ad_spend: formData.monthlyMediaAdSpend,
    p_project_service_budget: formData.projectServiceBudget,
    p_timeline: formData.timeline,
    p_engagement_type: formData.engagementType,
    p_referral_source: formData.referralSource,
    p_anything_else: formData.anythingElse,
    p_attachment_name: formData.attachmentName ?? null,
  });

  if (error) {
    console.error('Supabase project request submission failed', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error('We could not submit your project brief. Please try again.');
  }

  const created = Array.isArray(data) ? data[0] : data;
  if (!created?.request_number) {
    console.error('Supabase project request submission returned an unexpected response', data);
    throw new Error('We could not confirm your project brief submission. Please try again.');
  }

  return created as ProjectRequestSubmissionResult;
}

export async function listProjectRequests(): Promise<AdminProjectRequest[]> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase
    .from('project_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase project request fetch failed', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error('Failed to load project requests.');
  }

  return (data ?? []) as AdminProjectRequest[];
}

export async function updateProjectRequestStatus(
  id: string,
  status: RequestStatus
): Promise<AdminProjectRequest> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const updatePayload =
    status === 'REVIEWING'
      ? { status, reviewed_at: new Date().toISOString() }
      : { status };

  const { data, error } = await supabase
    .from('project_requests')
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    console.error('Supabase project request update failed', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throw new Error('Failed to update project request.');
  }

  return data as AdminProjectRequest;
}
