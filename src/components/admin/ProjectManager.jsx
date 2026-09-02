import React, { useState } from "react";
import { Plus, Edit2, Trash2, ExternalLink, Sparkles, FolderGit2 } from "lucide-react";
import { Github } from "../common/SocialIcons";
import { usePortfolio } from "../../context/PortfolioContext";
import { PROJECT_CATEGORIES } from "../../utils/constants";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function ProjectManager() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    title: "",
    shortDescription: "",
    description: "",
    imageUrl: "",
    category: "Full Stack",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    startDate: "",
    completionDate: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title || "",
      shortDescription: proj.shortDescription || "",
      description: proj.description || "",
      imageUrl: proj.imageUrl || "",
      category: proj.category || "Full Stack",
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(", ") : "",
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
      featured: Boolean(proj.featured),
      startDate: proj.startDate || "",
      completionDate: proj.completionDate || ""
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedTech = formData.technologies
        ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean)
        : [];

      const payload = {
        ...formData,
        technologies: parsedTech
      };

      if (editingId) {
        await updateProject(editingId, payload);
      } else {
        await addProject(payload);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Project Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add, update, or remove portfolio showcase projects.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add New Project</span>
        </Button>
      </div>

      {/* Projects Table / Card List */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Technologies</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {proj.imageUrl ? (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-12 h-10 object-cover rounded-lg shrink-0 border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="w-12 h-10 bg-indigo-50 dark:bg-indigo-950 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {proj.title}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                          {proj.shortDescription}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {proj.category || "General"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.technologies?.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                          {t}
                        </span>
                      ))}
                      {proj.technologies?.length > 3 && (
                        <span className="text-[10px] text-gray-400">
                          +{proj.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {proj.featured ? (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">No</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Project" : "Add New Project"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Online Service Management System"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                {PROJECT_CATEGORIES.filter(c => c !== "All").map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Short Description (Card preview)
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief summary of the project..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Detailed Description
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Full comprehensive details, features, and architecture..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React.js, Node.js, Firebase, Tailwind CSS"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Live Demo URL
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="featured_check"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="featured_check" className="text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Mark as Featured Project (Display on Homepage)
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <Button variant="ghost" size="md" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" loading={loading}>
              {editingId ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
