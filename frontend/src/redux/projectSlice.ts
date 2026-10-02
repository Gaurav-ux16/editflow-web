// src/redux/projectSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProjects as apiGetProjects,
  getProject  as apiGetProject,
  createProject as apiCreateProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
} from '../services/api';
import type { Project, ProjectFormData, ProjectState } from '../types';

// ─── Async Thunks ─────────────────────────────────────────────────────────

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetProjects();
      return res.data.projects as Project[];
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects.');
    }
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchOne',
  async (id: number | string, { getState, rejectWithValue }) => {
    try {
      const res = await apiGetProject(id);
      return res.data.project as Project;
    } catch {
      const state = getState() as { projects: ProjectState };
      const found = state.projects.projects.find((p) => String(p.id) === String(id));
      if (found) return found;
      return rejectWithValue('Project not found.');
    }
  }
);

export const addProject = createAsyncThunk(
  'projects/create',
  async (data: ProjectFormData, { getState, rejectWithValue }) => {
    try {
      const payload = {
        ...data,
        budget: parseFloat(data.budget) || 0,
        project_type: data.project_type as Project['project_type'],
      };
      const res = await apiCreateProject(payload);
      return res.data.project as Project;
    } catch {
      // Offline fallback: create local project
      const state = getState() as { projects: ProjectState };
      const newId = (state.projects.projects.length > 0 ? Math.max(...state.projects.projects.map((p) => p.id)) : 0) + 1;
      const localProject: Project = {
        id: newId,
        client_id: 1,
        project_name: data.project_name,
        description: data.description,
        project_type: (data.project_type || 'Other') as Project['project_type'],
        deadline: data.deadline,
        budget: parseFloat(data.budget) || 0,
        resolution: data.resolution,
        aspect_ratio: data.aspect_ratio,
        editing_style: data.editing_style,
        subtitles_required: data.subtitles_required,
        music_required: data.music_required,
        color_grading_required: data.color_grading_required,
        additional_instructions: data.additional_instructions,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return localProject;
    }
  }
);

export const editProject = createAsyncThunk(
  'projects/update',
  async (
    { id, data }: { id: number | string; data: Partial<ProjectFormData> & { status?: string } },
    { getState }
  ) => {
    try {
      const res = await apiUpdateProject(id, data);
      return res.data.project as Project;
    } catch {
      // Offline fallback: update locally
      const state = getState() as { projects: ProjectState };
      const existing = state.projects.projects.find((p) => String(p.id) === String(id));
      const updated: Project = {
        ...(existing || ({} as Project)),
        id: Number(id),
        client_id: existing?.client_id || 1,
        project_name: data.project_name ?? existing?.project_name ?? 'Untitled',
        description: data.description ?? existing?.description ?? '',
        project_type: (data.project_type || existing?.project_type || 'Other') as Project['project_type'],
        deadline: data.deadline ?? existing?.deadline ?? '',
        budget: data.budget !== undefined ? parseFloat(data.budget) : (existing?.budget ?? 0),
        resolution: data.resolution ?? existing?.resolution,
        aspect_ratio: data.aspect_ratio ?? existing?.aspect_ratio,
        editing_style: data.editing_style ?? existing?.editing_style,
        subtitles_required: data.subtitles_required ?? existing?.subtitles_required ?? false,
        music_required: data.music_required ?? existing?.music_required ?? false,
        color_grading_required: data.color_grading_required ?? existing?.color_grading_required ?? false,
        additional_instructions: data.additional_instructions ?? existing?.additional_instructions,
        status: (data.status as Project['status']) ?? existing?.status ?? 'pending',
        created_at: existing?.created_at ?? new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return updated;
    }
  }
);

export const removeProject = createAsyncThunk(
  'projects/delete',
  async (id: number | string) => {
    try {
      await apiDeleteProject(id);
    } catch {
      // Offline fallback: ignore network error and remove locally
    }
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────

// ─── Initial state with Mock Data (Standalone mode) ─────────────────────────

const initialMockProjects: Project[] = [
  {
    id: 1,
    client_id: 1,
    project_name: 'YouTube Tech Review #01',
    description: 'Cinematic 10-minute gadget review video with b-roll overlays and sound design.',
    project_type: 'YouTube Video',
    deadline: '2026-10-30',
    budget: 5000,
    resolution: '1920 × 1080',
    aspect_ratio: '16:9',
    editing_style: 'Fast-paced and cinematic',
    subtitles_required: true,
    music_required: true,
    color_grading_required: true,
    additional_instructions: 'Keep the intro under 15 seconds.',
    status: 'in_progress',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    client_id: 1,
    project_name: 'Instagram Reel Product Teaser',
    description: 'Quick dynamic 30s product teaser reel for upcoming summer release.',
    project_type: 'Instagram Reel',
    deadline: '2026-11-05',
    budget: 1500,
    resolution: '1080 × 1920',
    aspect_ratio: '9:16',
    editing_style: 'Trendy & punchy',
    subtitles_required: true,
    music_required: true,
    color_grading_required: false,
    additional_instructions: 'Add trending beat transitions.',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialState: ProjectState = {
  projects:       initialMockProjects,
  currentProject: initialMockProjects[0],
  loading:        false,
  error:          null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectError(state) {
      state.error = null;
    },
    clearCurrentProject(state) {
      state.currentProject = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAll
    builder
      .addCase(fetchProjects.pending,   (s) => { s.loading = true;  s.error = null; })
      .addCase(fetchProjects.fulfilled, (s, a) => {
        s.loading = false;
        if (a.payload && a.payload.length > 0) {
          s.projects = a.payload;
        }
      })
      .addCase(fetchProjects.rejected,  (s, a) => {
        s.loading = false;
        // Keep initial mock projects so UI works smoothly
        s.error = null;
      });

    // fetchOne
    builder
      .addCase(fetchProject.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProject.fulfilled, (s, a) => { s.loading = false; s.currentProject = a.payload; })
      .addCase(fetchProject.rejected,  (s, a) => { s.loading = false; s.error = a.payload as string; });

    // create
    builder
      .addCase(addProject.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(addProject.fulfilled, (s, a) => {
        s.loading = false;
        s.projects.unshift(a.payload);
        s.currentProject = a.payload;
      })
      .addCase(addProject.rejected,  (s, a) => { s.loading = false; s.error = a.payload as string; });

    // update
    builder
      .addCase(editProject.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(editProject.fulfilled, (s, a) => {
        s.loading = false;
        s.currentProject = a.payload;
        const idx = s.projects.findIndex((p) => p.id === a.payload.id);
        if (idx !== -1) s.projects[idx] = a.payload;
      })
      .addCase(editProject.rejected,  (s, a) => { s.loading = false; s.error = a.payload as string; });

    // delete
    builder
      .addCase(removeProject.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(removeProject.fulfilled, (s, a) => {
        s.loading  = false;
        s.projects = s.projects.filter((p) => p.id !== a.payload);
        if (s.currentProject?.id === a.payload) s.currentProject = null;
      })
      .addCase(removeProject.rejected,  (s, a) => { s.loading = false; s.error = a.payload as string; });
  },
});

export const { clearProjectError, clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
