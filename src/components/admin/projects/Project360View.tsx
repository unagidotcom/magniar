import React, { useState } from 'react';
import { Project, ProjectStatus, ProjectHealth } from '../../../types/projects';
import { ProjectHeader } from './ProjectHeader';
import { ProjectOverview } from './ProjectOverview';
import { ProjectCommercial } from './ProjectCommercial';
import { ProjectScope } from './ProjectScope';
import { ProjectServices } from './ProjectServices';
import { ProjectTimeline } from './ProjectTimeline';
import { ProjectDeliverables } from './ProjectDeliverables';
import { ProjectTasksPreview } from './ProjectTasksPreview';
import { ProjectTeam } from './ProjectTeam';
import { ProjectStrategyPlatforms } from './ProjectStrategyPlatforms';
import { ProjectDocumentsActivityNotes } from './ProjectDocumentsActivityNotes';
import { EditProjectModal } from './EditProjectModal';
import { UpdateStatusModal } from './UpdateStatusModal';
import { projectService } from '../../../services/projectService';
import {
  LayoutDashboard,
  Layers,
  Calendar,
  Users,
  Cpu,
  FileText,
  Plus,
  CheckSquare,
  DollarSign,
  AlertCircle,
} from 'lucide-react';

interface Project360ViewProps {
  project: Project;
  onBack: () => void;
  onOpenClient: (clientId: string) => void;
  onProjectUpdated: (updatedProject: Project) => void;
  onTriggerToast: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
}

