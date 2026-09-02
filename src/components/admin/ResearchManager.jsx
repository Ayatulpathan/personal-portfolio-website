import React, { useState } from "react";
import { Plus, Edit2, Trash2, BookOpen, ExternalLink, FileText } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function ResearchManager() {
  const { research, addResearch, updateResearch, deleteResearch } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    title: "",
    field: "Artificial Intelligence",
    abstract: "",
    methodology: "",
    results: "",
    technologies: "",
    publicationInfo: "",
    paperUrl: "",
    year: "2023"
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (res) => {
    setEditingId(res.id);
    setFormData({
      title: res.title || "",
      field: res.field || "",
      abstract: res.abstract || "",
      methodology: res.methodology || "",
      results: res.results || "",
      technologies: Array.isArray(res.technologies) ? res.technologies.join(", ") : "",
      publicationInfo: res.publicationInfo || "",
      paperUrl: res.paperUrl || "",
      year: res.year || "2023"
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this research record?")) return;
    try {
      await deleteResearch(id);
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
        await updateResearch(editingId, payload);
      } else {
        await addResearch(payload);
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
            Research & Publications
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage academic papers, research areas, methodologies, and conference proceedings.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Research Paper</span>
        </Button>
      </div>

      {/* Research Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Paper Title & Field</th>
                <th className="px-6 py-4">Publication Venue</th>
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {research.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4 max-w-md">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white line-clamp-1">
                        {res.title}
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        {res.field}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300 max-w-xs truncate">
                    {res.publicationInfo || "Under Review / Working Draft"}
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                    {res.year}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(res)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Record"
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

      {/* Add / Edit Research Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Research Record" : "Add Research Record"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Paper / Research Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Deep Learning Approaches for Automated Anomaly Detection..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Field of Research *
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                required
                placeholder="e.g. Artificial Intelligence & Distributed Systems"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Publication Year *
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2023"
                required
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Publication Venue / Conference Citation
            </label>
            <input
              type="text"
              value={formData.publicationInfo}
              onChange={(e) => setFormData({ ...formData, publicationInfo: e.target.value })}
              placeholder="e.g. International Conference on Computer Science Insights (ICCSEI 2023)"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Paper PDF / DOI Link
            </label>
            <input
              type="url"
              value={formData.paperUrl}
              onChange={(e) => setFormData({ ...formData, paperUrl: e.target.value })}
              placeholder="https://example.com/papers/paper.pdf"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Abstract
            </label>
            <textarea
              rows="3"
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              placeholder="Summary of research problem and novel contributions..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Methodology
              </label>
              <textarea
                rows="2"
                value={formData.methodology}
                onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                placeholder="Architecture & experimental setup..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Results
              </label>
              <textarea
                rows="2"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="Quantitative outcome, accuracy, speedup..."
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Technologies / Libraries Used (Comma separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="Python, PyTorch, NumPy, Pandas"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <Button variant="ghost" size="md" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" loading={loading}>
              {editingId ? "Update Research" : "Add Research"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
