import {
  Project,
  ProjectStatus,
  ProjectHealth,
  ProjectMilestone,
  MilestoneStatus,
  ProjectDeliverable,
  DeliverableStatus,
  ProjectScopeItem,
  ProjectNote,
  ProjectTaskPreview,
} from '../types/projects';
import { MOCK_PROJECTS } from '../data/mockProjectsData';

class ProjectService {
  private projects: Project[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem('magniar_projects_data');
      if (saved) {
        this.projects = JSON.parse(saved);
      } else {
        this.projects = [...MOCK_PROJECTS];
        this.saveToStorage();
      }
    } catch (e) {
      this.projects = [...MOCK_PROJECTS];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('magniar_projects_data', JSON.stringify(this.projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }

  public getProjects(): Project[] {
    return this.projects.filter((p) => p.status !== 'ARCHIVED');
  }

  public getAllProjectsWithArchived(): Project[] {
    return this.projects;
  }

  public getProject(id: string): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  public getProjectsByClientId(clientId: string): Project[] {
    return this.projects.filter((p) => p.client_id === clientId && p.status !== 'ARCHIVED');
  }

  public createProject(
    data: Omit<
      Project,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'activities'
      | 'notes'
      | 'documents'
      | 'milestones'
      | 'deliverables'
      | 'open_tasks'
      | 'blockers'
      | 'scope'
      | 'platforms'
      | 'commercial'
    > & {
      scope?: Omit<ProjectScopeItem, 'id'>[];
      commercial?: Partial<Project['commercial']>;
    }
  ): Project {
    const nextSeq = this.projects.length + 15;
    const newId = `MG-PRJ-2026-${String(nextSeq).padStart(3, '0')}`;
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const newProject: Project = {
      ...data,
      id: newId,
      progress_percent: data.progress_percent || 0,
      current_phase: data.current_phase || 'PLANNING',
      health: data.health || 'ON_TRACK',
      scope: (data.scope || []).map((s, idx) => ({ ...s, id: `scp-new-${idx}` })),
      milestones: [],
      deliverables: [],
      open_tasks: [],
      blockers: [],
      commercial: {
        billing_model: data.commercial?.billing_model || 'MONTHLY RETAINER',
        next_invoice_date: data.commercial?.next_invoice_date || 'End of Month',
        billing_status: 'UP_TO_DATE',
        monthly_service_fee: data.commercial?.monthly_service_fee,
        media_budget: data.commercial?.media_budget,
        project_fee: data.commercial?.project_fee,
        total_contract_value: data.commercial?.total_contract_value,
      },
      platforms: [],
      documents: [],
      activities: [
        {
          id: `act-init-${Date.now()}`,
          type: 'PROJECT_CREATED',
          title: 'Project Initialized',
          description: `Project registered under client ${data.client_business_name}.`,
          timestamp: today,
          author: data.project_lead || 'Admin',
        },
      ],
      notes: [],
      created_at: today,
      updated_at: today,
    };

    this.projects.unshift(newProject);
    this.saveToStorage();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      updated_at: today,
    };

    this.saveToStorage();
    return this.projects[index];
  }

  public updateStatus(
    id: string,
    status: ProjectStatus,
    pauseReason?: string,
    resumeTargetDate?: string,
    completionSummary?: string
  ): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const oldStatus = project.status;
    const updates: Partial<Project> = {
      status,
      updated_at: today,
    };

    if (status === 'PAUSED') {
      updates.pause_reason = pauseReason || 'Operations temporarily paused.';
      updates.resume_target_date = resumeTargetDate;
      updates.health = 'AT_RISK';
    } else if (status === 'COMPLETED') {
      updates.completed_at = today;
      updates.completion_summary = completionSummary || 'Project deliverables successfully completed.';
      updates.progress_percent = 100;
      updates.health = 'ON_TRACK';
    } else if (status === 'ACTIVE' || status === 'IN_PROGRESS') {
      if (oldStatus === 'PAUSED') {
        updates.pause_reason = undefined;
        updates.resume_target_date = undefined;
      }
    }

    const activity = {
      id: `act-st-${Date.now()}`,
      type: 'STATUS_CHANGED' as const,
      title: `Status Changed: ${oldStatus} → ${status}`,
      description:
        status === 'PAUSED'
          ? `Paused reason: ${pauseReason || 'N/A'}`
          : status === 'COMPLETED'
          ? `Completion summary: ${completionSummary || 'Completed'}`
          : `Updated project operational status to ${status}.`,
      timestamp: today,
      author: 'Kaelen Voss',
    };

    updates.activities = [activity, ...project.activities];

    return this.updateProject(id, updates);
  }