export const Project360View: React.FC<Project360ViewProps> = ({
  project,
  onBack,
  onOpenClient,
  onProjectUpdated,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'SCOPE_SERVICES' | 'TIMELINE_DELIVERABLES' | 'TEAM' | 'STRATEGY' | 'DOCS_NOTES'
  >('OVERVIEW');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Quick Inline Adders
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(project.project_lead);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const updated = projectService.addTask(project.id, {
      title: newTaskTitle.trim(),
      owner: newTaskAssignee,
      status: 'OPEN',
      due_date: 'Next Sprint',
    });

    if (updated) {
      onProjectUpdated(updated);
      onTriggerToast('success', 'Task Added', `Added "${newTaskTitle}" to project tasks.`);
    }
    setNewTaskTitle('');
    setShowTaskInput(false);
  };

  const handleUpdateStatus = (
    newStatus: ProjectStatus,
    newHealth: ProjectHealth,
    notes: string,
    progressPercent?: number
  ) => {
    const updated = projectService.updateProjectStatus(
      project.id,
      newStatus,
      newHealth,
      notes,
      progressPercent
    );
    if (updated) {
      onProjectUpdated(updated);
      onTriggerToast(
        'success',
        'Project Status Updated',
        `Status set to ${newStatus} (${newHealth})`
      );
    }
  };

  const handleSaveEdit = (updates: Partial<Project>) => {
    const updated = projectService.updateProjectDetails(project.id, updates);
    if (updated) {
      onProjectUpdated(updated);
      onTriggerToast('success', 'Project Updated', 'Project metadata updated successfully.');
    }
  };

  const handleAddNote = (text: string, author: string) => {
    const updated = projectService.addInternalNote(project.id, text, author);
    if (updated) {
      onProjectUpdated(updated);
      onTriggerToast('info', 'Internal Note Posted', 'Note saved to project activity log.');
    }
  };

  const handleArchive = () => {
    if (window.confirm(`Are you sure you want to archive project ${project.name}?`)) {
      const updated = projectService.updateProjectStatus(
        project.id,
        'CANCELLED',
        'BLOCKED',
        'Archived by administrator'
      );
      if (updated) {
        onProjectUpdated(updated);
        onTriggerToast('info', 'Project Archived', `${project.name} has been archived.`);
      }
    }
  };

  return (
    <div className="space-y-6 font-mono text-xs antialiased pb-12">
      {/* Top Header & Context */}
      <ProjectHeader
        project={project}
        onBack={onBack}
        onOpenClient={onOpenClient}
        onEdit={() => setIsEditModalOpen(true)}
        onUpdateStatus={() => setIsStatusModalOpen(true)}
        onAddTask={() => setShowTaskInput(true)}
        onArchive={handleArchive}
      />

      {/* Quick Add Task Floating Bar if open */}
      {showTaskInput && (
        <form
          onSubmit={handleTaskSubmit}
          className="p-3 bg-[#0A0A0C] border border-[#0099FF] rounded-[2px] flex flex-wrap items-center gap-2"
        >
          <span className="text-[#0099FF] font-bold text-xs flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>ADD PROJECT TASK:</span>
          </span>

          <input
            type="text"
            required
            autoFocus
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task title (e.g. Audit Meta Ads CAPI setup)"
            className="flex-1 bg-[#050505] border border-white/10 rounded p-1.5 text-white text-xs focus:outline-none focus:border-[#0099FF]"
          />

          <input
            type="text"
            value={newTaskAssignee}
            onChange={(e) => setNewTaskAssignee(e.target.value)}
            placeholder="Assignee"
            className="w-48 bg-[#050505] border border-white/10 rounded p-1.5 text-white text-xs"
          />

          <button
            type="submit"
            className="px-3 py-1.5 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-bold rounded text-xs"
          >
            Save Task
          </button>

          <button
            type="button"
            onClick={() => setShowTaskInput(false)}
            className="px-2 py-1.5 text-white/50 hover:text-white text-xs"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1 bg-[#0A0A0C] p-1.5 border border-white/10 rounded-[2px]">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-3.5 py-2 font-bold rounded-[2px] text-xs flex items-center gap-2 transition-colors ${
            activeTab === 'OVERVIEW'
              ? 'bg-[#0099FF] text-white shadow-sm'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>OVERVIEW & COMMERCIAL</span>
        </button>

        <button
          onClick={() => setActiveTab('SCOPE_SERVICES')}
          className={`px-3.5 py-2 font-bold rounded-[2px] text-xs flex items-center gap-2 transition-colors ${
            activeTab === 'SCOPE_SERVICES'
              ? 'bg-[#0099FF] text-white shadow-sm'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>SCOPE & SERVICES</span>
        </button>

        <button
          onClick={() => setActiveTab('TIMELINE_DELIVERABLES')}
          className={`px-3.5 py-2 font-bold rounded-[2px] text-xs flex items-center gap-2 transition-colors ${
            activeTab === 'TIMELINE_DELIVERABLES'
              ? 'bg-[#0099FF] text-white shadow-sm'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>MILESTONES & DELIVERABLES</span>
        </button>

        <button
          onClick={() => setActiveTab('TEAM')}
          className={`px-3.5 py-2 font-bold rounded-[2px] text-xs flex items-center gap-2 transition-colors ${
            activeTab === 'TEAM'
              ? 'bg-[#0099FF] text-white shadow-sm'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>TEAM & CONTACT</span>
        </button>

        <button
          onClick={() => setActiveTab('STRATEGY')}
          className={`px-3.5 py-2 font-bold rounded-[2px] text-xs flex items-center gap-2 transition-colors ${
            activeTab === 'STRATEGY'
              ? 'bg-[#0099FF] text-white shadow-sm'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>STRATEGY & PLATFORMS</span>
        </button>

        <button
          onClick={() => setActiveTab('DOCS_NOTES')}
          className={`px-3.5 py-2 font-bold rounded-[2px] text-xs flex items-center gap-2 transition-colors ${
            activeTab === 'DOCS_NOTES'
              ? 'bg-[#0099FF] text-white shadow-sm'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>DOCUMENTS & LOGS</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <ProjectOverview
            project={project}
            onOpenClient={onOpenClient}
            onToggleTask={(taskId) => {
              const updated = projectService.toggleTaskStatus(project.id, taskId);
              if (updated) onProjectUpdated(updated);
            }}
          />

          <ProjectCommercial project={project} />

          <ProjectTasksPreview
            project={project}
            onAddTask={() => setShowTaskInput(true)}
            onToggleTask={(taskId) => {
              const updated = projectService.toggleTaskStatus(project.id, taskId);
              if (updated) onProjectUpdated(updated);
            }}
          />
        </div>
      )}

      {activeTab === 'SCOPE_SERVICES' && (
        <div className="space-y-6">
          <ProjectScope project={project} />
          <ProjectServices project={project} />
        </div>
      )}

      {activeTab === 'TIMELINE_DELIVERABLES' && (
        <div className="space-y-6">
          <ProjectTimeline
            project={project}
            onToggleMilestone={(mId) => {
              const updated = projectService.toggleMilestoneStatus(project.id, mId);
              if (updated) onProjectUpdated(updated);
            }}
          />

          <ProjectDeliverables
            project={project}
            onUpdateDeliverable={(dId, newStatus) => {
              const updated = projectService.updateDeliverableStatus(project.id, dId, newStatus);
              if (updated) onProjectUpdated(updated);
            }}
          />
        </div>
      )}

      {activeTab === 'TEAM' && <ProjectTeam project={project} />}

      {activeTab === 'STRATEGY' && (
        <ProjectStrategyPlatforms project={project} onTriggerToast={onTriggerToast} />
      )}

      {activeTab === 'DOCS_NOTES' && (
        <ProjectDocumentsActivityNotes project={project} onAddNote={handleAddNote} />
      )}

      {/* Modals */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={project}
        onSave={handleSaveEdit}
      />

      <UpdateStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        project={project}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
