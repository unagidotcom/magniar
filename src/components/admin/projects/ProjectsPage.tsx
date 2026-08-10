import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus, ProjectHealth, ProjectType } from '../../../types/projects';
import { projectService } from '../../../services/projectService';
import { MOCK_CLIENTS } from '../../../data/mockClientsData';
import { ProjectTable } from './ProjectTable';
import { ProjectCard } from './ProjectCard';
import { Project360View } from './Project360View';
import { NewProjectModal } from './NewProjectModal';
import { Chapter18DesignReview } from './Chapter18DesignReview';
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  RefreshCw,
  Activity,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  FolderOpen,
} from 'lucide-react';

interface ProjectsPageProps {
  onNavigate?: (route: string) => void;
  onTriggerToast?: (type: 'success' | 'info' | 'error', title: string, message?: string) => void;
  simulatedState?: 'normal' | 'skeleton' | 'empty' | 'error';
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onTriggerToast,
  simulatedState = 'normal',
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [healthFilter, setHealthFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'TABLE' | 'GRID'>('TABLE');

  // Modals
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const loadProjectsData = () => {
    const list = projectService.getProjects();
    setProjects(list);
  };

  useEffect(() => {
    loadProjectsData();
  }, []);

  const handleCreateProject = (data: any) => {
    const newProj = projectService.createProject(data);
    loadProjectsData();
    if (onTriggerToast) {
      onTriggerToast(
        'success',
        'Project Registered',
        `Successfully created ${newProj.name} (${newProj.id})`
      );
    }
  };

  const handleProjectUpdated = (updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  // Filter logic
  const filteredProjects = projects.filter((p) => {
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchClient = p.client_business_name.toLowerCase().includes(q);
      const matchId = p.id.toLowerCase().includes(q);
      const matchLead = p.project_lead.toLowerCase().includes(q);
      if (!matchName && !matchClient && !matchId && !matchLead) return false;
    }

    // Status Filter
    if (statusFilter !== 'ALL' && p.status !== statusFilter) {
      return false;
    }

    // Health Filter
    if (healthFilter !== 'ALL' && p.health !== healthFilter) {
      return false;
    }

    // Type Filter
    if (typeFilter !== 'ALL' && p.project_type !== typeFilter) {
      return false;
    }

    return true;
  });

  // Calculate Metrics
  const totalActive = projects.filter(
    (p) => p.status === 'ACTIVE' || p.status === 'IN_PROGRESS' || p.status === 'PLANNING'
  ).length;

  const highPriorityCount = projects.filter(
    (p) => p.priority === 'HIGH' || p.priority === 'CRITICAL'
  ).length;

  const avgProgress =
    projects.length > 0
      ? Math.round(projects.reduce((acc, p) => acc + p.progress_percent, 0) / projects.length)
      : 0;

  // Selected project object for 360 view
  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  // Render 360 View if a project is selected
  if (selectedProject) {
    return (
      <Project360View
        project={selectedProject}
        onBack={() => setSelectedProjectId(null)}
        onOpenClient={(clientId) => {
          if (onNavigate) {
            onNavigate('clients');
          }
        }}
        onProjectUpdated={handleProjectUpdated}
        onTriggerToast={
          onTriggerToast ||
          (() => {
            /* noop */
          })
        }
      />
    );
  }

  // Client dropdown list for New Project Modal
  const clientsDropdown = MOCK_CLIENTS.map((c) => ({
    id: c.id,
    name: c.business_name,
  }));

  return (
    <div className="space-y-6 font-mono text-xs antialiased pb-12">
      {/* Chapter 18 Review Banner */}
      <Chapter18DesignReview />

      {/* Header Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] p-5">
        <div>
          <div className="flex items-center gap-2 text-[#0099FF] text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>OPERATIONAL WORKSPACE • CHAPTER 18</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            ACTIVE PROJECTS MANAGEMENT
          </h1>
          <p className="text-white/50 text-[11px] mt-1 max-w-2xl">
            Central operational registry for active Magniar client engagements, milestones, scope deliverables, and cross-channel service execution.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-bold rounded-[2px] text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Project</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Active Projects */}
        <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase font-semibold">
            <span>ACTIVE PROJECTS</span>
            <FolderOpen className="w-4 h-4 text-[#0099FF]" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{totalActive}</div>
          <div className="text-[10px] text-emerald-400">
            {projects.length} Total Registered
          </div>
        </div>

        {/* High / Critical Priority */}
        <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase font-semibold">
            <span>HIGH / CRITICAL PRIORITY</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-300 tracking-tight">{highPriorityCount}</div>
          <div className="text-[10px] text-white/40">Requires Lead Oversight</div>
        </div>

        {/* Retainer Revenue */}
        <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase font-semibold">
            <span>ESTIMATED MONTHLY RETAINER</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">$33,500 <span className="text-xs font-normal text-white/50">/ mo</span></div>
          <div className="text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 inline-block font-bold">
            DEMO DATA
          </div>
        </div>

        {/* Average Progress */}
        <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-1.5">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase font-semibold">
            <span>AVG DELIVERY PROGRESS</span>
            <TrendingUp className="w-4 h-4 text-[#0099FF]" />
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">{avgProgress}%</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#0099FF] h-full" style={{ width: `${avgProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Search, Filter & View Bar */}
      <div className="p-4 bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, client, ID, or lead..."
              className="w-full bg-[#050505] border border-white/10 rounded-[2px] pl-9 pr-3 py-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
            />
          </div>

          {/* Filters & View Modes */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#050505] border border-white/10 rounded-[2px] px-2.5 py-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
            >
              <option value="ALL">Status: All</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="PLANNING">PLANNING</option>
              <option value="PAUSED">PAUSED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>

            {/* Health Filter */}
            <select
              value={healthFilter}
              onChange={(e) => setHealthFilter(e.target.value)}
              className="bg-[#050505] border border-white/10 rounded-[2px] px-2.5 py-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
            >
              <option value="ALL">Health: All</option>
              <option value="ON_TRACK">ON TRACK</option>
              <option value="ATTENTION">ATTENTION</option>
              <option value="AT_RISK">AT RISK</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#050505] border border-white/10 rounded-[2px] px-2.5 py-2 text-white text-xs focus:outline-none focus:border-[#0099FF]"
            >
              <option value="ALL">Type: All</option>
              <option value="PERFORMANCE">PERFORMANCE</option>
              <option value="COMMERCE">COMMERCE</option>
              <option value="DEVELOPMENT">DEVELOPMENT</option>
              <option value="STRATEGY">STRATEGY</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#050505] border border-white/10 rounded-[2px] p-0.5">
              <button
                onClick={() => setViewMode('TABLE')}
                className={`p-1.5 rounded-[2px] transition-colors ${
                  viewMode === 'TABLE'
                    ? 'bg-[#0099FF] text-white'
                    : 'text-white/40 hover:text-white'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('GRID')}
                className={`p-1.5 rounded-[2px] transition-colors ${
                  viewMode === 'GRID'
                    ? 'bg-[#0099FF] text-white'
                    : 'text-white/40 hover:text-white'
                }`}
                title="Grid / Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Count indicator */}
        {(statusFilter !== 'ALL' || healthFilter !== 'ALL' || typeFilter !== 'ALL' || searchQuery) && (
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px]">
            <span className="text-white/60">
              Showing {filteredProjects.length} of {projects.length} registered projects
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setHealthFilter('ALL');
                setTypeFilter('ALL');
              }}
              className="text-[#0099FF] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-[#0A0A0C] border border-white/10 rounded-[2px] space-y-3">
          <Briefcase className="w-8 h-8 text-white/20 mx-auto" />
          <h3 className="text-white font-bold text-sm">NO MATCHING PROJECTS FOUND</h3>
          <p className="text-white/50 text-xs max-w-md mx-auto">
            No active project matching your search terms or filter criteria. Try clearing filters or register a new active project.
          </p>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-4 py-2 bg-[#0099FF] hover:bg-[#0099FF]/90 text-white font-bold rounded-[2px] text-xs inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Project</span>
          </button>
        </div>
      ) : viewMode === 'TABLE' ? (
        <ProjectTable
          projects={filteredProjects}
          onSelectProject={(id) => setSelectedProjectId(id)}
          onOpenClient={(clientId) => {
            if (onNavigate) onNavigate('clients');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onSelect={() => setSelectedProjectId(proj.id)}
              onOpenClient={(clientId) => {
                if (onNavigate) onNavigate('clients');
              }}
            />
          ))}
        </div>
      )}

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreateProject}
        clientsList={clientsDropdown}
      />
    </div>
  );
};
