"use client";

import { useState } from "react";
import { useTasks } from "../../../../hooks/useTasks";
import TaskCard from "../../../../components/tasks/TaskCard";
import TaskModal from "../../../../components/tasks/TaskModal";
import type { Task } from "../../../../types/task";

export default function ArchivedPage() {
  const { data: tasks, isLoading } = useTasks({ status: "ARCHIVED" });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-foreground">Archived</h1>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={openEdit} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">No archived tasks.</p>
        </div>
      )}

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}