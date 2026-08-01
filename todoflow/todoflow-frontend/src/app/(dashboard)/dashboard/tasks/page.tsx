"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useTasks } from "../../../../hooks/useTasks";
import { useDebounce } from "../../../../hooks/useDebounce";
import TaskCard from "../../../../components/tasks/TaskCard";
import TaskModal from "../../../../components/tasks/TaskModal";
import TaskSearchBar from "../../../../components/tasks/TaskSearchBar";
import TaskFilters from "../../../../components/tasks/TaskFilters";
import TaskSortMenu from "../../../../components/tasks/TaskSortMenu";
import type { Task, Priority, TaskStatus } from "../../../../types/task";
import type { TaskQuery } from "../../../../lib/api/tasks";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [status, setStatus] = useState<TaskStatus | undefined>();
  const [priority, setPriority] = useState<Priority | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<TaskQuery["sortBy"]>("createdAt");
  const [order, setOrder] = useState<TaskQuery["order"]>("desc");

  const { data: tasks, isLoading } = useTasks({
    search: debouncedSearch || undefined,
    status,
    priority,
    categoryId,
    sortBy,
    order,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openCreate = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-foreground">My Tasks</h1>
          <p className="text-sm text-muted-foreground">
            {tasks?.length ?? 0} task{tasks?.length === 1 ? "" : "s"}
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <TaskSearchBar value={search} onChange={setSearch} />
        <div className="flex flex-wrap items-center gap-2">
          <TaskFilters
            status={status}
            priority={priority}
            categoryId={categoryId}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
            onCategoryChange={setCategoryId}
          />
          <TaskSortMenu
            sortBy={sortBy}
            order={order}
            onChange={(newSortBy, newOrder) => {
              setSortBy(newSortBy);
              setOrder(newOrder);
            }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={openEdit} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {search || status || priority || categoryId
              ? "No tasks match your filters."
              : "No tasks yet. Create your first one."}
          </p>
        </div>
      )}

      <TaskModal open={modalOpen} onClose={() => setModalOpen(false)} task={editingTask} />
    </div>
  );
}