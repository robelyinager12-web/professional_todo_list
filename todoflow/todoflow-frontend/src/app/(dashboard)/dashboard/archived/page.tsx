"use client";

import { useState } from "react";
import { Archive } from "lucide-react";
import { useTasks } from "../../../../hooks/useTasks";
import TaskCard from "../../../../components/tasks/TaskCard";
import TaskModal from "../../../../components/tasks/TaskModal";
import LoadingSkeleton from "../../../../components/shared/LoadingSkeleton";
import EmptyState from "../../../../components/shared/EmptyState";
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
        <LoadingSkeleton count={3} />
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={openEdit} />
          ))}
        </div>
      ) : (
        <EmptyState icon={Archive} title="No archived tasks" description="Tasks you archive will show up here." />
      )}

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}