import React, { useState } from "react";
import { Plus, Edit2, Trash2, GraduationCap, Award } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function EducationManager() {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    institution: "",
    degree: "",
    subject: "",
    result: "",
    startYear: "",
    endYear: "",
    description: "",
    location: ""
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution || "",
      degree: edu.degree || "",
      subject: edu.subject || "",
      result: edu.result || "",
      startYear: edu.startYear || "",
      endYear: edu.endYear || "",
      description: edu.description || "",
      location: edu.location || ""
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education record?")) return;
    try {
      await deleteEducation(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await updateEducation(editingId, formData);
      } else {
        await addEducation(formData);
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
            Education Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage academic qualifications, degrees, results, and institutions.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Education</span>
        </Button>
      </div>

      {/* Education Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Degree & Subject</th>
                <th className="px-6 py-4">Institution</th>
                <th className="px-6 py-4">Result</th>
                <th className="px-6 py-4">Years</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {education.map((edu) => (
                <tr key={edu.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {edu.degree}
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        {edu.subject}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {edu.institution}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      {edu.result || "Completed"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                    {edu.startYear} — {edu.endYear || "Present"}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(edu)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu.id)}
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

      {/* Add / Edit Education Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Education Record" : "Add Education Record"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Degree / Certification *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                required
                placeholder="e.g. Bachelor of Science"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Subject / Major *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                placeholder="e.g. Computer Science and Engineering"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Institution Name *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                required
                placeholder="e.g. Jashore University of Science and Technology"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Result / CGPA
              </label>
              <input
                type="text"
                value={formData.result}
                onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                placeholder="CGPA: 3.13 / 4.00"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Start Year *
              </label>
              <input
                type="text"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="2018"
                required
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                End Year (or Present)
              </label>
              <input
                type="text"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                placeholder="2022"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Jashore, Bangladesh"
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Description / Coursework Highlights
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Core subjects, academic achievements, research thesis..."
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <Button variant="ghost" size="md" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" loading={loading}>
              {editingId ? "Update Education" : "Add Education"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
