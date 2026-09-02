import React, { useState } from "react";
import { Plus, Edit2, Trash2, Wrench, Code } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { SKILL_CATEGORIES } from "../../utils/constants";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function SkillManager() {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const initialForm = {
    name: "",
    category: "Programming Languages",
    level: 80,
    icon: "Code",
    order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ ...initialForm, order: skills.length + 1 });
    setModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name || "",
      category: skill.category || "Programming Languages",
      level: skill.level || 80,
      icon: skill.icon || "Code",
      order: skill.order || 1
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        level: Number(formData.level),
        order: Number(formData.order)
      };

      if (editingId) {
        await updateSkill(editingId, payload);
      } else {
        await addSkill(payload);
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
            Skill Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Configure technical skills, proficiency levels, and category assignments.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd}>
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add New Skill</span>
        </Button>
      </div>

      {/* Skills Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4">Skill Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Proficiency</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono text-xs">
                        {skill.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {skill.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 max-w-[140px]">
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold">{skill.level}%</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono text-xs text-gray-500">
                    {skill.order}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(skill)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        title="Edit Skill"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Delete Skill"
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

      {/* Add / Edit Skill Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? "Edit Skill" : "Add New Skill"}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g. React.js, Python, PostgreSQL"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {SKILL_CATEGORIES.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Proficiency ({formData.level}%)
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full accent-indigo-600 mt-2"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
                Display Order
              </label>
              <input
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 mb-1">
              Icon Key (Lucide icon name)
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="e.g. Code2, Database, Terminal, Cpu"
              className="w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
            <Button variant="ghost" size="md" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" loading={loading}>
              {editingId ? "Update Skill" : "Add Skill"}
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
