import React, { useState } from "react";
import { Plus, Edit2, Trash2, Briefcase, Calendar } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { formatDate } from "../../utils/helpers";

export default function ExperienceManager() {
  const { experience, addExperience, updateExperience, deleteExperience } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    position: "",
    organization: "",
    employmentType: "Full-Time",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    responsibilities: "",
    technologies: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({
      position: exp.position || "",
      organization: exp.organization || "",
      employmentType: exp.employmentType || "Full-Time",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      location: exp.location || "",
      description: exp.description || "",
      responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join("\n") : "",
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : ""
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience record?")) return;
    try {
      await deleteExperience(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedResp = formData.responsibilities
        ? formData.responsibilities.split("\n").map(r => r.trim()).filter(Boolean)
        : [];
      const parsedTech = formData.technologies
        ? formData.technologies.split(",").map(t => t.trim()).filter(Boolean)
        : [];

      const payload = {
        ...formData,
        responsibilities: parsedResp,
        technologies: parsedTech
      };

      if (editingId) {
        await updateExperience(editingId, payload);
      } else {
        await addExperience(payload);
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
            Experience Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Maintain your professional employment history and key responsibilities.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Experience</span>
        </Button>
      </div>

      {/* Experience Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Role & Organization</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {experience.map((exp) => (
                <tr key={exp.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {exp.position}
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        {exp.organization}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {exp.employmentType || "Full-Time"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate) || "Present"}
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-500">
                    {exp.location || "—"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(exp)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Edit Experience"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Experience"
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

      {/* Add / Edit Experience Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Experience" : "Add Experience"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Job Title / Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
                placeholder="e.g. Software Developer"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Organization / Company *
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                required
                placeholder="e.g. InnovateTech Solutions"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Employment Type
              </label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Research Contract">Research Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Start Date (YYYY-MM) *
              </label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="2023-01"
                required
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                End Date (or 'Present')
              </label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="Present or 2023-12"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Dhaka, Bangladesh"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Overview Description
            </label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="High-level description of this role..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Key Responsibilities (One per line)
            </label>
            <textarea
              rows="3"
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              placeholder="Architected responsive SPAs&#10;Integrated Cloud Firestore synchronization"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Technologies Used (Comma separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React.js, Node.js, Firebase, Git"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <Button variant="ghost" size="md" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" loading={loading}>
              {editingId ? "Update Record" : "Add Record"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
