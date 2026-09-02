import React, { useState } from "react";
import { MessageSquare, Mail, Trash2, CheckCircle2, Clock, Reply, Filter } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import Button from "../common/Button";
import { formatDate } from "../../utils/helpers";

export default function MessageManager() {
  const { messages, updateMessageStatus, deleteMessage } = usePortfolio();
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredMessages = messages.filter(m => {
    if (filterStatus === "all") return true;
    return m.status === filterStatus;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteMessage(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async (msg) => {
    const nextStatus = msg.status === "unread" ? "read" : "unread";
    await updateMessageStatus(msg.id, nextStatus);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Visitor Inquiries & Messages
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Review and respond to messages submitted through your portfolio contact form.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === "all"
                ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilterStatus("unread")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === "unread"
                ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Unread ({messages.filter(m => m.status === "unread").length})
          </button>
          <button
            onClick={() => setFilterStatus("read")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === "read"
                ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Read ({messages.filter(m => m.status === "read").length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-3xl space-y-3">
            <MessageSquare className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              No Messages in this View
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              When visitors submit inquiries on your contact page, they will show up here.
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isUnread = msg.status === "unread";
            return (
              <div
                key={msg.id}
                className={`glass-panel p-6 rounded-3xl space-y-4 transition-all ${
                  isUnread
                    ? "border-l-4 border-l-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md"
                    : "opacity-90"
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                      {msg.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 dark:text-white text-sm">
                          {msg.name}
                        </span>
                        {isUnread && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                            New
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{msg.email}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                </div>

                {/* Subject & Message Content */}
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {msg.subject}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gray-50/80 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                    {msg.message}
                  </p>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleToggleStatus(msg)}
                    className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {isUnread ? "Mark as Read" : "Mark as Unread"}
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <Reply className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