  public archiveProject(id: string): Project | undefined {
    return this.updateStatus(id, 'ARCHIVED');
  }

  public addScopeItem(id: string, scopeItem: Omit<ProjectScopeItem, 'id'>): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const newScope: ProjectScopeItem = {
      ...scopeItem,
      id: `scp-${Date.now()}`,
    };

    const updatedScope = [...project.scope, newScope];
    return this.updateProject(id, { scope: updatedScope });
  }

  public addMilestone(id: string, milestone: Omit<ProjectMilestone, 'id'>): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const newMilestone: ProjectMilestone = {
      ...milestone,
      id: `ms-${Date.now()}`,
    };

    const updatedMilestones = [...project.milestones, newMilestone];
    return this.updateProject(id, { milestones: updatedMilestones });
  }

  public updateMilestoneStatus(
    id: string,
    milestoneId: string,
    status: MilestoneStatus
  ): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const updatedMilestones = project.milestones.map((m) => {
      if (m.id === milestoneId) {
        return {
          ...m,
          status,
          completed_at: status === 'COMPLETED' ? today : m.completed_at,
        };
      }
      return m;
    });

    return this.updateProject(id, { milestones: updatedMilestones });
  }

  public addDeliverable(
    id: string,
    deliverable: Omit<ProjectDeliverable, 'id'>
  ): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const newDeliverable: ProjectDeliverable = {
      ...deliverable,
      id: `del-${Date.now()}`,
    };

    const updatedDeliverables = [...project.deliverables, newDeliverable];
    return this.updateProject(id, { deliverables: updatedDeliverables });
  }

  public updateDeliverableStatus(
    id: string,
    deliverableId: string,
    status: DeliverableStatus
  ): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const updatedDeliverables = project.deliverables.map((d) => {
      if (d.id === deliverableId) {
        return { ...d, status };
      }
      return d;
    });

    return this.updateProject(id, { deliverables: updatedDeliverables });
  }

  public addTask(id: string, task: Omit<ProjectTaskPreview, 'id'>): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const newTask: ProjectTaskPreview = {
      ...task,
      id: `tsk-${Date.now()}`,
    };

    const updatedTasks = [newTask, ...project.open_tasks];
    return this.updateProject(id, { open_tasks: updatedTasks });
  }

  public updateProjectDetails(id: string, updates: Partial<Project>): Project | undefined {
    return this.updateProject(id, updates);
  }

  public updateProjectStatus(
    id: string,
    status: ProjectStatus,
    health?: ProjectHealth,
    notes?: string,
    progressPercent?: number
  ): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const updates: Partial<Project> = { status };
    if (health) updates.health = health;
    if (typeof progressPercent === 'number') updates.progress_percent = progressPercent;

    if (notes) {
      const today = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
      const newAct = {
        id: `act-st-${Date.now()}`,
        type: 'STATUS_CHANGED' as const,
        title: `Status Changed: ${project.status} → ${status}`,
        description: notes,
        timestamp: today,
        author: 'Kaelen Voss',
      };
      updates.activities = [newAct, ...project.activities];
    }

    return this.updateProject(id, updates);
  }

  public toggleTaskStatus(id: string, taskId: string): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const updatedTasks = project.open_tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus = t.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED';
        return { ...t, status: nextStatus as any };
      }
      return t;
    });

    return this.updateProject(id, { open_tasks: updatedTasks });
  }

  public toggleMilestoneStatus(id: string, milestoneId: string): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const updatedMilestones = project.milestones.map((m) => {
      if (m.id === milestoneId) {
        const nextStatus = m.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
        return {
          ...m,
          status: nextStatus as MilestoneStatus,
          completed_at: nextStatus === 'COMPLETED' ? today : undefined,
        };
      }
      return m;
    });

    return this.updateProject(id, { milestones: updatedMilestones });
  }

  public addInternalNote(id: string, text: string, author: string): Project | undefined {
    return this.addNote(id, text, author);
  }

  public addNote(id: string, text: string, author: string): Project | undefined {
    const project = this.getProject(id);
    if (!project) return undefined;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });

    const newNote: ProjectNote = {
      id: `nt-${Date.now()}`,
      text,
      author,
      created_at: today,
      visibility: 'INTERNAL',
    };

    const updatedNotes = [newNote, ...project.notes];
    return this.updateProject(id, { notes: updatedNotes });
  }
}

export const projectService = new ProjectService();
